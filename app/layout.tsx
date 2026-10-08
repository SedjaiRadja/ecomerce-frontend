import type { Metadata } from "next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

const inter = localFont({
  src: "./fonts/Inter-Variable.ttf",
  variable: "--font-inter-allure",
});

const playfair = localFont({
  src: "./fonts/PlayfairDisplay-Variable.ttf",
  variable: "--font-playfair-allure",
});

export const metadata: Metadata = {
  title: "Allure",
  description: "Allure — Une élégance intemporelle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${playfair.variable}`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}