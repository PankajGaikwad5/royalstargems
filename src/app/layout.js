import { Jost, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata = {
  title: 'Royal Star Gems - Fine Jewellery',
  description: 'Jewelry shaped in quiet beauty, crafted to be remembered.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${cormorant.variable} font-sans bg-white text-neutral-900`}>
        {children}
      </body>
    </html>
  )
}