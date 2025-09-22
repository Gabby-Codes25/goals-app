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
        <header className="bg-[#b8b1b1] flex justify-between text-black font-bold px-8 py-4">
          <div>
            <h1><Link href="/">Goals-App</Link></h1>
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
