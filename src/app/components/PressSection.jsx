'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PRESS = [
  {
    logo: 'VOGUE',
    quote: '"The extensive selection at Aurus promises an intimate, one-of-a-kind experience—the joy of being a bride, the way you like it..."',
  },
  {
    logo: 'BRIDES TODAY',
    quote: '"Opulent emeralds spell luxury for a day function, be it the mehendi ceremony or the wedding. Rich brocade, grand jewellery..."',
  },
  {
    logo: 'THE VOICE OF FASHION',
    quote: '"Ahmedabad-based fine jewellery brand Aurus Jewels creates timeless ornaments with an inherent heirloom-like quality...."',
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
    <section ref={ref} className="bg-cream py-10 md:py-12">
        {/* Title */}
        <h2 data-reveal className="ff-title text-center mb-10 md:mb-12">
          <span className="font-sans text-[22px] md:text-[28px] font-light tracking-wide text-neutral-800">
            Featured{' '}
          </span>
          <span className="font-serif italic text-[28px] md:text-[36px] font-normal text-neutral-900">
            testimonials
          </span>
        </h2>
      <div className="mx-auto max-w-[1440px] px-6 md:px-14 grid grid-cols-1 md:grid-cols-3">
        {PRESS.map(({ logo, logoClass, quote }, i) => (
          <div
            key={logo}
            data-reveal
            className={`press-col flex flex-col items-center justify-center text-center px-6 md:px-10 py-8 md:py-0 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-neutral-300' : ''
              }`}
          >
            {/* <span className={'font-serif text-[12.5px] tracking-[0.18em] font-bold uppercase'}>{logo}</span> */}
            <p className="mt-4 font-serif text-sm tracking-[0.18em] font-bold uppercase italic max-w-70">
              {quote}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
