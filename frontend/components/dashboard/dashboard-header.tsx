"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Menu, ShieldAlert } from "lucide-react"
import { useAuth } from "@/context/AuthConfig"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user, logout, isAuthenticated, checkAuth } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Make sure we have the latest user data
    if (!user) {
      checkAuth()
    }
    
    // Set admin status
    if (user && user.role) {
      setIsAdmin(user.role.toLowerCase() === "admin")
    }
  }, [user, checkAuth])

  const getInitials = (name: string) => {
    if (!name) return "??"
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }
  
  console.log("Current authenticated user:", user)
  console.log("Is authenticated:", isAuthenticated)

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4 lg:px-6">
      <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex flex-1 items-center justify-end gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 px-2 py-1.5" role="button">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user ? getInitials(user.name || "") : "??"}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium">
                  {user?.name || "User"}
                  {isAdmin && (
                    <span className="ml-1 inline-flex items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                      <ShieldAlert className="mr-0.5 h-3 w-3" />
                      Admin
                    </span>
                  )}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email || ""}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive cursor-pointer" 
              onClick={logout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}