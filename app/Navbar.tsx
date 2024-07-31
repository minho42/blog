"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center w-full flex-wrap sm:max-w-2xl px-4 h-16 gap-2 text-neutral-500">
      <Link
        href="/"
        className={` ${
          pathname === "/" || pathname.includes("/posts") ? "text-black font-semibold underline" : ""
        }`}
      >
        Posts
      </Link>
      |
      <Link
        href="/books"
        className={`${pathname.includes("/books") ? "text-black font-semibold underline" : ""}`}
      >
        Books
      </Link>
    </nav>
  )
}
