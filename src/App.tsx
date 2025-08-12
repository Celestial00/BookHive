import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages & Layout

import MainLayout from "./Layouts/Mainlayout";
import Homepage from "./Pages/Homepage";
import BookDetailpage from "./Pages/BookDetailpage";
import Userpage from "./Pages/Userpage";
import Bookspage from "./Pages/Bookspage";
import Aboutpage from "./Pages/Aboutpage";
import FavoritePage from "./Pages/FavoritePage";

import NotFound from "./Pages/NotFound";
import ReadBookPage from "./Pages/ReadBookPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/books" element={<Bookspage />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/book/:id" element={<BookDetailpage />} />
            <Route path="/user" element={<Userpage />} />
            <Route path="/Favorites" element={<FavoritePage />} />
     
            <Route path="/read/:id" element={<ReadBookPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
