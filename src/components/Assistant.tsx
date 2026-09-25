import { useEffect, useRef, useState } from 'react'
import {
  assistantGreeting,
  getAssistantReply,
  initialSuggestions,
  suggestionLabel,
  type AssistantAction,
} from '../data/assistant'
import { ArrowRight, ArrowUpRight, CloseIcon, RestartIcon, RobotLogo } from './icons'

type ChatMessage = { id: number; sender: 'assistant' | 'user'; text: string; actions?: AssistantAction[] }

const greetingMessages = (): ChatMessage[] =>
  assistantGreeting.map((text, index) => ({ id: index + 1, sender: 'assistant', text }))

export function Assistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(greetingMessages)
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions)
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const turnCounts = useRef(new Map<string, number>())
  const replyTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const list = messagesRef.current
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [messages, isThinking, isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  useEffect(() => () => window.clearTimeout(replyTimer.current), [])

  const send = (text: string, intentId?: string) => {
    const trimmed = text.trim()
    if (!trimmed || isThinking) return

    setMessages((current) => [...current, { id: Date.now(), sender: 'user', text: trimmed }])
    setInput('')
    setIsThinking(true)
    setSuggestions([])

    const reply = getAssistantReply(trimmed, turnCounts.current, intentId)
    // Longer answers "type" a little longer, within a comfortable range.
    const delay = 450 + Math.min(reply.text.length * 4, 700)

    replyTimer.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, sender: 'assistant', text: reply.text, actions: reply.actions },
      ])
      setSuggestions(reply.next)
      setIsThinking(false)
    }, delay)
  }

  const restart = () => {
    window.clearTimeout(replyTimer.current)
    turnCounts.current.clear()
    setMessages(greetingMessages())
    setSuggestions(initialSuggestions)
    setIsThinking(false)
    setInput('')
  }

  return (
    <div className="assistant-widget">
      {isOpen && (
        <div className="assistant-popup" role="dialog" aria-label="Portfolio assistant">
          <div className="assistant-header">
            <span className="assistant-avatar">
              <RobotLogo />
            </span>
            <div>
              <h3>Assist</h3>
              <p>
                <span className="status-dot" /> Ask about John Carlo
              </p>
            </div>
            <div className="assistant-header-actions">
              <button type="button" className="icon-button" onClick={restart} aria-label="Start over" title="Start over">
                <RestartIcon />
              </button>
              <button type="button" className="icon-button" onClick={() => setIsOpen(false)} aria-label="Close assistant">
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`message-group ${message.sender}`}>
                <div className={`message ${message.sender}`}>{message.text}</div>
                {message.actions && (
                  <div className="message-actions">
                    {message.actions.map((action) => (
                      <a
                        key={action.label}
                        className="message-action"
                        href={action.href}
                        {...(action.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        onClick={() => {
                          // In-page jumps: close the panel so the section is visible on small screens.
                          if (action.href.startsWith('#')) setIsOpen(false)
                        }}
                      >
                        {action.label}
                        <ArrowUpRight />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="message assistant thinking">
                <span className="sr-only">Thinking</span>
                <span className="loading-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="quick-prompts" aria-label="Suggested questions">
              {suggestions.map((intentId) => (
                <button key={intentId} type="button" className="chip" onClick={() => send(suggestionLabel(intentId), intentId)}>
                  {suggestionLabel(intentId)}
                </button>
              ))}
            </div>
          )}

          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault()
              send(input)
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about experience, projects, contact..."
              aria-label="Ask the assistant a question"
              maxLength={300}
            />
            <button type="submit" className="composer-send" aria-label="Send message" disabled={!input.trim() || isThinking}>
              <ArrowRight />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={isOpen ? 'assistant-bubble open' : 'assistant-bubble'}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={isOpen}
      >
        <span className="assistant-bubble-logo">
          <RobotLogo />
        </span>
        <span className="assistant-bubble-label">Assist</span>
      </button>
    </div>
  )
}
