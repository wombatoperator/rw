import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Weird Wallace Archives",
  description:
    "LD3 State Senate candidate Robert Wallace wants to be the voice of normal, everyday Arizonans — but he's said some very interesting things.",
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
      </body>
    </html>
  );
}
