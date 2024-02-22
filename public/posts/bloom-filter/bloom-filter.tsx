"use client"
import { useState, useEffect, useRef } from "react"

function textToNumber(text) {
  let number = 0

  for (let i = 0; i < text.length; i++) {
    number += text.charCodeAt(i)
  }

  return number
}

function textToNumberArray(text, len, selectedAlgorithms) {
  const crypto = require("crypto")
  const bits = selectedAlgorithms.map((algo) => {
    const hashed = crypto.createHash(algo).update(text).digest("hex")
    return textToNumber(hashed) % len
  })
  return bits.sort()
}

function TotalBits({ len, totalBitsArray, recentSearchBitsArray }) {
  const bits = Array.from({ length: len })
  return (
    <div className="flex flex-col items-start py-2">
      <div className="font-bold">Total</div>
      <div className="flex flex-wrap border border-neutral-500 rounded p-1 gap-0.5">
        {bits.map((bit, index) => (
          <div
            key={index}
            className={`
            ${
              totalBitsArray.includes(index)
                ? "bg-blue-200 border border-blue-400"
                : "bg-neutral-100 border border-neutral-300"
            }
            ${recentSearchBitsArray.includes(index) ? "outline outline-2 outline-pink-400" : ""}
          flex items-center justify-center rounded-sm w-4 h-4 text-xs`}
          >
            {/* {index} */}
          </div>
        ))}
      </div>
    </div>
  )
}

function Bits({ text, len, addToTotal, selectedAlgorithms }) {
  const bitsArray = textToNumberArray(text, len, selectedAlgorithms)
  useEffect(() => {
    bitsArray.map((bit) => addToTotal(bit))
  }, [bitsArray])

  const bits = Array.from({ length: len })

  return (
    <div className="flex flex-col items-start py-2">
      <div className="">{text}</div>
      <div className="flex flex-wrap border border-neutral-500 rounded p-1 gap-0.5">
        {bits.map((bit, index) => (
          <div
            key={index}
            className={`
          ${
            bitsArray.includes(index)
              ? "bg-blue-200 border border-blue-400"
              : "bg-neutral-100 border border-neutral-300"
          }
          flex items-center justify-start rounded-sm w-4 h-4 text-xs`}
          >
            {/* {index} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export function BloomFilter() {
  const [bitSize, setBitSize] = useState(100)
  const [totalBitsArray, setTotalBitsArray] = useState([])
  const [searchResultText, setSearchResultText] = useState("")
  const [recentSearchBitsArray, setRecentSearchBitsArray] = useState([])
  const totalAlgorithms = ["md5", "sha1", "sha224", "sha256", "sha384", "sha512", "ripemd160"]
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(["md5", "sha256"])
  const [addedTexts, setAddedTexts] = useState([])
  const inputInsertRef = useRef<HTMLInputElement | null>(null)
  const inputSearchRef = useRef<HTMLInputElement | null>(null)
  const inputSizeRef = useRef<HTMLInputElement | null>(null)

  const addToTotal = (num) => {
    if (!totalBitsArray.includes(num) && typeof num === "number" && !Number.isNaN(num)) {
      setTotalBitsArray([...totalBitsArray, num])
    }
  }

  const handleInsert = (e) => {
    e.preventDefault()
    if (inputInsertRef.current.value?.trim() && !addedTexts.includes(inputInsertRef.current.value?.trim())) {
      setAddedTexts([...addedTexts, inputInsertRef.current.value.trim()])
    }
    inputInsertRef.current.value = ""
    setSearchResultText("")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const query = inputSearchRef.current.value.trim()
    if (!query) return
    const searchBitsArray = textToNumberArray(query, bitSize, selectedAlgorithms)
    setRecentSearchBitsArray(searchBitsArray)
    const found = searchBitsArray.every((element) => totalBitsArray.includes(element))
    const reallyFound = addedTexts.includes(query)

    setSearchResultText(
      `${found ? (reallyFound ? "Found (True positive)" : "Found (False positive)") : "Not found"}`
    )
  }

  const handleSizeChange = (newSize) => {
    if (newSize <= 10) newSize = 10
    if (newSize > 500) newSize = 500
    setTotalBitsArray([])
    setBitSize(newSize)
    inputSizeRef.current.value = newSize
  }

  const toggleAlgorith = (selectedAlgo) => {
    if (selectedAlgorithms.includes(selectedAlgo)) {
      setSelectedAlgorithms(selectedAlgorithms.filter((algo) => algo != selectedAlgo))
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, selectedAlgo])
    }
  }

  useEffect(() => {
    inputSizeRef.current.value = String(bitSize)
  }, [])

  useEffect(() => {
    setTotalBitsArray([])
    setRecentSearchBitsArray([])
  }, [selectedAlgorithms, bitSize])

  return (
    <div className="flex flex-col w-full space-y-3">
      <div>
        <form onSubmit={(e) => handleInsert(e)} className="space-x-2">
          <label>
            Insert text
            <input
              className="border border-neutral-300 h-8 ml-1 p-1 rounded-md w-1/3"
              ref={inputInsertRef}
              type="text"
              name="insert"
            />
          </label>
          <input
            className="bg-blue-600 text-white font-medium rounded-lg px-3 py-1 cursor-pointer"
            type="submit"
            value="Insert"
          />
        </form>
      </div>

      <div className="space-y-3">
        <form onSubmit={(e) => handleSearch(e)} className="space-x-2">
          <label>
            Search text
            <input
              onChange={() => {
                setSearchResultText("")
                setRecentSearchBitsArray([])
              }}
              className="border border-neutral-300 h-8 ml-1 p-1 rounded-md w-1/3"
              ref={inputSearchRef}
              type="text"
              name="insert"
            />
          </label>
          <input
            className="bg-pink-500 text-white font-medium rounded-lg px-3 py-1 cursor-pointer"
            type="submit"
            value="Search"
          />
        </form>
        <div className="text-2xl font-bold">
          Search result:{" "}
          {searchResultText && <span className="bg-amber-300 rounded-xl px-3 py-1">{searchResultText}</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="font-bold">Hash functions used ({selectedAlgorithms.length}) </div>

        <div className="flex flex-wrap items-center gap-2">
          {totalAlgorithms.map((algo) => (
            <div
              key={algo}
              onClick={() => toggleAlgorith(algo)}
              className={`${
                selectedAlgorithms.includes(algo) ? "bg-black text-white " : ""
              } border border-neutral-400 rounded-lg px-2 py-1 cursor-pointer font-medium`}
            >
              {algo}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-bold">Size</div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleSizeChange(bitSize - 10)}
            className="border border-neutral-400 rounded-lg px-4 py-2"
          >
            -
          </button>
          <input
            onChange={() => handleSizeChange(parseInt(inputSizeRef.current.value))}
            className="border border-neutral-400 rounded-lg w-14 text-center px-1 py-2"
            type="text"
            ref={inputSizeRef}
            name="size"
          />
          <button
            onClick={() => handleSizeChange(bitSize + 10)}
            className="border border-neutral-400 rounded-lg px-4 py-2"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <TotalBits
          len={bitSize}
          totalBitsArray={totalBitsArray}
          recentSearchBitsArray={recentSearchBitsArray}
        />
        <div className="py-2 font-bold">Inserted ({addedTexts.length})</div>
        {addedTexts.map((text) => (
          <Bits
            key={text}
            text={text}
            len={bitSize}
            addToTotal={addToTotal}
            selectedAlgorithms={selectedAlgorithms}
          />
        ))}
      </div>
    </div>
  )
}
