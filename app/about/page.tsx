export default function Page() {
  return (
    <main className="w-full sm:max-w-2xl mb-20">
      <div className="px-4 py-1">
        <h1 className="font-semibold text-3xl">About</h1>
        <div className="text-sm text-neutral-500">Min ho Kim</div>
      </div>

      <article className="space-y-1 px-4 py-2">
        <ul>
          <li>
            <p></p>
          </li>

          <ul className="flex text-sm text-neutral-500 gap-2 mt-6">
            <li className="underline">
              <a href="https://github.com/minho42" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            ·
            <li className="underline">
              <a href="https://bsky.app/profile/minho42.com" target="_blank" rel="noopener noreferrer">
                Bluesky
              </a>
            </li>
          </ul>
        </ul>
      </article>
    </main>
  )
}
