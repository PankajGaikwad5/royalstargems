'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set('[data-reveal]', { autoAlpha: 1, clearProps: 'transform,clipPath' })
      return
    }

    let cleanups = []

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray('[data-reveal]')
      gsap.set(revealItems, {
        autoAlpha: 0,
        y: 58,
        clipPath: 'inset(0 0 18% 0)',
        willChange: 'transform, opacity, clip-path',
      })

      ScrollTrigger.batch(revealItems, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.15,
            stagger: 0.11,
            ease: 'power3.out',
            clearProps: 'willChange',
          })
        },
      })

      gsap.utils.toArray('[data-parallax]').forEach((item) => {
        const speed = Number(item.dataset.parallax) || 18
        gsap.fromTo(
          item,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: item.closest('[data-parallax-wrap]') || item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.85,
            },
          }
        )
      })

      gsap.utils.toArray('[data-drift]').forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 ? -18 : 18,
          x: index % 2 ? 8 : -8,
          rotate: index % 2 ? -0.8 : 0.8,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        })
      })

      const magnetItems = gsap.utils.toArray('[data-magnetic]')
      cleanups = magnetItems.map((item) => {
        const onMove = (event) => {
          const rect = item.getBoundingClientRect()
          const x = event.clientX - rect.left - rect.width / 2
          const y = event.clientY - rect.top - rect.height / 2

          gsap.to(item, {
            x: x * 0.18,
            y: y * 0.22,
            duration: 0.42,
            ease: 'power3.out',
          })
        }

        const onLeave = () => {
          gsap.to(item, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' })
        }

        item.addEventListener('pointermove', onMove)
        item.addEventListener('pointerleave', onLeave)

        return () => {
          item.removeEventListener('pointermove', onMove)
          item.removeEventListener('pointerleave', onLeave)
        }
      })

      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
        },
      })
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  return (
    <div
      className="scroll-progress fixed left-0 top-0 z-[70] h-px w-full origin-left scale-x-0 bg-white/80 mix-blend-difference"
      aria-hidden="true"
    />
  )
}
