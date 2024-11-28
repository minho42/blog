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
            <blockquote
              className="bluesky-embed"
              data-bluesky-uri="at://did:plc:63uu3mbgijk7a6lq7n7b347x/app.bsky.feed.post/3lbv6w575u22i"
              data-bluesky-cid="bafyreiduyjxpmrl3djdoxsqbjbhsmpjf6eckxpdehhuow7xu2kajhmvhgi"
            >
              <p lang="en">
                decided to quit nursing after 12+ years of service. hoping to transition into tech as a junior
                developer. i guess it’s going to be pretty tough.
              </p>
              &mdash; Min ho Kim (
              <a href="https://bsky.app/profile/did:plc:63uu3mbgijk7a6lq7n7b347x?ref_src=embed">
                @minho42.com
              </a>
              ){" "}
              <a href="https://bsky.app/profile/did:plc:63uu3mbgijk7a6lq7n7b347x/post/3lbv6w575u22i?ref_src=embed">
                November 27, 2024 at 10:29 AM
              </a>
            </blockquote>
            <script async src="https://embed.bsky.app/static/embed.js" charSet="utf-8"></script>
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
