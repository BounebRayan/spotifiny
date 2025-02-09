import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotifiny | Spotify Premium à vie",
  description: "Spotify Premium à vie",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
