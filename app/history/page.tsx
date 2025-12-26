"use client";

import { ArrowLeft, Clock, Search, Filter } from "lucide-react";
import Link from "next/link";

const transactions = [
    { id: 1, title: "Data Purchase", desc: "MTN 1GB SME", amount: "-₦260.00", date: "Today, 10:23 AM", status: "Success", color: "text-red-600" },
    { id: 2, title: "Wallet Funding", desc: "Paystack", amount: "+₦5,000.00", date: "Yesterday, 4:15 PM", status: "Success", color: "text-green-600" },
    { id: 3, title: "Airtime Purchase", desc: "Airtel ₦500", amount: "-₦500.00", date: "Yesterday, 2:30 PM", status: "Success", color: "text-red-600" },
    { id: 4, title: "Cable TV", desc: "GOTV Max", amount: "-₦4,850.00", date: "24 Dec, 09:45 AM", status: "Failed", color: "text-red-600" },
    { id: 5, title: "Electricity", desc: "IKEDC Token", amount: "-₦2,000.00", date: "23 Dec, 08:12 PM", status: "Success", color: "text-red-600" },
];

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900">Transactions</h1>
                    <div className="ml-auto flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-black transition-colors"><Search className="w-5 h-5" /></button>
                        <button className="p-2 text-gray-400 hover:text-black transition-colors"><Filter className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>

            <main className="max-w-2xl mx-auto p-4 space-y-4 animate-fade-in">
                {transactions.map((tx) => (
                    <div key={tx.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:border-gray-300 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{tx.title}</div>
                                <div className="text-xs text-gray-500 font-medium">{tx.desc} • {tx.date}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`font-bold ${tx.color}`}>{tx.amount}</div>
                            <div className={`text-[10px] uppercase tracking-wide font-bold mt-1 ${tx.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{tx.status}</div>
                        </div>
                    </div>
                ))}
                <div className="text-center text-xs text-gray-400 py-4">End of list</div>
            </main>
        </div>
    );
}
