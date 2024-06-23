import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import HistoryChart from '@/components/HistoryChart'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const History = async () => {
  const { avg, analyses } = await getData()

  return (
    <div
      style={{
        color: 'lightgray',
        padding: '16px',
        width: '100%',
        height: '100%',
        backgroundColor: '#121212',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className=""
    >
      <div className="top-0 text-3xl text-center m-8">{`View your mood insights here`}</div>
      <div
        style={{ height: '83.3333%', width: '83.3333%' }}
        className="bg-emerald-400/5 rounded-3xl p-4"
      >
        <div>{`Average Sentiment: ${avg}`}</div>
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
