import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "The Weird Wallace Archives",
  description:
    "LD3 State Senate candidate Robert Wallace wants to be the voice of normal, everyday Arizonans — but he's said some very interesting things.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "The Weird Wallace Archives",
    description:
      "LD3 State Senate candidate Robert Wallace wants to be the voice of normal, everyday Arizonans — but he's said some very interesting things.",
    images: [{ url: "/hero.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Weird Wallace Archives",
    description:
      "LD3 State Senate candidate Robert Wallace wants to be the voice of normal, everyday Arizonans — but he's said some very interesting things.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col scanlines">
        <div className="dmt-bg" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
