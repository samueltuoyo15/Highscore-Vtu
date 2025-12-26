"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Phone, History, Wallet, LayoutGrid } from "lucide-react";

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
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50">
                <div className="flex justify-around items-center p-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${isActive ? "text-primary bg-primary/10" : "text-gray-500 hover:text-primary hover:bg-gray-50"
                                    }`}
                            >
                                <item.icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-50">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <LayoutGrid className="w-8 h-8 text-primary" />
                        FinTech
                    </h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/30"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gradient-to-br from-primary/5 to-emerald-500/5 p-4 rounded-xl border border-primary/10">
                        <h4 className="text-sm font-semibold text-primary mb-1">Need Help?</h4>
                        <p className="text-xs text-gray-500 mb-3">Contact our support team for assistance.</p>
                        <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
