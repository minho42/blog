import { readdir, readFile } from "fs/promises"
import matter from "gray-matter"
import Link from "next/link"

export type Post = {
  slug: string
  title?: string
  date?: string
}

async function getPosts(): Promise<Post[]> {
  const entries = await readdir("./public/posts/", { withFileTypes: true })
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile("./public/posts/" + dir + "/index.md", "utf8"))
  )
  const posts: Post[] = dirs.map((slug, i) => {
    const fileContent = fileContents[i]
    const { data } = matter(fileContent)
    return { slug, ...data }
  })

  return posts.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date)
  })
}

function Post({ post }: { post: Post }) {
  return (
    <section className="px-4 py-2">
      <h1 className="">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="text-sm text-neutral-500">{post.date}</div>
    </section>
  )
}

export default async function Home() {
  const posts = await getPosts()
  return (
    <main className="w-full sm:max-w-2xl mb-20">
      <div className="px-4 py-1">
        <h1 className="font-semibold text-3xl">Posts</h1>
        <div className="text-sm text-neutral-500">{posts.length} posts</div>
      </div>

      <article className="space-y-1">
        {posts.map((post) => (
          <Post key={post.title} post={post} />
        ))}
      </article>
    </main>
  )
}
