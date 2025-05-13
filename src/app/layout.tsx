import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import classes from "./layout.module.css";
import AppLayout from "./pageLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Orki Money",
  description: "Onramper Aggregator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${classes.container} ${geistSans.variable} ${geistMono.variable}`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
