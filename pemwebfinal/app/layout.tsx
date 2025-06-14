import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers"; // ⬅️ tambahkan ini
import "./globals.css";
import Image from "next/image";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

  export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "SIMANGGA",
    description: "SIMANGGA",
    icons: {
      icon: [
        { url: '/logofilkom.png', sizes: '32x32', type: 'image/png' },
        { url: '/logofilkom.png', sizes: '16x16', type: 'image/png' }
      ],
      shortcut: [
        { url: '/logofilkom.png', sizes: '196x196', type: 'image/png' }
      ],
      apple: [
        { url: '/logofilkom.png', sizes: '180x180', type: 'image/png' }
      ]
    }
  };
const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const pathname = headersData.get("x-next-url") || "";
  const isMinimal = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {isMinimal ? (
            
            children
          ) : (
            <>
              <header className="flex items-center justify-between px-6 py-4 bg-[#ffffff]">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Image
                      src="/logofilkom.png"
                      alt="FILKOM Logo"
                      width={120} // sesuaikan ukuran sesuai desain kamu
                      height={40}
                      priority
                    />
                  </div>
                </div>
                <nav className="flex items-center space-x-8">
                  <a href="/" className="text-[#121417] hover:text-[#61758a] transition-colors">
                    Dashboard
                  </a>
                  <a href="/gamecorner" className="text-[#121417] hover:text-[#61758a] transition-colors">
                    Game Corner
                  </a>
                  <a href="/pinjamsekre" className="text-[#121417] hover:text-[#61758a] transition-colors">
                    LO/LOF Secretariat
                  </a>
                </nav>
              </header>
              {children}
              <footer>
                <div>
                  <p className="text-center text-[#4e4e4e] text-sm py-4">
                    &copy; {new Date().getFullYear()} FILKOM UB. All rights reserved.
                    <br />
                    This website is designed and developed by Sabita, Sandhika, Salfredo
                  </p>
                </div>
              </footer>
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
