import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/navigation";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "High Score Vtu",
  description:
    "An high-performance VTU (Virtual Top-Up) web application built with Next Js, Golang backend, and Paystack API integration. This platform enables users to buy airtime/data, pay bills e.t.c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans select-none bg-background text-foreground`}
      >
        <AuthProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 pb-20 md:pb-0 md:pl-64 w-full">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
