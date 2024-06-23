'use client'
import { updatedLog } from '@/utils/api'
import { useState } from 'react'

const Editor = ({ log }) => {
  const [value, setValue] = useState(log.content)
  const [saveButton, setSaveButton] = useState('Save')
  const [analysis, setanalysis] = useState(log.analysis)

  const { mood, summary, color, subject, negative } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'Yes' : 'No' },
  ]
  const handleSave = async () => {
    setSaveButton('Saving...')
    const data = await updatedLog(log.id, value)
    setanalysis(data.analysis)
    setSaveButton('Save')
  }

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <textarea
          name="Enter the log of your day here!"
          id=""
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-[80vh] p-8 text-xl bg-zinc-600 outline-none"
        />
        <button
          onClick={handleSave}
          className=" -ml-52 px-4 py-2 bg-pink-600 w-36 h-12 font-medium shadow-lg shadow-slate-700 text-xl text-white rounded"
        >
          {saveButton}
        </button>
      </div>
      <div className="h-2/3 m-8 grid grid-rows-6 shadow-2xl">
        <div
          className="font-semibold text-3xl rounded-t-3xl text-white pt-14 pl-8 row-span-2"
          style={{ backgroundColor: color }}
        >
          Analysis
        </div>
        <div className="bg-white text-black p-4 rounded-b-3xl row-span-5 text-xl">
          <ul>
            {analysisData.map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-8 justify-between py-5 border-b border-blue-100"
              >
                <span className="font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
