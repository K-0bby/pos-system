import type { Metadata } from "next";
import "./globals.css";
import {inter, roboto} from '@/components/ui/fonts'

export const metadata: Metadata = {
  title: {
    template: '%s | POS',
    default: 'POS',
  },
  description: "A Point of Sale system used to manage sales and inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
