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
    <section ref={ref} className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-14">
        <h2 data-reveal className="col-title text-center mb-10 md:mb-12">
          <span className="font-sans text-[22px] md:text-[28px] font-light tracking-wide text-neutral-800">
            Discover our{' '}
          </span>
          <span className="font-serif italic text-[28px] md:text-[36px] font-normal text-neutral-900">
            collections
          </span>
        </h2>

        <div className="relative">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
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
                  className="w-full aspect-[3/4] scale-110 object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/22 transition-colors duration-300" />
                <span className="absolute bottom-4 right-4 font-sans text-[9px] md:text-[10px] tracking-[0.2em] text-white">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Arrows outside grid */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous collection"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center shadow hover:bg-neutral-50 transition z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => navigate(1)}
            aria-label="Next collection"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center shadow hover:bg-neutral-50 transition z-10"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
