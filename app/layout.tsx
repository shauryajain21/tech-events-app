import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Events - Discover Events Powered by Linkup",
  description: "Search and discover tech events, meetups, conferences, workshops, and hackathons around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#f5f4f0]">
        {children}
      </body>
    </html>
  );
}
