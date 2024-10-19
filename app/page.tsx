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
    <div className="flex min-h-screen items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-1/2 h-96 flex-col items-center justify-between py-24 sm:items-center ">
        <h1 className='flex text-5xl opacity-90 text-indigo-600'>Shorten&nbsp;<span className='gradient-underline'>URL</span></h1>
        <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
          <input className='flex text-center text-indigo-700 rounded-full py-3 mb-4 w-3/4 placeholder-pink-400'
            type="text"
            placeholder="Insert an URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className='transition duration-300 justify-center flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold dark:focus:ring-blue-800 px-10 py-4 text-center me-2 mb-2 rounded-full' type="submit">Shorten</button>
        </form>
        {shortUrl && (
          <p>URL acortada: <a href={shortUrl} target='_blank' rel="noopener noreferrer">{shortUrl}</a></p>
        )}
      </main>
    </div>
  );
}