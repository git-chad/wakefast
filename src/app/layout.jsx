import './globals.css'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({ 
  subsets: ['latin'],
  weight: '400'
 })

export const metadata = {
  title: 'Wakefast',
  description: 'git-chad',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pacifico.className}>{children}</body>
    </html>
  )
}
