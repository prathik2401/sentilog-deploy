'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setloading] = useState(false)
  const [response, setresponse] = useState()
  const onChange = (e) => {
    setValue(e.target.value)
  }

  // This function is called when the form is submitted to ask a question to the AI Journal
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (value != '') {
      setloading(true)
      const answer = await askQuestion(value)
      setresponse(answer)
      setValue('')
      setloading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center ">
          <input
            disabled={loading}
            onChange={onChange}
            value={value}
            type="text"
            placeholder="Ask a question"
            className="px-8 py-3 w-full rounded-l-lg text-lg outline-none"
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-pink-600 border border-pink-600 px-4 py-3 rounded-r-lg text-lg text-white font-semibold"
          >
            Ask
          </button>
        </div>
        <div className="text-white p-3 w-full text-xs">
          *Please note that the Sentilog is still in development and may not be
          able to answer all questions.
        </div>
      </form>
      {loading && (
        <div className="text-white text-lg font-bold">Loading...</div>
      )}
      {response && <div className="text-white text-lg">{response}</div>}
    </div>
  )
}
export default Question
