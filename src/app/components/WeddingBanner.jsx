'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function WeddingBanner() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      ref.current.querySelectorAll('.wb-text'),
      { y: 26, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.13, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      }
    )
  }, [])

  return (
    <section ref={ref} data-parallax-wrap className="relative w-full h-[68vh] min-h-[420px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85"
        alt="Wedding diamonds"
        data-parallax="12"
        className="absolute -inset-y-10 left-0 w-full h-[calc(100%+5rem)] object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/38 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span data-reveal className="wb-text font-sans text-[9.5px] tracking-[0.38em] text-white/90 uppercase mb-4">
          The Aurus Bride
        </span>
        <h2 data-reveal className="wb-text font-serif italic text-white text-[40px] md:text-[62px] font-light leading-none mb-3">
          Bridal Diamonds
        </h2>
        <p data-reveal className="wb-text font-sans text-white/90 text-[14px] md:text-base font-light tracking-wide mb-9">
          an extension of your pure elegance
        </p>
        <button data-reveal data-magnetic className="wb-text font-sans text-[10px] tracking-[0.3em] text-white border border-white px-10 py-3.5 hover:bg-white hover:text-neutral-900 transition-all duration-300">
          DISCOVER MORE
        </button>
      </div>
    </section>
  )
}
