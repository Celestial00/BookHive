import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import type { rootState } from "../redux/Store";
import type { Book } from "../types";
import Masonry from "react-masonry-css";
import BookCard from "../Components/BookCard";

export default function FavoritePage() {
  const state = useSelector((state: rootState) => state.userReducer.userObj);

  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {


      const db = getFirestore();
      const userRef = doc(db, "user", state.uid);

      try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          setError("No favorites found.");
          setLoading(false);
          return;
        }

        const userData = userSnap.data();
        const favorites: string[] = userData?.favorites || [];

        if (favorites.length === 0) {
          setError("Your favorites list is empty.");
          setLoading(false);
          return;
        }

        // Fetch each favorite book from Gutendex
        const fetchedBooks: Book[] = await Promise.all(
          favorites.map(async (bookId) => {
            const res = await fetch(`https://gutendex.com/books/${bookId}`);
            if (!res.ok) throw new Error(`Failed to fetch book ${bookId}`);
            return res.json();
          })
        );

        setFavoriteBooks(fetchedBooks);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [state?.uid]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="dark:loader loader-dark"></div>
      </div>
    );

  if (error) return <p className="text-center text-gray-500">{error}</p>;

  const breakpointColumnsObj = {
    default: 10,
    1100: 6,
    700: 4,
    500: 2,
  };

  return (
    <div>
      <div className="mb-5  text-center md:text-left">
        <h1 className="font-pop font-bold  text-xl xl:text-5xl dark:text-white mb-2">
          Your Favorite Books
        </h1>
        <p className="text-gray-500">
          Don't Judge A Book By Its Cover!
        </p>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto gap-4 mx-4 xl:mx-0 lg:mx-0"
        columnClassName="masonry-column"
      >
        {favoriteBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Masonry>
    </div>
  );
}
