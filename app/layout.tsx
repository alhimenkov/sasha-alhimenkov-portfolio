import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sasha-portfolio-index.palissander.chatgpt.site"),
  title: "Саша Алхименков — креативный директор",
  description: "Портфолио Саши Алхименкова: бренды, кампании, творческие системы и способ работы.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Саша Алхименков — креативный директор",
    description: "Бренды, кампании, творческие системы и способ работы.",
    images: [{ url: "/og.png", width: 1536, height: 910, alt: "Саша Алхименков — креативный директор" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Саша Алхименков — креативный директор",
    description: "Бренды, кампании, творческие системы и способ работы.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
