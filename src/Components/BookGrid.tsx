import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Masonry from "react-masonry-css"; // <-- import it
import type { Book, GutendexResponse } from "../types";

export default function BookGrid(  ) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMultiplePages = async (pages = 2) => {
    setLoading(true);
    setError(null);
    let allBooks: Book[] = [];
    let url = "https://gutendex.com/books/";

    try {
      for (let i = 0; i < pages; i++) {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch books");

        const data: GutendexResponse = await response.json();
        allBooks = [...allBooks, ...data.results];

        if (!data.next) break;
        url = data.next;
      }
      setBooks(allBooks);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultiplePages(2);
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className=" loader-dark dark:loader "></div>
      </div>
    );
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const breakpointColumnsObj = {
    default: 10,
    1100: 6,
    700: 4,
    500: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto gap-4 mx-4 xl:mx-0 lg:mx-0 "
      columnClassName="masonry-column"
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Masonry>
  );
}
