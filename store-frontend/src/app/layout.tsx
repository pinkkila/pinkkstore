import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import Container from "@/components/container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthContextProvider from "@/contexts/auth-context-provider";
import CartContextProvider from "@/contexts/cart-context-provider";
import CartProductsContextProvider from "@/contexts/cart-products-context-provider";
import QueryProvider from "@/contexts/query-provider";
import PageContainer from "@/components/page-container";
import NavBar from "@/components/nav-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinkk Store",
  description: "Welcome to Pinkk Store!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark ${openSans.className}`}
      >
        <QueryProvider>
          <AuthContextProvider>
            <CartContextProvider>
              <CartProductsContextProvider>
                <Container>
                  <Header />
                  <NavBar />
                  <PageContainer>{children}</PageContainer>
                  <Footer />
                </Container>
              </CartProductsContextProvider>
            </CartContextProvider>
          </AuthContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
