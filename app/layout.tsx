import type { Metadata } from "next";
import { ClerkProvider, SignedOut, SignInButton, SignedIn, UserButton, SignOutButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Goals-App",
  description: "Document your routines and goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <header className="bg-white/20 backdrop-blur-lg backdrop-saturate-200 border-white/30 rounded-2xl shadow-xl relative group flex justify-between text-white font-bold p-6 mb-6">
          <div>
            <h1 className="text-2xl text-center"><Link href="/">Goals-App</Link></h1>
          </div>
          <div className="space-x-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
              <SignOutButton />
            </SignedIn>
          </div>
        </header>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
