import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavLinks } from "./nav-links";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shorten URL App",
  description: "Create short URLs",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        {/* TODO fix the issue with the margin in the page */}
        <NavLinks />
        <div className="flex min-h-screen items-center justify-center font-[family-name:var(--font-geist-sans)]">
          <main className="flex w-4/5 md:w-9/12 lg:w-1/2 h-96 flex-col max-w-[600px] items-center justify-between py-24 sm:items-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
