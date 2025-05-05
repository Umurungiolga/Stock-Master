"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthConfig"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, isLoading, isAuthenticated, checkAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const authenticated = await checkAuth()
      if (!authenticated) {
        router.push("/auth/login")
      }
    }
    
    verifyAuth()
  }, [checkAuth, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not loading and not authenticated, the useEffect will handle the redirect
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole={user?.role || "user"}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          user={user ? {
            name: user.name,
            email: user.email,
            role: user.role
          } : null} 
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
