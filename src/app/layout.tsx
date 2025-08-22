import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./components/Providers";

// MonoLisa: load as local variable font for both normal and italic styles.
// Bind to the existing CSS variables to avoid wider code changes.
const monolisaSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
  src: [
    {
      path: "./fonts/monolisa/monolisa-webfont-2025.8.21/woff2/0-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/monolisa/monolisa-webfont-2025.8.21/woff2/1-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "Apple Color Emoji",
    "Segoe UI Emoji",
  ],
});

const monolisaMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  src: [
    {
      path: "./fonts/monolisa/monolisa-webfont-2025.8.21/woff2/0-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/monolisa/monolisa-webfont-2025.8.21/woff2/1-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monolisaSans.variable} ${monolisaMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
