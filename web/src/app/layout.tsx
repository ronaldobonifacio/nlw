import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Copyrith } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/profile'
import { SingIn } from '@/components/singin'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Space Time',
  description: 'Uma cápsula do tempo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-starts.svg)] bg-cover px-28 py-16">
            {/* blur */}
            <div className=" absolute right-0 top-1/2  h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full " />
            {/* stripes */}
            <div className="absolute bottom-0  right-2 top-0 w-2  bg-stripes" />
            {isAuthenticated ? <Profile /> : <SingIn />}

            <Hero />
            <Copyrith />
          </div>
          {/* rigth */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-starts.svg)] bg-cover ">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
