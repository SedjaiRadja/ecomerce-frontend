import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

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
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
