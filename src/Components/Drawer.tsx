import  { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";
import type { Book } from "../types";

export default function Drawer() {
  const [drawerList, setDrawerList] = useState([
    { Name: "Popular", isSelected: true },
    { Name: "Fictional", isSelected: false },
    { Name: "Biographies", isSelected: false },
    { Name: "Kid Books", isSelected: false },
    { Name: "Educational", isSelected: false },
  ]);

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedCategory = drawerList.find((item) => item.isSelected)?.Name;

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = "https://gutendex.com/books/?sort=downloads";

    if (selectedCategory === "Fictional") {
      url = "https://gutendex.com/books/?topic=fiction";
    } else if (selectedCategory === "Biographies") {
      url = "https://gutendex.com/books/?topic=biographies";
    } else if (selectedCategory === "Kid Books") {
      url = "https://gutendex.com/books/?topic=children";
    } else if (selectedCategory === "Educational") {
      url = "https://gutendex.com/books/?topic=education";
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedCategory]); // re-run on category change

  const handlSelected = (Name: string) => {
    setDrawerList((prev) =>
      prev.map((item) =>
        item.Name === Name
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
  };

  return (
    <div className="w-full">
      <div className="mx-3 my-5 flex flex-col items-center">
        <ul className="flex items-center flex-wrap justify-center gap-y-6 gap-x-10">
          {drawerList.map(({ Name, isSelected }, i) => (
            <li key={i} onClick={() => handlSelected(Name)}>
              <h1
                className={`font-pop cursor-pointer dark:text-white transition-all duration-100 ease-out ${
                  isSelected
                    ? "xl:text-2xl text-lg   border-b-2 border-black dark:border-white"
                    : "text-sm dark:border-gray-500  text-gray-500 border-b-0"
                }`}
              >
                {Name}
              </h1>
            </li>
          ))}
        </ul>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center mt-50">
          <div className="dark:loader loader-dark"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="flex  flex-row mt-10   justify-center flex-wrap  gap-4">
          {books.slice(0, 8).map((book, index) => (
            <Link key={index} to={`/book/${book.id}`}>
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
