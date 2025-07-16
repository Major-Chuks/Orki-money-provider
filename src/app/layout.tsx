import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import classes from "./layout.module.css";
import AppLayout from "./pageLayout";
import { ToastProvider } from "@/context/Toast/ToastContext";
import { headers } from "next/headers";
import ContextProvider from "../../context";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body
        className={`${classes.container} ${geistSans.variable} ${geistMono.variable}`}
      >
        <ToastProvider>
          <ContextProvider cookies={cookies}>
            <AppLayout>{children}</AppLayout>
          </ContextProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
