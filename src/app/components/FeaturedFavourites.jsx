'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PRODUCTS = [
  {
    id: 1,
    name: 'Anya Diamond Studs',
    img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=500&h=620&q=80',
  },
  {
    id: 2,
    name: 'Nivara Eternity Choker',
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&h=620&q=80',
  },
  {
    id: 3,
    name: 'Aira Solitaire Ring',
    img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&h=620&q=80',
  },
  {
    id: 4,
    name: 'Tapsee Diamond Pendant',
    img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=500&h=620&q=80',
  },
  {
    id: 5,
    name: 'Priya Diamond Bracelet',
    img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=500&h=620&q=80',
  },
]

const VISIBLE = 3

export default function FeaturedFavourites() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      sectionRef.current.querySelector('.ff-title'),
      { y: 22, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 84%' },
      }
    )
  }, [])

  const slide = (dir) => {
    const next = Math.max(0, Math.min(index + dir, PRODUCTS.length - VISIBLE))
    setIndex(next)
    if (!trackRef.current?.children[0]) return
    const cardW = trackRef.current.children[0].offsetWidth
    const gap = 32
    gsap.to(trackRef.current, {
      x: -(next * (cardW + gap)),
      duration: 0.55,
      ease: 'power2.inOut',
    })
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        {/* Title */}
        <h2 data-reveal className="ff-title text-center mb-14 md:mb-18">
          <span className="font-sans text-[20px] md:text-[26px] font-light tracking-widest text-neutral-500 uppercase">
            Featured{' '}
          </span>
          <span className="font-serif italic text-[30px] md:text-[38px] font-normal text-neutral-900">
            favourites
          </span>
        </h2>

        {/* Carousel wrapper */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8"
            style={{ willChange: 'transform' }}
          >
            {PRODUCTS.map(({ id, name, img }) => (
              <div
                key={id}
                data-reveal
                className="shrink-0 w-[calc(50%-12px)] md:w-[calc(33.333%-22px)] cursor-pointer group"
              >
                <div data-parallax-wrap className="overflow-hidden">
                  <img
                    src={img}
                    alt={name}
                    data-parallax="7"
                    className="w-full aspect-[3/4] scale-110 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-sans text-[11px] tracking-[0.15em] text-neutral-500 uppercase">
                  {name}
                </p>
              </div>
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => slide(-1)}
            aria-label="Previous"
            className={`absolute left-0 top-[42%] -translate-y-1/2 w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 z-10 ${
              index > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft size={14} />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => slide(1)}
            aria-label="Next"
            className={`absolute right-0 top-[42%] -translate-y-1/2 w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 z-10 ${
              index < PRODUCTS.length - VISIBLE ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
