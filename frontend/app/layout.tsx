import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import { SearchProvider } from "@/contexts/SearchContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hubstaff Clone",
  description: "A Hubstaff clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <SearchProvider>
            {children}
            </SearchProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
