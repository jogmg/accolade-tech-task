import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloClientProvider from "./ApolloClientProvider";

// Initialize the Geist Sans font with custom CSS variable and subset
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Initialize the Geist Mono font with custom CSS variable and subset
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the application, used by Next.js for SEO and page information
export const metadata: Metadata = {
  title: "Accolade Tech Task",
  description: "Assessment Task for Frontend Developer Internship role at Accolade Tech.",
};

// Root layout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply font variables and enable antialiasing for better text rendering */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap children components with ApolloClientProvider for GraphQL state management */}
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
