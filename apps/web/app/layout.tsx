import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { GlobalProviders } from "~/providers/global";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EdinForm — Considered forms for considered teams",
  description:
    "EdinForm is a calm, modern way to build forms, gather replies, and read the results — designed with the rigour of Edinburgh stonework and the clarity of Swiss design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
