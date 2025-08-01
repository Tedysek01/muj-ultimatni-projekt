import React, { useState } from 'react'

interface Props {
  title?: string
  className?: string
}

export default function MyComponent({ title = 'Default Title', className }: Props) {
  const [count, setCount] = useState(0)

  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <h2 className="text-xl font-bold font-display mb-4">{title}</h2>
      <div className="space-y-2">
        <p>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
    </div>
  )
}