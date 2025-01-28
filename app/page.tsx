'use client';

import { FormEvent, useState } from 'react';
import axios from 'axios';
import ScissorsIcon from './components/icons/ScissorsIcon';


export default function Home () {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [responseError, setResponseError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/shorten", { longUrl: url });
      setShortUrl(response.data.shortUrl);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error;
        console.error("Error acortando la URL", errorMessage);
        setResponseError(errorMessage);
      } else {
        console.error("Unknown error", error);
        setResponseError("An unknown error occurred");
      }
    }
  };

  return (
    <div className='flex flex-col gap-y-10 w-11/12 sm:w-[760px] items-center justify-center m-auto h-screen'>
      <h1 className='flex mb-5 h1-title'>Shorten&nbsp;
        <span className='gradient-underline'>URL</span>
      </h1>
      <form className='w-full flex flex-col gap-y-10 items-center justify-center'
        onSubmit={handleSubmit}>
        <input className='flex text-center 
        bg-gray-800 text-white placeholder-gray-400 border 
        border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/70 
        rounded-md p-3 w-full'
          type="text"
          placeholder="Insert an URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className='transition duration-300 justify-center flex 
          gradient-button'
          type="submit"><ScissorsIcon className='size-4 flex flex-col align-middle mr-1 top-1 relative' />Shorten</button>
      </form>
      {shortUrl && (
        <p className='font-semibold flex 
          md:flex-row flex-col md:items-start items-center justify-center'>URL acortada:&nbsp;
          <a className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
            href={shortUrl} target='_blank'
            rel="noopener noreferrer">{shortUrl}</a></p>
      )}
      {responseError && (
        <p className='text-red-700 font-semibold opacity-90'>{responseError}</p>
      )}
    </div>
  );
}