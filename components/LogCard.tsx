const LogCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg shadow">
      <div className="px-4 py-5 bg-pink-600 text-white font-semibold sm:px-6">
        {date}
      </div>
      <div className="px-4 py-5 bg-pink-300 text-gray-900 sm:p-6">summary</div>
      <div className="px-4 py-4 bg-pink-300 text-gray-900 sm:px-6">mood</div>
    </div>
  )
}
export default LogCard
