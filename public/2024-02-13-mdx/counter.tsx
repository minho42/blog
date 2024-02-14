"use client"

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button className="bg-amber-200 rounded-xl p-3" onClick={() => setCount(count + 1)}>
      counter: {count}
    </button>
  )
}
