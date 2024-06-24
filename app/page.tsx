import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import Image from 'next/image'
export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white relative">
      <div className="absolute top-0 left-0 p-5">
        <Image
          src="/sentilog.png"
          alt="Sentilog Logo"
          width={200}
          height={200}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
        />
      </div>
      <div className="w-full max-w-[600px] mx-auto sm:px-6 lg:px-6 p-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4">
          The best AI Journal ever made!
        </h1>
        <p className="text-xl sm:text-2xl text-white/45 mb-4">
          This journal tries to predict your mood based on your every day
          events. All you have to do is be honest while writing your journal
          entries.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-pink-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-lg sm:text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
