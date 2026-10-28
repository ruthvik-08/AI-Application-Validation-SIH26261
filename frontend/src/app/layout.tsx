import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AICTE Validator — AI Document Compliance",
  description:
    "AI-powered application validation, document authentication, and regulatory compliance verification for AICTE institutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
