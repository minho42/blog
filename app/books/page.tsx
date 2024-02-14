import BookList from "./BookList"
import books from "./book.json"

export default async function Page() {
  const booksRead = books.filter((b) => b.finish?.trim()?.length > 0).reverse()

  return <BookList books={booksRead} />
}
