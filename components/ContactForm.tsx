'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

type ContactFormValues = {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()

  const onSubmit = async (data: ContactFormValues) => {
    console.log('Contact inquiry:', data)
    reset()
    window.alert('Message received. I will follow up shortly!')

    // Placeholder for EmailJS or similar integration:
    // emailjs.send('service_xxx', 'template_xxx', data, 'publicKey')
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onSubmit={handleSubmit(onSubmit)}
      className="surface-card p-8 sm:p-10"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Please enter your name.' })}
            placeholder="Your name"
            className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
          />
          {errors.name ? <p className="mt-2 text-xs text-rose-400">{errors.name.message}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Please enter your email address.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
              },
            })}
            placeholder="you@example.com"
            className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
          />
          {errors.email ? <p className="mt-2 text-xs text-rose-400">{errors.email.message}</p> : null}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message', { required: 'Please share a brief message.' })}
            placeholder="Describe your automation priority"
            className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
          />
          {errors.message ? <p className="mt-2 text-xs text-rose-400">{errors.message.message}</p> : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </motion.form>
  )
}
