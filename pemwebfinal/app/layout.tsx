import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
      <header className="flex items-center justify-between px-6 py-4 bg-[#ffffff]">
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            <span className="text-orange-500">FIL</span>
            <span className="text-blue-500">KOM</span>
          </div>
        </div>
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-[#121417] hover:text-[#61758a] transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-[#121417] hover:text-[#61758a] transition-colors">
            Game Corner
          </a>
          <a href="#" className="text-[#121417] hover:text-[#61758a] transition-colors">
            LO/LOF Secretariat
          </a>
        </nav>
      </header>
    
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <footer>
      <div>
      <p className="text-center text-[#4e4e4e] text-sm py-4">
        &copy; {new Date().getFullYear()} FILKOM UB. All rights reserved. 
        <br />
        This website is designed for the Game Corner booking system at FILKOM UB.
      </p>
      </div>
    </footer>
      </body>
      
    </html>
  );
}
