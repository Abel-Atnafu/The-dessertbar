import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Dessert Bar — Admin",
  description: "Admin panel for The Dessert Bar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
