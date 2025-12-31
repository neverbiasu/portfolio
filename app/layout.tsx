import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "fumadocs-ui/style.css";
import { HeroUIProvider } from "@heroui/react";

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neverbiasu.dev"),
  title: "neverbiasu · Frontend & AI Engineer",
  description:
    "Portfolio of neverbiasu, a frontend engineer and AI app developer focused on Next.js, TypeScript, and ComfyUI workflows.",
  openGraph: {
    type: "website",
    title: "neverbiasu · Frontend & AI Engineer",
    description:
      "Discover projects and AI work by neverbiasu, a frontend engineer building AI-first experiences.",
    url: "https://neverbiasu.dev",
    siteName: "neverbiasu",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/90372299?v=4",
        width: 512,
        height: 512,
        alt: "Avatar of neverbiasu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "neverbiasu · Frontend & AI Engineer",
    description:
      "Personal portfolio highlighting frontend, AI engineering, and ComfyUI contributions.",
    images: ["https://avatars.githubusercontent.com/u/90372299?v=4"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-mocha-base text-mocha-text`}
      >
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}