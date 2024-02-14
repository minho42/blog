import "../globals.css"
import Navbar from "./Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-start min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
