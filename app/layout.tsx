import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Great_Vibes } from "next/font/google"; // Elegant serif for headings + clean sans for body
import "../styles/globals.css";
import MobileFrame from "@/components/layout/MobileFrame";
import AudioProvider from "@/components/providers/AudioProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding of Desty & Rizqull", // Personalized title
  description: "Official Digital Invitation",
};

import { Suspense } from "react";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${vibes.variable} antialiased bg-slate-950 text-slate-900`}
      >
        <MobileFrame>
          <AudioProvider>
            <Suspense>
              {children}
            </Suspense>
          </AudioProvider>
        </MobileFrame>
      </body>
    </html>
  );
}
