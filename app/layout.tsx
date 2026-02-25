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
  title: "ACRC | Navigator of Nusantara's Policy Direction",
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
  icons: {
    icon: "/picture/Aksara Cakra.png",
    apple: "/picture/Aksara Cakra.png",
  },
  openGraph: {
    title: "ACRC | Navigator of Nusantara's Policy Direction",
    description:
      "Research and consulting firm shaping policy and business strategy in Indonesia",
    type: "website",
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
