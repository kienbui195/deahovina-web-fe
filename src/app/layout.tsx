import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "DEAHO VINA",
  description: "대표 안광호, Giám đốc điều hành Ahn Kwang-ho ,",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <StoreProvider>
          <Header />
          <div>
            {children}
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
