"use client";

import { useState } from "react";
import { ArrowLeft, Zap, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const providers = [
    { id: "ikedc", name: "Ikeja Electric", short: "IKEDC" },
    { id: "ekedc", name: "Eko Electric", short: "EKEDC" },
    { id: "aedc", name: "Abuja Electric", short: "AEDC" },
    { id: "ibedc", name: "Ibadan Electric", short: "IBEDC" },
    { id: "kedco", name: "Kano Electric", short: "KEDCO" },
    { id: "phed", name: "Port Harcourt", short: "PHED" },
];

const meterTypes = ["Prepaid", "Postpaid"];

export default function ElectricityPage() {
    const [selectedProvider, setSelectedProvider] = useState(providers[0]);
    const [meterType, setMeterType] = useState("Prepaid");
    const [meterNumber, setMeterNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verifiedName, setVerifiedName] = useState("");

    const handleVerify = () => {
        if (meterNumber.length < 10) return;
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setVerifiedName("Jane Doe"); // Mock
        }, 1500);
    }

    const handlePurchase = () => {
        if (!meterNumber || !amount) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Success! Token generated for ${meterNumber} (₦${amount})`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-amber-600 text-white p-4 pt-8 sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Electricity Bill</h1>
                </div>
            </div>

            <main className="max-w-2xl mx-auto p-4 space-y-6 animate-slide-up">

                {/* Provider Selection */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Select Disco</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {providers.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => {
                                    setSelectedProvider(p);
                                    setVerifiedName("");
                                }}
                                className={`flex items-center p-3 rounded-xl transition-all duration-300 text-left ${selectedProvider.id === p.id
                                        ? "ring-2 ring-amber-500 ring-offset-1 bg-amber-50 border-amber-500"
                                        : "bg-white border-gray-100 hover:bg-gray-50 hover:border-amber-200"
                                    } border`}
                            >
                                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold mr-3 shrink-0">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">{p.short}</div>
                                    <div className="text-xs text-gray-500 truncate">{p.name}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Meter Type */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Meter Type</h2>
                    <div className="flex bg-gray-200 p-1 rounded-lg">
                        {meterTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setMeterType(type)}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${meterType === type
                                        ? "bg-white text-amber-700 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Meter Input */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Meter Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Zap className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            placeholder="Enter meter number"
                            value={meterNumber}
                            onChange={(e) => {
                                setMeterNumber(e.target.value);
                                setVerifiedName("");
                            }}
                            onBlur={handleVerify}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all shadow-sm text-lg font-medium"
                        />
                        {verifying && (
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
                            </div>
                        )}
                        {verifiedName && (
                            <div className="absolute inset-y-0 right-3 flex items-center text-green-600 gap-1 animate-fade-in">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-bold">{verifiedName}</span>
                            </div>
                        )}
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
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all shadow-sm text-2xl font-bold text-gray-800"
                    />
                </section>

            </main>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg md:relative md:bg-transparent md:border-t-0 md:shadow-none max-w-2xl mx-auto">
                <button
                    disabled={!amount || !meterNumber || loading}
                    onClick={handlePurchase}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${!amount || !meterNumber || loading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-amber-500/25 active:scale-[0.98]"
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
