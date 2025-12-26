"use client";

import { ArrowLeft, CreditCard, Landmark, Copy, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function WalletPage() {
    const [copied, setCopied] = useState(false);
    const accountNo = "9012345678";

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNo);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-purple-900 text-white p-6 pb-20 relative">
                <div className="flex items-center gap-4 max-w-2xl mx-auto mb-6">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">My Wallet</h1>
                </div>
            </div>

            <main className="max-w-2xl mx-auto px-4 -mt-16 space-y-6 animate-slide-up">

                {/* Balance Card */}
                <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-6 rounded-2xl shadow-xl">
                    <div className="text-purple-200 text-sm mb-1">Available Balance</div>
                    <div className="text-4xl font-bold mb-6">₦1,000,000.00</div>
                    <div className="flex gap-4">
                        <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all">
                            <Plus className="w-4 h-4" /> Fund Wallet
                        </button>
                        <button className="flex-1 bg-white text-purple-900 hover:bg-gray-100 py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all">
                            <CreditCard className="w-4 h-4" /> Withdraw
                        </button>
                    </div>
                </div>

                {/* Account Details for Funding */}
                <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Manual Funding</h3>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Landmark className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs text-gray-500">Wema Bank</div>
                            <div className="font-bold text-gray-800 text-lg flex items-center gap-2">
                                {accountNo}
                                <button onClick={handleCopy} className="text-purple-600 hover:bg-purple-50 p-1 rounded">
                                    {copied ? <span className="text-xs text-green-600 font-bold">Copied!</span> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="text-xs text-gray-400">High Score VTU (Monnify)</div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 text-center">Transfer to this account to fund your wallet automatically.</p>
                </section>

                {/* Payment Methods */}
                <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Add Funds via Card</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center">
                            <span className="font-bold text-blue-900 text-lg">Paystack</span>
                            <span className="text-xs text-gray-400">Debit Cards</span>
                        </button>
                        <button className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center">
                            <span className="font-bold text-green-600 text-lg">Monnify</span>
                            <span className="text-xs text-gray-400">Transfer / Card</span>
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
}
