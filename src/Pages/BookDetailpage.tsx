import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Book } from "../types";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";
import type { rootState } from "../redux/Store";

interface User {
  uid: string;
  [key: string]: any;
}

export default function BookDetailpage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
      {/* ... rest of your unchanged JSX */}
    </div>
  );
}
