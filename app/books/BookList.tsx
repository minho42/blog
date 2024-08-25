import Link from "next/link"

type Book = {
  start: string
  finish: string
  title: string
  author: string
  liked: boolean
  url: string
}

function BookItem({ book }: { book: Book }) {
  return (
    <section className="flex flex-col justify-start px-4 py-2 gap-2 rounded-xl bg-neutral-100">
      <div>
        <div className="flex gap-2">
          {book.url ? (
            <Link className="font-medium underline underline-offset-1" href={book.url}>
              {book.title}
            </Link>
          ) : (
            <h1>{book.title}</h1>
          )}
        </div>
        <div className="text-sm text-neutral-500">
          <p>by {book.author}</p>
          <p>{book.finish}</p>
        </div>
      </div>
    </section>
  )
}

export default function BookList({ books }: { books: Book[] }) {
  return (
    <main className="w-full sm:max-w-2xl mb-20">
      <div className="px-4 py-1">
        <h1 className="font-semibold text-3xl">Books</h1>
        <div className="text-sm text-neutral-500">{books.length} books</div>
      </div>

      <article className="grid grid-cols-2 md:grid-cols-3 gap-3 px-2 py-2">
        {books.map((book) => (
          <BookItem key={book.title} book={book} />
        ))}
      </article>
    </main>
  )
}
