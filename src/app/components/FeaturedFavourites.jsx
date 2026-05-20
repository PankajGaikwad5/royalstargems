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

const VISIBLE = 4

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
    const gap = 24
    gsap.to(trackRef.current, {
      x: -(next * (cardW + gap)),
      duration: 0.55,
      ease: 'power2.inOut',
    })
  }

  return (
    <section ref={sectionRef} className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-14">
        {/* Title */}
        <h2 data-reveal className="ff-title text-center mb-10 md:mb-12">
          <span className="font-sans text-[22px] md:text-[28px] font-light tracking-wide text-neutral-800">
            Featured{' '}
          </span>
          <span className="font-serif italic text-[28px] md:text-[36px] font-normal text-neutral-900">
            favourites
          </span>
        </h2>

        {/* Carousel wrapper */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 md:gap-6"
            style={{ willChange: 'transform' }}
          >
            {PRODUCTS.map(({ id, name, img }) => (
              <div
                key={id}
                data-reveal
                className="shrink-0 w-[calc(50%-10px)] md:w-[calc(25%-18px)] cursor-pointer group"
              >
                <div data-parallax-wrap className="overflow-hidden">
                  <img
                    src={img}
                    alt={name}
                    data-parallax="7"
                    className="w-full aspect-[3/4] scale-110 object-cover transition-transform duration-700"
                  />
                </div>
                <p className="mt-3 font-sans text-[12px] tracking-[0.1em] text-neutral-700">
                  {name}
                </p>
              </div>
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={() => slide(-1)}
            aria-label="Previous"
            className={`absolute left-0 top-[40%] -translate-y-1/2 w-9 h-9 bg-white border border-neutral-200 flex items-center justify-center shadow hover:bg-neutral-50 transition-all z-10 ${
              index > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft size={15} />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => slide(1)}
            aria-label="Next"
            className={`absolute right-0 top-[40%] -translate-y-1/2 w-9 h-9 bg-white border border-neutral-200 flex items-center justify-center shadow hover:bg-neutral-50 transition-all z-10 ${
              index < PRODUCTS.length - VISIBLE ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </section>
  )
}
