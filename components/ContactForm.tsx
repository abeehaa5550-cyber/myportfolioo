'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

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
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onSubmit={handleSubmit(onSubmit)}
      className="surface-card p-6 sm:p-8"
    >
      <div className="mb-7 flex items-center gap-4 border-b border-white/10 pb-5">
        <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-white/10 bg-[#1F1F1F] shadow-[0_0_32px_rgba(237,228,212,0.12)]">
          <Image src="/images/abeeha-logo.jpg" alt="Abeeha Aamir logo" fill sizes="48px" className="object-cover" />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#CCC9B4]">TX.REQUEST</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#F5EDE4]">Start transmission</h3>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-[#CCC9B4]">
            NAME
          </label>
          <input
            id="name"
            {...register('name', { required: 'Please enter your name.' })}
            placeholder="Your name"
            className="mt-3 w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-sm text-[#EDE4D4] outline-none transition duration-200 placeholder:text-[#8C7561] focus:border-[#EDE4D4] focus:ring-2 focus:ring-[#EDE4D4]/15"
          />
          {errors.name ? <p className="mt-2 text-xs text-[#F5EDE4]">{errors.name.message}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-[#CCC9B4]">
            EMAIL
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
            className="mt-3 w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-sm text-[#EDE4D4] outline-none transition duration-200 placeholder:text-[#8C7561] focus:border-[#EDE4D4] focus:ring-2 focus:ring-[#EDE4D4]/15"
          />
          {errors.email ? <p className="mt-2 text-xs text-[#F5EDE4]">{errors.email.message}</p> : null}
        </div>

        <div>
          <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-[#CCC9B4]">
            MESSAGE
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message', { required: 'Please share a brief message.' })}
            placeholder="Describe your automation priority"
            className="mt-3 w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-sm text-[#EDE4D4] outline-none transition duration-200 placeholder:text-[#8C7561] focus:border-[#EDE4D4] focus:ring-2 focus:ring-[#EDE4D4]/15"
          />
          {errors.message ? <p className="mt-2 text-xs text-[#F5EDE4]">{errors.message.message}</p> : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EDE4D4] px-6 py-3 text-sm font-semibold text-[#111111] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F5EDE4] hover:shadow-[0_18px_45px_rgba(237,228,212,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? 'Sending...' : 'Send transmission'}
        </button>
      </div>
    </motion.form>
  )
}
