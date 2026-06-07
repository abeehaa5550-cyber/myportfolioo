'use client'

import React, { useRef } from 'react'

export default function WorkingForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted')

    const name = nameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const message = messageRef.current?.value || ''
    const button = buttonRef.current

    if (button) {
      button.disabled = true
      button.textContent = 'TRANSMITTING...'
      button.classList.add('signal-submit-pulse')
    }

    try {
      console.log('Sending data to Google Sheets...')
      const response = await fetch('/.netlify/functions/transmission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const contentType = response.headers.get('content-type') || ''
      const responseBody = await response.text()
      const result = contentType.includes('application/json') && responseBody
        ? JSON.parse(responseBody)
        : { error: 'The Google Sheets endpoint is unavailable in this environment.' }

      if (!response.ok) {
        throw new Error(result.error || 'Unable to save transmission.')
      }

      console.log('Transmission saved to Google Sheet:', result.updatedRange)
      if (button) button.textContent = 'TRANSMITTED'
      if (statusRef.current) statusRef.current.textContent = 'SIGNAL TRANSMITTED'
      statusRef.current?.classList.add('signal-status-visible')
      nameRef.current?.form?.reset()
    } catch (error) {
      console.warn('Google Sheets save failed:', error)
      if (button) button.textContent = 'TRANSMISSION FAILED'
      if (statusRef.current) statusRef.current.textContent = 'COULD NOT SAVE — PLEASE TRY AGAIN'
      statusRef.current?.classList.add('signal-status-failed')
    }

    window.setTimeout(() => {
      if (!button) return
      button.disabled = false
      button.textContent = 'TRANSMIT'
      button.classList.remove('signal-submit-pulse')
      statusRef.current?.classList.remove('signal-status-visible')
      statusRef.current?.classList.remove('signal-status-failed')
    }, 2350)
  }

  return (
    <div className="signal-form mx-auto w-full max-w-md">
      <h3 className="signal-form-badge">SIGNAL.NEW</h3>
      <h2 className="signal-form-title">Transmit Signal</h2>

      <form onSubmit={handleSubmit}>
        <div className="signal-input-group">
          <label htmlFor="name">NAME</label>
          <input ref={nameRef} id="name" name="name" type="text" required className="form-control" />
        </div>
        <div className="signal-input-group">
          <label htmlFor="email">EMAIL</label>
          <input ref={emailRef} id="email" name="email" type="email" required className="form-control" />
        </div>
        <div className="signal-input-group">
          <label htmlFor="message">MESSAGE</label>
          <textarea ref={messageRef} id="message" name="message" rows={4} required className="form-control" />
        </div>
        <button ref={buttonRef} type="submit" className="signal-submit">
          TRANSMIT
        </button>
        <p ref={statusRef} className="signal-status" aria-live="polite">SIGNAL TRANSMITTED</p>
      </form>
    </div>
  )
}
