import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "./query-provider";
import UnauthorizedModal from "@/components/resusables/unauthorized-modal";
import { ThemeProvider } from "@/providers/theme-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <QueryProvider>
            <main className=" max-w-[1600px] mx-auto"> {children}</main>
            <Toaster position="top-right" />
            <UnauthorizedModal />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
