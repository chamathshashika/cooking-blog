import type { Metadata } from "next";
import { DM_Serif_Display, Montserrat } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scrumptious | Authentic Sri Lankan Cooking & Recipes",
  description:
    "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${montserrat.variable}`}>
      <body className="bg-white font-display text-ink antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
