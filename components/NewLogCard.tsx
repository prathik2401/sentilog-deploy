'use client'

import { createNewLog } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewLogCard = () => {
  const router = useRouter()
  const handleClick = async () => {
    const data = await createNewLog()
    router.push(`/journal/${data.id}`)
  }
  return (
    <div
      className="text-pink-50/85 hover:text-white flex items-center justify-center cursor-pointer overflow-hidden rounded-lg bg-pink-600/90 shadow"
      onClick={handleClick}
    >
      <div className=" ">
        <div className=" text-8xl text-center font-semibold">+</div>
        <div className=" text-xl text-center font-semibold">New Log</div>
      </div>
    </div>
  )
}
export default NewLogCard
