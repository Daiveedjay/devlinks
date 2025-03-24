import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "./query-provider";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "devlinks",
  description:
    " A platform for developers to share their social media links and connect with other developers.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} font-sans text-gray-medium antialiased`}>
        <QueryProvider>
          {children}
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
