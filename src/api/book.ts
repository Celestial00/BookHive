// api/book.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing EPUB URL" });
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/epub+zip");
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch EPUB file" });
  }
}
