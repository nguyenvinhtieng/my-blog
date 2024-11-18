import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Blog - Latest Trends, Tips, and Insights in Technology",
  description:
    "Explore the latest trends, expert tips, and in-depth insights into technology, programming, software development, AI, gadgets, and more. Stay informed and inspired with our tech-focused articles.",
  keywords: [
    "tech blog",
    "technology news",
    "programming tutorials",
    "software development",
    "gadgets reviews",
    "latest tech",
    "Server, Linux",
    "Dockers",
    "Kubernetes",
    "Cloud",
    "Frontend",
    "Backend",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
