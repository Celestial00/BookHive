import React, { useEffect, useState } from "react";
import type { Book } from "../types";
import { Heart, HeartPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookCard({ book }: { book?: Book }) {
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  if (!book) return <p>No such book.</p>;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorited((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.contains("dark");
  }, [isDark]);

  return (
    <div
      tabIndex={0}
      className="break-inside-avoid rounded-lg relative group overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="relative w-full h-86">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="loader"></div>
          </div>
        )}

        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          style={{ opacity: loading ? 0 : isDark ? 0.65 : 1 }}
          className="w-full h-full object-cover rounded-lg transition-opacity duration-500"
          onLoad={() => setLoading(false)}
        />
      </div>

      <Link to={`/book/${book.id}`}>
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex flex-col items-center justify-center rounded-lg p-4 space-y-3">
          <button
            onClick={toggleFavorite}
            className="text-white text-2xl focus:outline-none"
            aria-label={
              favorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {favorited ? <HeartPlus className="text-red-500" /> : <Heart />}
          </button>

          <h3 className="text-white text-center text-sm md:text-base font-semibold px-2 overflow-auto scrollable max-h-20">
            {book.title}
            {book.authors.map((author, index) => (
              <p key={index} className="mt-1 text-xs font-normal">
                (Author: {author.name})
              </p>
            ))}
          </h3>
        </div>
      </Link>
    </div>
  );
}
