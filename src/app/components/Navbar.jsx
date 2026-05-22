'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import Image from 'next/image'

const NAV_LINKS = [
  'NEW', 'NECKLACES', 'EARRINGS', 'ACCENTS',
  'EDITS', 'WEDDING', 'SAJJA', 'THE WORLD OF ROYALSTARGEMS',
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const headerRef = useRef(null)
  const overlayRef = useRef(null)
  const drawerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const linkRefs = useRef([])
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const busyRef = useRef(false)

  useEffect(() => {
    gsap.set(drawerRef.current, { xPercent: 100 })
    gsap.set(overlayRef.current, { opacity: 0 })
    gsap.set(closeBtnRef.current, { opacity: 0, scale: 0.7, rotation: -90 })
    gsap.set(linkRefs.current.filter(Boolean), { opacity: 0, x: 56 })

    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.1,
      onComplete: () => {
        gsap.set(headerRef.current, { clearProps: 'all' })
      }
    })

    const onScroll = () => setIsScrolled(window.scrollY > 10)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)

      const pageContent = document.getElementById('page-content')
      if (pageContent) gsap.set(pageContent, { clearProps: 'transform' })
    }
  }, [])

  const getPageContent = () => document.getElementById('page-content')

  const openMenu = useCallback(() => {
    if (busyRef.current || menuOpen) return

    busyRef.current = true
    setMenuOpen(true)

    const pageContent = getPageContent()
    const links = linkRefs.current.filter(Boolean)

    gsap.killTweensOf([
      overlayRef.current,
      drawerRef.current,
      closeBtnRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      pageContent,
      ...links,
    ].filter(Boolean))

    const tl = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => {
        busyRef.current = false
      },
    })

    tl.to(line1Ref.current, { y: 6.5, rotation: 45, duration: 0.5, ease: 'sine.inOut' }, 0)
    tl.to(line2Ref.current, { scaleX: 0, opacity: 0, duration: 0.32, ease: 'sine.inOut' }, 0)
    tl.to(line3Ref.current, { y: -6.5, rotation: -45, width: 24, duration: 0.5, ease: 'sine.inOut' }, 0)
    tl.to(overlayRef.current, { opacity: 1, duration: 0.78, ease: 'sine.out' }, 0)
    tl.fromTo(
      drawerRef.current,
      { xPercent: 100 },
      { xPercent: 0, duration: 1.05, ease: 'power3.out' },
      0
    )

    if (pageContent) {
      tl.to(pageContent, { x: -18, duration: 1.15, ease: 'power3.out' }, 0)
    }

    tl.fromTo(
      links,
      { x: 34, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.74, stagger: 0.075, ease: 'power2.out' },
      0.34
    )
    tl.fromTo(
      closeBtnRef.current,
      { opacity: 0, scale: 0.92, rotation: -25 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.62, ease: 'power2.out' },
      0.42
    )
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    if (busyRef.current || !menuOpen) return

    busyRef.current = true
    const pageContent = getPageContent()
    const links = linkRefs.current.filter(Boolean)

    gsap.killTweensOf([
      overlayRef.current,
      drawerRef.current,
      closeBtnRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      pageContent,
      ...links,
    ].filter(Boolean))

    const tl = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => {
        setMenuOpen(false)
        if (pageContent) gsap.set(pageContent, { clearProps: 'transform' })
        busyRef.current = false
      },
    })

    tl.to(line1Ref.current, { y: 0, rotation: 0, duration: 0.44, ease: 'sine.inOut' }, 0)
    tl.to(line2Ref.current, { scaleX: 1, opacity: 1, duration: 0.34, ease: 'sine.inOut' }, 0.05)
    tl.to(line3Ref.current, { y: 0, rotation: 0, width: 18, duration: 0.44, ease: 'sine.inOut' }, 0)
    tl.to(closeBtnRef.current, { opacity: 0, scale: 0.92, rotation: 20, duration: 0.28, ease: 'sine.inOut' }, 0)
    tl.to(links, { x: 20, opacity: 0, duration: 0.32, stagger: 0.03, ease: 'sine.inOut' }, 0)
    tl.to(drawerRef.current, { xPercent: 100, duration: 0.86, ease: 'power3.inOut' }, 0.08)

    if (pageContent) {
      tl.to(pageContent, { x: 0, duration: 0.9, ease: 'power3.inOut' }, 0.08)
    }

    tl.to(overlayRef.current, { opacity: 0, duration: 0.62, ease: 'sine.out' }, 0.16)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = event => {
      if (event.key === 'Escape') closeMenu()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeMenu, menuOpen])

  const navbarScrolled = isScrolled

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${navbarScrolled
          ? 'bg-white shadow-[0_1px_16px_rgba(0,0,0,0.07)] text-black'
          : 'bg-transparent text-white'
          }`}
      >
        <div className="relative flex h-[62px] items-center justify-center px-5 md:h-[72px] md:px-10">
          <Link href="/" className="flex shrink-0 items-center">
            <Image src="/logo1.png" alt="Logo" width={200} height={200} priority />
          </Link>

          <button
            type="button"
            className="group absolute right-5 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-current/30 md:right-10"
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="flex w-6 flex-col items-end">
              <span ref={line1Ref} className="mb-[5px] block h-[1.5px] w-6 origin-center bg-current" />
              <span ref={line2Ref} className="mb-[5px] block h-[1.5px] w-6 origin-center bg-current" />
              <span ref={line3Ref} className="block h-[1.5px] w-[18px] origin-center bg-current transition-[width] duration-300 group-hover:w-6" />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-30 bg-black/55 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={closeMenu}
      />

      <aside
        ref={drawerRef}
        className="fixed bottom-0 right-0 top-0 z-[60] flex w-[min(82vw,320px)] flex-col overflow-hidden bg-black text-white shadow-[-10px_0_50px_rgba(0,0,0,0.24)] md:w-[22vw] md:min-w-[300px] md:max-w-[360px]"
        role="dialog"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={closeMenu}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white/65 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
          aria-label="Close menu"
        >
          <span className="absolute h-[1.5px] w-5 rotate-45 bg-current" />
          <span className="absolute h-[1.5px] w-5 -rotate-45 bg-current" />
        </button>

        <nav className="flex flex-1 flex-col justify-center px-8 pb-10 pt-20 md:px-10">
          <p className="mb-7 select-none font-sans text-[9px] uppercase tracking-[0.35em] text-white/40">
            Menu
          </p>

          {NAV_LINKS.map((link, index) => (
            <Link
              key={link}
              href="#"
              ref={element => {
                linkRefs.current[index] = element
              }}
              onClick={closeMenu}
              className="group border-b border-white/10 py-[13px] font-serif text-[13px] uppercase tracking-[0.16em] text-white/72 transition-colors duration-300 last:border-b-0 hover:text-white md:text-[14px]"
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-2">
                {link}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
