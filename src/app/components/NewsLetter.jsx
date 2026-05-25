'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Newsletter() {
  const ref = useRef(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      ref.current.querySelectorAll('.nl-item'),
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 86%' },
      }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <section ref={ref} className="bg-cream py-18 md:py-24">
      <div className="mx-auto max-w-[1200px] px-8 md:px-16 flex flex-col md:flex-row md:items-center gap-10 md:gap-16">

        {/* Left */}
        <div className="md:flex-1">
          <p data-reveal className="nl-item font-sans text-[9px] tracking-[0.34em] text-neutral-400 mb-3 uppercase">
            Newsletter
          </p>
          <h3 data-reveal className="nl-item">
            <span className="font-sans text-[20px] md:text-[24px] font-light tracking-wide text-neutral-600 block">Be a part of </span>
            <span className="font-serif italic text-[28px] md:text-[34px] text-neutral-900">our world!</span>
          </h3>
        </div>

        {/* Right */}
        <div data-reveal className="nl-item md:flex-1 md:max-w-[480px]">
          <form onSubmit={handleSubmit} className="flex h-[48px]">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white border border-neutral-300 border-r-0 px-5 font-sans text-[12.5px] placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-neutral-900 text-white font-sans text-[9px] tracking-[0.26em] px-7 hover:bg-neutral-700 transition-colors duration-300 shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="mt-3 font-sans text-[11px] text-neutral-400">
            By signing up you agree with our{' '}
            <span className="underline cursor-pointer hover:text-neutral-600 transition-colors">
              Terms &amp; Conditions
            </span>
          </p>
        </div>

      </div>
    </section>
  )
}
