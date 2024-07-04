import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import NotFound from "./NotFound";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "DEAHO VINA",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreProvider>
          <Header />
          <div>
            <Suspense fallback={<NotFound />}>{children}</Suspense>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
