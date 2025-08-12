import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactReader } from "react-reader";

export default function ReadBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [epubUrl, setEpubUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEpubUrl(data.formats["application/epub+zip"] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading book...</p>;
  if (!epubUrl) return <p>EPUB not available for this book.</p>;

  return (
    <div style={{ height: "100vh" }}>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-red-500 text-white rounded"
      >
        ⬅ Back
      </button>
      <ReactReader url={epubUrl} location={null} locationChanged={() => {}} />
    </div>
  );
}
