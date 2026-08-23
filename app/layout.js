"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "@/context/Authcontext";
import Navbar from "@/mycomponent/nav";
import QueryProvider from "@/context/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata = {
  title: "YT video chat",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthContextProvider>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
