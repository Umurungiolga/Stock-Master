import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/AuthConfig"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockMaster | Next-Gen Stock Management",
  description: "Revolutionary stock management platform for modern businesses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
