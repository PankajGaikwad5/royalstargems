'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: `"I ABSOLUTELY love it. It is stunning. I loved wearing the pieces and so many people asked me about it. Can't wait to get more stuff from you. 💝"`,
    author: 'MALVIKA MEHTA',
    imgs: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=620&h=740&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=310&h=370&q=80',
      'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=310&h=370&q=80',
    ],
  },
  {
    quote: `"The craftsmanship is beyond beautiful. Every piece tells its own story. I receive so many compliments every time I wear Aurus."`,
    author: 'PRIYA SHARMA',
    imgs: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=620&h=740&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=310&h=370&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=310&h=370&q=80',
    ],
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const t = TESTIMONIALS[current]

  const navigate = (dir) =>
    setCurrent(c => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      }
    )
  }, [])

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-14 md:gap-16 items-start md:items-center">

          {/* Left: text */}
          <div data-reveal className="md:w-[38%] md:pr-8">
            <span className="font-sans text-[9px] tracking-[0.32em] text-neutral-400 uppercase mb-6 block">Customer Stories</span>
            <h2 className="mb-8">
              <span className="font-sans text-[20px] md:text-[26px] font-light tracking-widest text-neutral-500 uppercase block">Hear from </span>
              <span className="font-serif italic text-[30px] md:text-[38px] text-neutral-900">them!</span>
            </h2>
            <p className="font-serif text-[15px] md:text-[16px] text-neutral-600 leading-[1.9] mb-6 italic">
              {t.quote}
            </p>
            <p className="font-sans text-[10px] tracking-[0.22em] text-neutral-400 mb-10">
              — {t.author}
            </p>
            <button data-magnetic className="font-sans text-[10px] tracking-[0.22em] border border-neutral-900 px-8 py-3.5 hover:bg-neutral-900 hover:text-white transition-all duration-300">
              READ MORE TESTIMONIALS
            </button>
          </div>

          {/* Right: image collage */}
          <div data-reveal className="md:w-[62%]">
            <div className="flex gap-4 md:gap-5 items-stretch">
              {/* Main large image */}
              <div data-parallax-wrap className="flex-1 overflow-hidden">
                <img
                  src={t.imgs[0]}
                  alt="Customer testimonial"
                  data-parallax="7"
                  className="w-full h-full scale-110 object-cover"
                  style={{ maxHeight: '520px' }}
                />
              </div>
              {/* Two smaller images */}
              <div className="w-[28%] flex flex-col gap-4 md:gap-5">
                <div data-parallax-wrap className="overflow-hidden">
                  <img src={t.imgs[1]} alt="" data-parallax="10" className="w-full aspect-[3/4] scale-110 object-cover" />
                </div>
                <div data-parallax-wrap className="overflow-hidden">
                  <img src={t.imgs[2]} alt="" data-parallax="6" className="w-full aspect-[3/4] scale-110 object-cover" />
                </div>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
