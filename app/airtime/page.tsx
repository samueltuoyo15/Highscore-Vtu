"use client";

import { useState } from "react";
import { ArrowLeft, Phone, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const providers = [
    { id: "mtn", name: "MTN", color: "bg-yellow-400", text: "text-yellow-900" },
    { id: "airtel", name: "Airtel", color: "bg-red-500", text: "text-white" },
    { id: "glo", name: "Glo", color: "bg-green-500", text: "text-white" },
    { id: "9mobile", name: "9mobile", color: "bg-lime-600", text: "text-white" },
];

const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

export default function AirtimePage() {
    const router = useRouter();
    const [selectedProvider, setSelectedProvider] = useState(providers[0]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePurchase = () => {
        if (!phoneNumber || !amount) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Success! Purchased ₦${amount} Airtime for ${phoneNumber}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 pt-8 sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Buy Airtime</h1>
                </div>
            </div>

            <main className="max-w-2xl mx-auto p-4 space-y-6 animate-slide-up">

                {/* Network Selection */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Select Network</h2>
                    <div className="grid grid-cols-4 gap-3">
                        {providers.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedProvider(p)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${selectedProvider.id === p.id
                                        ? "ring-2 ring-blue-500 ring-offset-2 scale-105 shadow-md"
                                        : "opacity-60 hover:opacity-100 hover:bg-gray-100"
                                    } bg-white border border-gray-100`}
                            >
                                <div className={`w-10 h-10 rounded-full ${p.color} ${p.text} flex items-center justify-center font-bold mb-1 shadow-sm`}>
                                    {p.name[0]}
                                </div>
                                <span className="text-xs font-medium">{p.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Phone Input */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            placeholder="080 1234 5678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm text-lg font-medium"
                        />
                    </div>
                </section>

                {/* Amount Input */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Amount (₦)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm text-2xl font-bold text-gray-800"
                    />
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
                        {quickAmounts.map((amt) => (
                            <button
                                key={amt}
                                onClick={() => setAmount(amt.toString())}
                                className="py-1 px-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                            >
                                ₦{amt}
                            </button>
                        ))}
                    </div>
                </section>

            </main>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg md:relative md:bg-transparent md:border-t-0 md:shadow-none max-w-2xl mx-auto">
                <button
                    disabled={!amount || !phoneNumber || loading}
                    onClick={handlePurchase}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${!amount || !phoneNumber || loading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25 active:scale-[0.98]"
                        }`}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5" />
                            Pay ₦{amount || "0.00"}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
