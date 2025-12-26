
"use client"
import Link from "next/link"
import { Home, User, Phone, History, Wallet } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/wallet", icon: Wallet, label: "Wallet" },
  { href: "/vtu", icon: Phone, label: "VTU" },
  { href: "/history", icon: History, label: "History" },
  { href: "/profile", icon: User, label: "Profile" }
]

export default function Footer() {
  return (
    <footer className="md:h-full md:w-64 md:flex md:flex-col fixed bottom-0 w-full p-2 bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around">
        {navItems.map((item, i) => (
          <Link 
            key={i}
            href={item.href}
            className="flex flex-col items-center gap-1 p-2 text-xs text-gray-600 hover:text-[#00C800] transition-colors"
          >
            <item.icon className="w-5 h-5 text-purple-800" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  )
}