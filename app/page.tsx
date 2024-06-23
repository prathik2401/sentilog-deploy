import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()

  let href = userId ? '/journal' : '/new-user'
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The best AI Journal ever made!</h1>
        <p className="text-2xl text-white/45 mb-4">
          This journal tries to predict your mood based on your every day
          events. All you have to do is be honest while writing your journal
          entries.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-pink-600 px-4 py-2 rounded-lg text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
