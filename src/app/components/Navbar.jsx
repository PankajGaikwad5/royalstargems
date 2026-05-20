'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { Search, Menu, X } from 'lucide-react'
import Image from 'next/image'

const NAV_LINKS = [
  'NEW', 'NECKLACES', 'EARRINGS', 'ACCENTS',
  'EDITS', 'WEDDING', 'SAJJA', 'THE WORLD OF ROYALSTARGEMS',
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
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

    const onScroll = () => {
      // Transition background immediately when scrolled past 10px
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navbarScrolled = isScrolled || mobileOpen

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${navbarScrolled
          ? 'bg-white shadow-[0_1px_16px_rgba(0,0,0,0.07)] text-black'
          : 'bg-transparent text-white'
          }`}
      >
        <div className="flex items-center h-[62px] md:h-[72px] px-5 md:px-10 gap-4">

          {/* Hamburger */}
          <button
            className="md:hidden z-50"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center shrink-0 md:mr-8 mt-5">

            <Image
              src="/logo1.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center gap-5 lg:gap-7">
            {NAV_LINKS.map(link => (
              <Link
                key={link}
                href="#"
                className={`font-sans text-[10px] tracking-[0.14em] transition-colors whitespace-nowrap ${navbarScrolled
                  ? 'text-black hover:text-black/60'
                  : 'text-white hover:text-white/80'
                  }`}
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="ml-auto flex items-center gap-4">
            <button className="hover:opacity-60 transition-opacity" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-[62px] left-0 bottom-0 w-64 bg-white shadow-xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <nav className="p-5 pt-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="block font-sans text-[11px] tracking-[0.18em] text-neutral-700 py-4 border-b border-neutral-100 hover:text-black transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}