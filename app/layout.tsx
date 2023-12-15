import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'animate.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WoodenFish",
  description: "敲电子木鱼，求赛博真经",
  icons: {
    icon: "/muyu.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
