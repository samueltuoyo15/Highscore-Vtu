"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Phone, History, Wallet, LayoutGrid, HelpCircle } from "lucide-react";

const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/wallet", icon: Wallet, label: "Wallet" },
    { href: "/vtu", icon: Phone, label: "VTU" },
    { href: "/history", icon: History, label: "History" },
    { href: "/profile", icon: User, label: "Profile" },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <>
            <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl z-50">
                <div className="flex justify-around items-center p-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${isActive ? "text-primary scale-110" : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 z-50">
                <div className="p-8">
                    <h1 className="text-xl font-bold tracking-tight flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                        FinTech
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-4">Menu</p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-gray-50 text-gray-900 border-l-4 border-primary"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/support" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <HelpCircle className="w-5 h-5" />
                        <span>Support</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
