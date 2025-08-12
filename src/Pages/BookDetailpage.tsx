import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Book } from "../types";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import type { rootState } from "../redux/Store";

// Define your user object shape
interface User {
  uid: string;
  [key: string]: any;
}

export default function BookDetailpage() {
  const { id } = useParams(); // get :id from URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Strongly type the selector to either User or null
  const state = useSelector(
    (state: rootState) => state.userReducer.userObj as User | null
  );

  const getDownloadUrl = (formats: Record<string, string>) => {
    return (
      formats["application/pdf"] ||
      formats["application/epub+zip"] ||
      formats["text/plain; charset=utf-8"] ||
      null
    );
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="dark:loader loader-dark"></div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book found</p>;

  const downloadUrl = getDownloadUrl(book.formats);
  const epubUrl = book.formats["application/epub+zip"];

  const addToFav = async () => {
    if (!state?.uid) {
      alert("Please log in first!");
      return;
    }

    const db = getFirestore();
    const docRef = doc(db, "user", state.uid);

    try {
      await updateDoc(docRef, {
        favorites: arrayUnion(id),
      });
      alert("Book added to favorites!");
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Book cover and actions */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img
            src={book.formats["image/jpeg"]}
            alt={book.title}
            className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />

          <div className="mt-4 flex flex-col space-y-3">
            {/* Download button */}
            <a
              href={downloadUrl || "#"}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                downloadUrl
                  ? "bg-blue-50 dark:bg-gray-900 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-600"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span className="font-open">Download</span>
            </a>

            {/* Add to favorites button */}
            <button
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-pink-50 dark:bg-gray-900 text-pink-600 dark:text-pink-400 rounded-lg hover:bg-pink-100 dark:hover:bg-gray-600 transition-colors"
              onClick={addToFav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="font-open">Add to Favorites</span>
            </button>

            {/* Read now button */}
            <button
              onClick={() => navigate(`/read/${id}`)}
              disabled={!epubUrl}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                epubUrl
                  ? "bg-green-50 dark:bg-gray-900 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-600"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              Read Now
            </button>
          </div>
        </div>

        {/* Book details */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-pop font-bold mb-2 text-gray-800 dark:text-white">
            {book.title}
          </h1>

          {book.authors && (
            <p className="text-lg text-gray-600 font-pop dark:text-gray-300 mb-6">
              by {book.authors.map((author) => author.name).join(", ")}
            </p>
          )}

          <div className="flex flex-wrap font-open gap-4 mb-6 text-sm">
            {book.languages && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
                {book.languages.join(", ")}
              </span>
            )}
            {book.bookshelves && book.bookshelves.length > 0 && (
              <span className="px-3 py-1 font-open bg-gray-100 dark:bg-gray-900 rounded-lg">
                {book.bookshelves.join(", ")}
              </span>
            )}
            {book.download_count && (
              <span className="px-3 py-1 font-open bg-gray-100 dark:bg-gray-900 rounded-lg">
                {book.download_count.toLocaleString()} downloads
              </span>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 font-open dark:text-gray-300 leading-relaxed">
              {book.summaries}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-open font-semibold mb-3">
              Available Formats
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(book.formats).map(([format, url]) => (
                <a
                  key={format}
                  href={url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-open bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm transition-colors"
                >
                  {format.includes(";")
                    ? format.split(";")[0].split("/")[1].toUpperCase()
                    : format.split("/")[1]?.toUpperCase() || "FILE"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
