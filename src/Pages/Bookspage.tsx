import React from "react";
import BookGrid from "../Components/BookGrid";

export default function Bookspage() {
  return (
    <div className="my-10 ">
      <div className="mb-5">
        <h1 className="font-pop font-bold text-xl xl:text-start lg:text-start md:text-center text-center xl:text-5xl lg:text-5xl dark:text-white mb-2 ">
          All Avaliable Books
        </h1>
        <p className="text-gray-500 xl:text-start lg:text-start md:text-center text-center">
         Don't Judge A Book By Its Cover!
        </p>
      </div>
      <BookGrid />
    </div>
  );
}
