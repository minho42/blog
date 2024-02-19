"use client"

import { useState } from "react"

function Button({ children }) {
  return (
    <button className="relative flex flex-shrink-0 justify-center h-[60px] w-[190px] duration-100">
      <div
        id="btn-shadow"
        className="absolute border-2 flex h-full w-[98%] translate-y-0.5 rounded-xl bg-gray-300"
      ></div>
      <div
        id="btn-border"
        className="absolute flex h-full w-full -translate-y-[2px] items-center justify-center rounded-xl border-2 border-gray-800 bg-amber-500 shadow-md"
      ></div>
      <div
        id="main"
        className="absolute flex h-[90%] w-[98%] items-center justify-center rounded-xl border-b border-amber-300 bg-amber-400"
      >
        <div
          id="top-half-highlight"
          className="absolute top-[2px] h-[50%] w-[98%] rounded-lg bg-white opacity-30"
        ></div>
        <div id="text" className="absolute font-mono text-3xl font-bold text-gray-800">
          {children}
        </div>
        <div
          id="top-right-highlight"
          className="absolute right-1 top-0.5 h-3 w-2 -rotate-45 rounded-lg bg-white"
        ></div>
      </div>
    </button>
  )
}

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div onClick={() => setCount(count + 1)}>
      <Button>Count: {count}</Button>
    </div>
  )
}
