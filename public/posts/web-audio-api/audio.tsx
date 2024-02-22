"use client"

import { useEffect, useState } from "react"

function AudioVisualization() {
  const FFTSIZE = 32
  const tailwindColors = [
    "bg-red-400",
    "bg-red-500",
    "bg-orange-400",
    "bg-orange-500",
    "bg-amber-400",
    "bg-amber-500",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-lime-400",
    "bg-lime-500",
    "bg-green-400",
    "bg-green-500",
    "bg-emerald-400",
    "bg-emerald-500",
    "bg-teal-400",
    "bg-teal-500",
    "bg-cyan-400",
    "bg-cyan-500",
    "bg-sky-400",
    "bg-sky-500",
    "bg-blue-400",
    "bg-blue-500",
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-violet-400",
    "bg-violet-500",
    "bg-purple-400",
    "bg-purple-500",
    "bg-fuchsia-400",
    "bg-fuchsia-500",
    "bg-pink-400",
    "bg-pink-500",
    "bg-rose-400",
    "bg-rose-500",
  ]
  const [heightArray, setHeightArray] = useState([])
  const [audioContext, setAudioContext] = useState(null)
  const [analyserNode, setAnalyserNode] = useState(null)

  if (typeof window === "undefined") return

  async function setupAudioContext() {
    const userMedia = await getUserMedia()
    if (audioContext.state === "suspended") {
      audioContext.resume()
    }
    const source = audioContext.createMediaStreamSource(userMedia)
    source.connect(analyserNode).connect(audioContext.destination)
  }

  function getUserMedia() {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
      },
    })
  }

  function draw() {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    requestAnimationFrame(draw)
    analyserNode.getByteFrequencyData(dataArray)

    const temp = []
    for (let i = 0; i < bufferLength; i++) {
      const h = (dataArray[i] / FFTSIZE) * 50
      temp.push(Math.floor(h))
    }
    setHeightArray([...temp])
  }

  useEffect(() => {
    if (!audioContext) {
      setAudioContext(new AudioContext())
    }
  }, [])

  useEffect(() => {
    if (!audioContext) return

    setAnalyserNode(new AnalyserNode(audioContext, { fftSize: FFTSIZE }))
  }, [audioContext])

  useEffect(() => {
    if (!analyserNode) return

    setupAudioContext()
    draw()
  }, [analyserNode])

  return (
    <div className="flex w-fit bg-zinc-800 items-center justify-center h-[50px] p-6 border border-zinc-600 rounded-full gap-[2px]">
      {heightArray.map((height, index) => (
        <div
          key={index}
          style={{ height: height }}
          className={`${tailwindColors[index % tailwindColors.length]} 
          rounded-sm w-2 min-h-[2px] max-h-[40px]`}
        ></div>
      ))}
    </div>
  )
}

export function Audio() {
  return (
    <div className="flex items-start justify-center">
      <AudioVisualization />
    </div>
  )
}
