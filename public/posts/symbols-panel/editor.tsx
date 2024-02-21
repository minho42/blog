"use client"

import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { SymbolPanel } from "./symbolPanel"
import { useState, useCallback } from "react"

export function Editor() {
  const sampleCode = `// edit this
function add(a, b) {
  return a + b
}
console.log(add(1, 2))
function func1() {}
func1()
func1()
  `

  const [sourceCode, setSourceCode] = useState(sampleCode)

  const handleChange = useCallback((value, viewUpdate) => {
    setSourceCode(value)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row w-full gap-3">
      <CodeMirror
        className="rounded-md border border-neutral-300 text-sm p-2 sm:w-3/4"
        value={sampleCode}
        width="100%"
        extensions={[javascript({ jsx: true })]}
        onChange={handleChange}
      />
      <SymbolPanel sourceCode={sourceCode} />
    </div>
  )
}
