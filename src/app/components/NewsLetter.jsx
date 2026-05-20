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
    <section ref={ref} className="bg-cream py-12 md:py-14">
      <div className="mx-auto max-w-[1440px] px-6 md:px-14 flex flex-col md:flex-row md:items-center gap-8">

        {/* Left */}
        <div className="md:flex-1 md:pr-10">
          <p data-reveal className="nl-item font-sans text-[9.5px] tracking-[0.32em] text-neutral-500 mb-2 uppercase">
            Sign up to our newsletter
          </p>
          <h3 data-reveal className="nl-item">
            <span className="font-sans text-[22px] font-light">Be a part of </span>
            <span className="font-serif italic text-[28px]">our world!</span>
          </h3>
        </div>

        {/* Right */}
        <div data-reveal className="nl-item md:flex-1 md:max-w-[520px]">
          <form onSubmit={handleSubmit} className="flex h-[46px]">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-white border border-neutral-300 border-r-0 px-4 font-sans text-[12.5px] placeholder:text-neutral-400 focus:outline-none focus:border-neutral-600 transition-colors"
            />
            <button
              type="submit"
              className="bg-neutral-900 text-white font-sans text-[9.5px] tracking-[0.22em] px-6 hover:bg-neutral-700 transition-colors duration-300 shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="mt-2.5 font-sans text-[11px] text-neutral-500">
            By signing up you agree with our{' '}
            <span className="underline cursor-pointer hover:text-neutral-700 transition-colors">
              Terms &amp; Conditions
            </span>
          </p>
        </div>

      </div>
    </section>
  )
}
