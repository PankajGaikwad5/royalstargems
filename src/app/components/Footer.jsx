import Link from 'next/link'
import Image from 'next/image'

const KNOW_MORE = ['About Aurus', 'Privacy', 'Terms & Conditions', 'Testimonials', 'Contact Us']
const HELP = ['Jewel Care', 'Our Materials', 'Glossary', 'Sizing Chart', 'Terms Of Service', 'FAQ']
const SOCIAL = ['Instagram', 'Facebook', 'Pinterest']

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100">
      <div className="mx-auto max-w-[1440px] px-6 md:px-14 pt-14 pb-10 grid grid-cols-2 md:grid-cols-5 gap-10">

        {/* Logo */}
        <div data-reveal className="col-span-2 md:col-span-1 flex flex-col items-start">
          {/* Logo mark — simplified Image */}
          <Image
            src="/logo2.png"
            alt="Logo"
            width={200}
            height={200}
          />
        </div>

        {/* Know More */}
        <div data-reveal>
          <p className="font-sans text-[10px] tracking-[0.2em] text-neutral-500 mb-5 uppercase">Know More</p>
          <ul className="space-y-3">
            {KNOW_MORE.map(item => (
              <li key={item}>
                <Link href="#" className="font-sans text-[12.5px] text-neutral-700 hover:text-black transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div data-reveal>
          <p className="font-sans text-[10px] tracking-[0.2em] text-neutral-500 mb-5 uppercase">Help</p>
          <ul className="space-y-3">
            {HELP.map(item => (
              <li key={item}>
                <Link href="#" className="font-sans text-[12.5px] text-neutral-700 hover:text-black transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div data-reveal>
          <p className="font-sans text-[10px] tracking-[0.2em] text-neutral-500 mb-5 uppercase">Connect</p>
          <div className="space-y-2.5">
            <a href="mailto:hello@aurusjewels.com" className="block font-sans text-[12.5px] text-neutral-700 hover:text-black transition-colors">
              hello@aurusjewels.com
            </a>
            <a href="tel:+918866286000" className="block font-sans text-[12.5px] text-neutral-700 hover:text-black transition-colors">
              +91 8866286000
            </a>
            <div className="mt-5 pt-1">
              <p className="font-sans text-[12px] font-semibold text-neutral-800 mb-1.5">Ahmedabad</p>
              <p className="font-sans text-[12px] text-neutral-600 leading-5">
                AURUS, 218, Sushil Park, Vastrapur,<br />
                Ahmedabad, Gujarat<br />
                <em className="not-italic text-neutral-400">(Visits by Appointment only)</em>
              </p>
            </div>
            <div className="mt-4">
              <p className="font-sans text-[12px] font-semibold text-neutral-800 mb-1.5">Chennai</p>
              <p className="font-sans text-[12px] text-neutral-600 leading-5">
                Aurus & Moi, Goodearth Compound,<br />
                Rutland Gate, 5th Street, Chennai,<br />
                Tamil Nadu
              </p>
            </div>
          </div>
        </div>

        {/* Find Us On */}
        <div data-reveal>
          <p className="font-sans text-[10px] tracking-[0.2em] text-neutral-500 mb-5 uppercase">Find Us On</p>
          <ul className="space-y-3">
            {SOCIAL.map(item => (
              <li key={item}>
                <Link href="#" className="font-sans text-[12.5px] text-neutral-700 hover:text-black transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Copyright bar */}
      <div className="border-t border-neutral-100 py-4 text-center">
        <p className="font-sans text-[11px] text-neutral-400">
          © 2026, Royal Star Gems. All Rights Reserved
        </p>
      </div>
    </footer >
  )
}
