'use client';

import { FormEvent, useState } from 'react';
import axios from 'axios';

export default function Home () {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shorten", { longUrl: url });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error acortando la URL", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Acortar URL</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresa la URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Acortar</button>
        </form>
        {shortUrl && (
          <p>URL acortada: <a href={shortUrl} target='_blank' rel="noopener noreferrer">{shortUrl}</a></p>
        )}
      </main>
    </div>
  );
}