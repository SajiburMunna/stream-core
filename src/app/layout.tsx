import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamCore",
  description: "Live TV server and streaming dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)]">
            <Sidebar />
            <div className="flex-1 md:pl-64">
              <Navbar />
              <main className="mx-auto max-w-7xl px-4 md:px-6 py-6">
                {children}
              </main>
              <footer className="mx-auto  max-w-7xl px-4 md:px-6 pb-8 pt-2 text-xs text-zinc-500">
                <div className="border-t border-zinc-800 pt-4 text-end">
                  © {new Date().getFullYear()} StreamCore. All rights reserved.
                </div>
              </footer>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
