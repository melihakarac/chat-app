import "./globals.css";
import { Inter } from "next/font/google";
import RouteWrapper from "@/providers/RouteWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat App",
  description: "A simple chat app using Next.js and Material UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RouteWrapper>{children}</RouteWrapper>
      </body>
    </html>
  );
}
