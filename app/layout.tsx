import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/contexts/locale-context";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://aksara-cakra.com"),
  title: {
    default: "ACRC | Navigator of Nusantara's Policy Direction",
    template: "%s | ACRC",
  },
  description:
    "Aksara Cakra Research and Consulting - Jakarta-based research and consulting firm supporting government, SOEs, and private sector leaders in shaping policy, business, and political strategies.",
  generator: "Next.js",
  keywords: [
    "research",
    "consulting",
    "policy",
    "Jakarta",
    "Indonesia",
    "governance",
    "politics",
    "business",
  ],
  authors: [{ name: "ACRC" }],
  creator: "ACRC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/picture/Aksara Cakra.png",
    apple: "/picture/Aksara Cakra.png",
  },
  openGraph: {
    title: "ACRC | Navigator of Nusantara's Policy Direction",
    description:
      "Research and consulting firm shaping policy and business strategy in Indonesia",
    url: "/",
    siteName: "Aksara Cakra Research and Consulting",
    images: [
      {
        url: "/picture/Aksara Cakra.png",
        width: 800,
        height: 600,
        alt: "ACRC Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACRC | Navigator of Nusantara's Policy Direction",
    description: "Research and consulting firm shaping policy and business strategy in Indonesia",
    images: ["/picture/Aksara Cakra.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#01172c" },
  ],
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <LocaleProvider>{children}</LocaleProvider>
          </AuthProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
