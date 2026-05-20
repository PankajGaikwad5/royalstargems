'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const IMG = '/jewelry-hero.png'

const SS = 41   // strip start %
const SE = 50   // strip scan end %
const SH = 16   // strip height %

export default function HeroReveal() {
  const containerRef = useRef(null)
  const clearRef     = useRef(null)
  const hLineRef     = useRef(null)
  const edgeTopRef   = useRef(null)
  const edgeBotRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.rv-top > span', {
        y: -120, opacity: 0, stagger: 0.05,
        duration: 1.3, ease: 'power3.out', delay: 0.1,
      })
      gsap.from('.rv-bot > span', {
        y: 120, opacity: 0, stagger: 0.05,
        duration: 1.3, ease: 'power3.out', delay: 0.25,
      })
      gsap.from(['.rv-left', '.rv-right'], {
        opacity: 0, duration: 1.4, delay: 1.1,
      })
      gsap.to('.rv-vline', {
        opacity: 0.2, duration: 2.2,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      })

      const scan = gsap.timeline({
        repeat: -1, yoyo: true,
        defaults: { ease: 'power1.inOut', duration: 4.2 },
      })
      scan
        .fromTo(clearRef.current,
          { clipPath: `inset(${SS}%    0 ${100 - SS - SH}% 0)` },
          { clipPath: `inset(${SE}%    0 ${100 - SE - SH}% 0)` }
        )
        .fromTo(hLineRef.current,
          { top: `${SS + SH * 0.5}%` },
          { top: `${SE + SH * 0.5}%` }, 0
        )
        .fromTo(edgeTopRef.current,
          { top: `${SS}%` },
          { top: `${SE}%` }, 0
        )
        .fromTo(edgeBotRef.current,
          { top: `${SS + SH}%`  },
          { top: `${SE + SH}%`  }, 0
        )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[520px] overflow-hidden bg-black"
    >

      {/* ── FROSTED GLASS
           35px blur: face features completely dissolve, only large forms remain
           brightness 0.82: skin highlights scatter through the blur → authentic frosted glass
           saturate 0.12: kills almost all colour → reads as glass not skin
           contrast 0.88: flattens internal detail → uniform glassy surface
           scale-125: hides the blur halo at all 4 edges                          */}
      <img
        src={IMG} alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center
                   scale-125 blur-[35px] brightness-[0.82] saturate-[0.12] contrast-[0.88]
                   pointer-events-none select-none"
      />

      {/* ── CLEAR EARRING STRIP — zero filter, just clipped */}
      <img
        ref={clearRef}
        src={IMG} alt="Kundan earring"
        className="absolute inset-0 w-full h-full object-cover object-center
                   brightness-[1.06] pointer-events-none select-none z-10"
        style={{ clipPath: `inset(${SS}% 0 ${100 - SS - SH}% 0)` }}
      />

      {/* ── ONE vertical crosshair — very faint */}
      <div className="rv-vline absolute inset-y-0 left-1/2 w-px bg-fuchsia-400/50 z-20 pointer-events-none" />

      {/* ── ONE horizontal line at strip centre */}
      <div
        ref={hLineRef}
        className="absolute inset-x-0 h-px bg-fuchsia-400/60 z-30 pointer-events-none"
        style={{ top: `${SS + SH * 0.5}%` }}
      />

      {/* ── Strip edges — hairlines */}
      <div
        ref={edgeTopRef}
        className="absolute inset-x-0 h-px bg-white/20 z-20 pointer-events-none"
        style={{ top: `${SS}%` }}
      />
      <div
        ref={edgeBotRef}
        className="absolute inset-x-0 h-px bg-white/20 z-20 pointer-events-none"
        style={{ top: `${SS + SH}%` }}
      />

      {/* ── REVEAL ghost text — top */}
      <div className="rv-top absolute inset-x-0 top-0 pt-3 flex justify-center
                      overflow-hidden pointer-events-none select-none">
        {'ROYAL STAR'.split('').map((c, i) => (
          <span
            key={i}
            className="font-black text-white/[0.09] leading-none tracking-[0.25em]
                       text-[clamp(5rem,16vw,12rem)]"
          >
            {c}
          </span>
        ))}
      </div>

      {/* ── AURUS ghost text — bottom */}
      <div className="rv-bot absolute inset-x-0 bottom-6 flex justify-center
                      overflow-hidden pointer-events-none select-none">
        {'GEMS'.split('').map((c, i) => (
          <span
            key={i}
            className="font-black text-white/[0.09] leading-none tracking-[0.45em]
                       text-[clamp(5rem,16vw,12rem)]"
          >
            {c}
          </span>
        ))}
      </div>

      {/* ── Left text at strip level */}
      <div className="rv-left absolute left-10 top-1/2 -translate-y-1/2 z-20">
        <p className="font-mono text-[11px] tracking-[0.3em] text-white/50 uppercase">
          THE CRAFT
        </p>
        <p className="font-mono text-[11px] tracking-[0.3em] text-white/50 uppercase">
          DOESN&apos;T
        </p>
      </div>

      {/* ── Right text at strip level */}
      <div className="rv-right absolute right-10 top-1/2 -translate-y-1/2 text-right z-20">
        <p className="font-mono text-[11px] tracking-[0.3em] text-white/50 uppercase">
          HIDE THE
        </p>
        <p className="font-mono text-[11px] tracking-[0.3em] text-white/50 uppercase">
          BRILLIANCE
        </p>
      </div>

      {/* ── Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 py-3 bg-black/50
                      flex items-center justify-center z-20">
        <span className="font-sans text-[10px] tracking-[0.6em] text-white/30 uppercase">
          Royan Star Gems — Fine Jewellery
        </span>
      </div>

    </section>
  )
}
