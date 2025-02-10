import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/contexts/SearchContext";
import LoginContextProvider from "@/contexts/LoginContext"


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
          <main className="flex-1">
            <LoginContextProvider>
          <SearchProvider>
            {children}
            </SearchProvider>
            </LoginContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
