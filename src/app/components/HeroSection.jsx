'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 })

      tl.fromTo(
        '.hero-kicker',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          textRef.current,
          { y: 76, opacity: 0, clipPath: 'inset(0 0 24% 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.35, ease: 'power4.out' },
          '-=0.45'
        )
        .fromTo(
          btnRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.75'
        )
        .fromTo(
          '.hero-rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: 'power3.out' },
          '-=0.95'
        )

      gsap.to('.hero-bg', {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      })

      gsap.to('.hero-copy', {
        yPercent: -18,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.75,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[540px] overflow-hidden bg-neutral-950">
      <img
        src="/jwl.png"
        alt="Diamond jewelry hero"
        className="hero-bg absolute -inset-0 h-[112%] w-[112%] object-cover object-center"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className=" w-full h-screen flex justify-center items-center flex-col ">
        <span className="hero-kicker mb-5 block font-sans text-[10px] tracking-[0.42em] text-white/70 uppercase">
          Royal Star Gems
        </span>
        <p
          ref={textRef}
          className="font-serif text-white text-[30px] md:text-[46px] font-light leading-[1.05] mb-8"
        >
          Diamonds shaped in quiet beauty, crafted to be remembered.
        </p>
        <div className="hero-rule mb-8 h-px w-36 origin-left bg-white/50" />
        <button
          ref={btnRef}
          data-magnetic
          className="font-sans text-[10px] tracking-[0.3em] text-white border border-white/80 px-9 py-3.5 hover:bg-white hover:text-neutral-900 transition-all duration-300"
        >
          DISCOVER NEW
        </button>
      </div>
    </section>
  )
}
