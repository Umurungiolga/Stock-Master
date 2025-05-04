"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { BarChart3, Box, Home, LogOut, Package, Settings, ShieldAlert, ShoppingCart, Users } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole: string
}

export function DashboardSidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const isAdmin = userRole === "admin"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Products",
      icon: Package,
      href: "/dashboard/products",
      active: pathname.includes("/dashboard/products"),
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      active: pathname.includes("/dashboard/orders"),
    },
    {
      label: "Inventory",
      icon: Box,
      href: "/dashboard/inventory",
      active: pathname.includes("/dashboard/inventory"),
    },
    {
      label: "Customers",
      icon: Users,
      href: "/dashboard/users",
      active: pathname.includes("/dashboard/users"),
      adminOnly: true,
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname.includes("/dashboard/analytics"),
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname.includes("/dashboard/settings"),
    },
  ]

  const filteredRoutes = routes.filter((route) => !route.adminOnly || isAdmin)

  const onNavigate = (href: string) => {
    onClose()
  }

  return (
    <>
      <aside className="hidden h-full w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <span>StockMaster</span>
            {isAdmin && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                ADMIN
              </span>
            )}
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="flex flex-col gap-1">
            {filteredRoutes.map((route) => (
              <Link key={route.href} href={route.href} onClick={() => onNavigate(route.href)}>
                <Button
                  variant={route.active ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", route.active ? "bg-secondary font-medium" : "font-normal")}
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Button>
              </Link>
            ))}
            {isAdmin && (
              <div className="mt-6 rounded-md bg-primary/10 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <ShieldAlert className="h-4 w-4" />
                  Admin Access
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  You have administrator privileges with full system access.
                </p>
              </div>
            )}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/auth/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span>StockMaster</span>
              {isAdmin && (
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                  ADMIN
                </span>
              )}
            </Link>
          </div>
          <ScrollArea className="flex-1 px-2 py-4">
            <nav className="flex flex-col gap-1">
              {filteredRoutes.map((route) => (
                <Link key={route.href} href={route.href} onClick={() => onNavigate(route.href)}>
                  <Button
                    variant={route.active ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", route.active ? "bg-secondary font-medium" : "font-normal")}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Button>
                </Link>
              ))}
              {isAdmin && (
                <div className="mt-6 rounded-md bg-primary/10 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <ShieldAlert className="h-4 w-4" />
                    Admin Access
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    You have administrator privileges with full system access.
                  </p>
                </div>
              )}
            </nav>
          </ScrollArea>
          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/auth/login">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
