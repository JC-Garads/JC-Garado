import { useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import { ArrowRight, ArrowUpRight, LinkedInIcon, MailIcon } from './icons'

type Status = { tone: 'error' | 'success'; text: string } | null

export function Contact() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>(null)
  const [isLocked, setIsLocked] = useState(false)

  const updateField = (field: keyof typeof contactForm) => (value: string) =>
    setContactForm((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (honeypot) {
      setStatus({ tone: 'error', text: 'Message rejected.' })
      return
    }

    const name = contactForm.name.trim()
    const email = contactForm.email.trim()
    const message = contactForm.message.trim()

    if (!name || !email || !message) {
      setStatus({ tone: 'error', text: 'Please fill in your name, email, and message.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ tone: 'error', text: 'Please use a valid email address.' })
      return
    }
    if (message.length < 20) {
      setStatus({ tone: 'error', text: 'Your message should be at least 20 characters long.' })
      return
    }
    if (isLocked) {
      setStatus({ tone: 'error', text: 'Too many attempts. Please try again in a moment.' })
      return
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus({ tone: 'success', text: `Your email app should open with a draft to ${profile.email}.` })
    setIsLocked(true)
    setContactForm({ name: '', email: '', message: '' })

    window.setTimeout(() => setIsLocked(false), 15000)
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-panel" data-reveal>
        <div className="contact-intro">
          <p className="eyebrow">
            <span className="eyebrow-index">04</span>
            <span className="eyebrow-rule" />
            Contact
          </p>
          <h2>Let’s connect.</h2>
          <p className="contact-copy">
            I’m open to opportunities in database operations, production support, incident resolution, and operational
            process improvement.
          </p>

          <div className="contact-links">
            <a className="contact-link" href={`mailto:${profile.email}`}>
              <span className="contact-link-icon">
                <MailIcon />
              </span>
              <span className="contact-link-text">
                <span className="contact-link-label">Email</span>
                <span className="contact-link-value">{profile.email}</span>
              </span>
              <ArrowUpRight className="contact-link-arrow" />
            </a>
            <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <span className="contact-link-icon">
                <LinkedInIcon />
              </span>
              <span className="contact-link-text">
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">View professional profile</span>
              </span>
              <ArrowUpRight className="contact-link-arrow" />
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="hide-bot">
            <label htmlFor="bot-check">Leave this blank</label>
            <input
              id="bot-check"
              type="text"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={contactForm.name}
                onChange={(event) => updateField('name')(event.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={contactForm.email}
                onChange={(event) => updateField('email')(event.target.value)}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={5}
              value={contactForm.message}
              onChange={(event) => updateField('message')(event.target.value)}
              placeholder="Tell me a bit about your opportunity..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button primary" disabled={isLocked}>
              {isLocked ? 'Please wait...' : 'Send via email'}
              {!isLocked && <ArrowRight className="button-icon" />}
            </button>
            <a className="button ghost" href={`mailto:${profile.email}`}>
              Email directly
            </a>
          </div>

          {status && (
            <p className={`form-status ${status.tone}`} role="status">
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
