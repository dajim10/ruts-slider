import './globals.css'
import { Inter } from 'next/font/google'
// import Nav from './Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RUTS PR',
  description: 'Generated by create Arit',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Nav /> */}
        {children}</body>
    </html>
  )
}
