import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head"; // Step 1: Import Head

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Sentilog",
  description: "The best AI Journal ever made!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
