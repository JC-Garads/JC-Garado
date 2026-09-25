import { useEffect, useRef, useState } from 'react'
import { assistantGreeting, getAssistantReply, profile, quickPrompts } from '../data/portfolio'
import { ArrowRight, CloseIcon, RobotLogo } from './icons'

type ChatMessage = { id: number; sender: 'assistant' | 'user'; text: string }

export function Assistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(assistantGreeting)
  const messagesRef = useRef<HTMLDivElement | null>(null)

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

  const send = (prompt?: string) => {
    const text = (prompt ?? input).trim()
    if (!text) return

    setMessages((current) => [...current, { id: Date.now(), sender: 'user', text }])
    setInput('')
    setIsThinking(true)

    const reply = getAssistantReply(text)
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: Date.now() + 1, sender: 'assistant', text: reply }])
      setIsThinking(false)
    }, 700)
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
                <span className="status-dot" /> Ask about {profile.name.split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
            <button type="button" className="icon-button" onClick={() => setIsOpen(false)} aria-label="Close assistant">
              <CloseIcon />
            </button>
          </div>

          <div className="chat-messages" ref={messagesRef}>
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}

            {isThinking && (
              <div className="message assistant thinking" aria-live="polite">
                <span className="sr-only">Thinking</span>
                <span className="loading-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
          </div>

          <div className="quick-prompts">
            {quickPrompts.map((prompt) => (
              <button key={prompt} type="button" className="chip" onClick={() => send(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault()
              send()
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the profile..."
              aria-label="Ask the assistant a question"
            />
            <button type="submit" className="composer-send" aria-label="Send message" disabled={!input.trim()}>
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
