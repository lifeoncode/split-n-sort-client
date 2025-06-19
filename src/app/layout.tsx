import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const RobotoFont = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Split 'n Sort",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${RobotoFont.className} antialiased bg-[#fafafa] dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#fafafa]`}
      >
        {children}
      </body>
    </html>
  );
}
