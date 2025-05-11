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

// export const metadata: Metadata = {
//   title: "devlinks",
//   description:
//     " A platform for developers to share their social media links and connect with other developers.",
//   icons: "/favicon.ico",
// };

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

export const metadata: Metadata = {
  title: "devlinks",
  description:
    "A platform for developers to share their social media links and connect with other developers.",
  icons: "/favicon.ico",
  metadataBase: new URL("https://devlinks.info"),
  openGraph: {
    title: "devlinks",
    description:
      "A platform for developers to share their social media links and connect with other developers.",
    url: "https://devlinks.info",
    siteName: "devlinks",
    images: [
      {
        url: "/og-image.webp", // You must place this image in your public/ directory
        width: 1200,
        height: 630,
        alt: "devlinks – Connect with other developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "devlinks",
    description:
      "A platform for developers to share their social media links and connect with other developers.",
    images: ["/og-image.webp"], // Same image or different one for Twitter
    creator: "@JajaDavid8", // Optional: if you have a Twitter handle
  },
};
