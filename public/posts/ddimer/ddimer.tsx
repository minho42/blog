"use client"

import { useRef, useState } from "react"

export function DDimer() {
  const defaultCutoff = 0.5
  const [cutoff, setCutoff] = useState(defaultCutoff)
  const ageRef = useRef(null)

  const handleInputChange = () => {
    const newAge = ageRef.current.value
    if (!newAge || newAge <= 50) {
      setCutoff(defaultCutoff)
      return
    }

    setCutoff(newAge / 100)
  }

  return (
    <div className="flex flex-col gap-3 border bg-neutral-100 border-neutral-300 p-6 rounded-xl">
      <div className="flex items-center gap-3">
        <label htmlFor="age">Age</label>
        <input
          placeholder="Enter age"
          className="bg-white"
          autoFocus
          onChange={handleInputChange}
          ref={ageRef}
          id="age"
          type="number"
        />
      </div>
      <div>
        Normal: &lt;= <span className="bg-amber-200 rounded p-1 font-mono">{cutoff}</span> mg/L
      </div>
    </div>
  )
}
