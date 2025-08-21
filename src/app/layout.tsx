// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import { Providers } from "./components/providers";
=======
import { NextAuthProvider } from "./components/Providers"; // <-- Import provider
>>>>>>> main

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amie Clone - Modern Calendar & Productivity",
  description: "A beautiful, modern calendar and productivity app inspired by Amie's design",
  keywords: ["calendar", "productivity", "scheduling", "tasks", "events"],
  authors: [{ name: "Austin Couch" }],
  creator: "Austin Couch",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
=======
      <body className={inter.className}>
        <NextAuthProvider> {/* <-- Wrap children */}
          {children}
        </NextAuthProvider>
>>>>>>> main
      </body>
    </html>
  );
}
