'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const COLLECTIONS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=520&h=640&q=80',
    label: 'DIAMOND RINGS',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=520&h=640&q=80',
    label: 'BRIDAL SETS',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=520&h=640&q=80',
    label: 'DIAMOND EARRINGS',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?auto=format&fit=crop&w=520&h=640&q=80',
    label: 'DIAMOND NECKLACES',
  },
]

export default function CollectionsSection() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  const shown = [
    COLLECTIONS[active % COLLECTIONS.length],
    COLLECTIONS[(active + 1) % COLLECTIONS.length],
    COLLECTIONS[(active + 2) % COLLECTIONS.length],
  ]

  const navigate = (dir) => {
    setActive(a => (a + dir + COLLECTIONS.length) % COLLECTIONS.length)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      ref.current.querySelector('.col-title'),
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 84%' },
      }
    )
  }, [])

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        <h2 data-reveal className="col-title text-center mb-14 md:mb-18">
          <span className="font-sans text-[20px] md:text-[26px] font-light tracking-widest text-neutral-500 uppercase">
            Discover our{' '}
          </span>
          <span className="font-serif italic text-[30px] md:text-[38px] font-normal text-neutral-900">
            collections
          </span>
        </h2>

        <div className="relative">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {shown.map(({ id, img, label }, i) => (
              <div
                key={`${id}-${i}`}
                data-reveal
                className="relative group overflow-hidden cursor-pointer"
              >
                <img
                  src={img}
                  alt={label}
                  data-parallax="8"
                  className="w-full aspect-[3/4] scale-110 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/28 transition-colors duration-400" />
                <span className="absolute bottom-5 left-5 font-sans text-[9px] md:text-[10px] tracking-[0.22em] text-white/90">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Arrows below grid */}
          <div className="flex gap-3 mt-8 justify-center">
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous collection"
              className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => navigate(1)}
              aria-label="Next collection"
              className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
