import { readdir, readFile } from "fs/promises"
import matter from "gray-matter"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function PostPage({ params }) {
  const filename = "./public/posts/" + params.slug + "/index.md"
  const file = await readFile(filename, "utf8")
  const { data, content } = matter(file)
  let postComponents = {}
  try {
    postComponents = await import("../../../public/posts/" + params.slug + "/components")
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") {
      throw e
    }
  }

  return (
    <article className="flex flex-col items-center justify-center space-y-2 mb-20">
      <section className="flex flex-col items-center justify-center max-w-sm sm:max-w-2xl space-y-3 px-2 sm:px-0 mb-6">
        <Link href="/" passHref>
          <button className="underline">← Back</button>
        </Link>
        <div className="text-neutral-500">{data.date}</div>
        <h1 className="text-3xl">{data.title}</h1>
      </section>

      <section className="max-w-sm sm:max-w-2xl prose prose-pre:p-0 px-2 sm:px-0">
        {content && (
          // https://github.com/hashicorp/next-mdx-remote
          <MDXRemote
            source={content}
            components={postComponents}
            options={{
              mdxOptions: {
                useDynamicImport: true,
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    // https://rehype-pretty-code.netlify.app/#options
                    rehypePrettyCode as any,
                    {
                      // https://shiki.style/themes#themes
                      theme: "github-light",
                      // https://rehype-pretty.pages.dev/#defaultlang
                      defaultLang: "shell",
                    },
                  ],
                ],
              },
            }}
          />
        )}
      </section>
    </article>
  )
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const entries = await readdir("./public/posts/", { withFileTypes: true })
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  return dirs.map((dir) => ({ slug: dir }))
}

export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://minho42.com/posts/${params.slug}/`,
    },
  }
}
