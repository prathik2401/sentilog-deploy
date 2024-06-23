import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getLog = async (id) => {
  const user = await getUserByClerkId()
  const log = await prisma.journalLog.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return log
}
const LogPage = async ({ params }) => {
  const log = await getLog(params.id)
  return (
    <div className=" h-full w-full text-white bg-zinc-600">
      <Editor log={log} />
    </div>
  )
}

export default LogPage
