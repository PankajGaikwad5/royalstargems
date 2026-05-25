'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PRESS = [
  {
    quote: 'The extensive selection promises an intimate, one-of-a-kind experience — the joy of being a bride, the way you like it.',
  },
  {
    quote: 'Opulent diamonds spell luxury for a day function, be it the mehendi ceremony or the wedding. Grand jewellery, beautifully crafted.',
  },
  {
    quote: 'Royal Star Gems creates timeless ornaments with an inherent heirloom-like quality that you will treasure forever.',
  },
]

export default function PressSection() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      ref.current.querySelectorAll('.press-col'),
      { y: 22, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.14, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 84%' },
      }
    )
  }, [])

  return (
    <section ref={ref} className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-8 md:px-16">

        {/* Title */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-sans text-[9px] tracking-[0.36em] text-neutral-400 uppercase mb-4 block">What they say</span>
          <h2>
            <span className="font-sans text-[20px] md:text-[24px] font-light text-neutral-500">Featured </span>
            <span className="font-serif italic text-[28px] md:text-[36px] text-neutral-900">testimonials</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          {PRESS.map(({ quote }, i) => (
            <div key={i} className="press-col flex items-center justify-center px-10 md:px-14 py-12 md:py-10">
              <p className="font-serif italic text-[17px] md:text-[18px] leading-[1.9] text-neutral-700 text-center">
                {quote}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
