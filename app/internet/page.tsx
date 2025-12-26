"use client";

import { useState } from "react";
import { ArrowLeft, HardDrive, CreditCard } from "lucide-react";
import Link from "next/link";


const providers = [
    { id: "spectranet", name: "Spectranet", color: "bg-blue-600", text: "text-white" },
    { id: "smile", name: "Smile", color: "bg-pink-500", text: "text-white" },
    { id: "swift", name: "Swift", color: "bg-red-600", text: "text-white" },
];

const plans = {
    spectranet: [
        { id: 1, name: "Unified Value 4GB", price: 3000 },
        { id: 2, name: "Unified Value 7GB", price: 5000 },
        { id: 3, name: "Unified Value 15GB", price: 10000 },
    ],
    smile: [
        { id: 1, name: "5GB Bigga", price: 3500 },
        { id: 2, name: "10GB Bigga", price: 6500 },
    ],
    swift: [
        { id: 1, name: "Essential 3GB", price: 2500 },
        { id: 2, name: "Professional 10GB", price: 8000 },
    ],
};

interface Plan {
    id: number;
    name: string;
    price: number;
}

export default function InternetPage() {
    const [selectedProvider, setSelectedProvider] = useState(providers[0]);
    const [deviceId, setDeviceId] = useState("");
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(false);

    const currentPlans = plans[selectedProvider.id as keyof typeof plans] || [];

    const handlePurchase = () => {
        if (!deviceId || !selectedPlan) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Success! Subscribed to ${selectedProvider.name} ${selectedPlan.name}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-indigo-600 text-white p-4 pt-8 sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Internet Subscription</h1>
                </div>
            </div>

            <main className="max-w-2xl mx-auto p-4 space-y-6 animate-slide-up">

                {/* Provider Selection */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Select Provider</h2>
                    <div className="grid grid-cols-3 gap-3">
                        {providers.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => {
                                    setSelectedProvider(p);
                                    setSelectedPlan(null);
                                }}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${selectedProvider.id === p.id
                                    ? "ring-2 ring-indigo-500 ring-offset-2 scale-105 shadow-md"
                                    : "opacity-60 hover:opacity-100 hover:bg-gray-100"
                                    } bg-white border border-gray-100`}
                            >
                                <div className={`w-12 h-12 rounded-full ${p.color} ${p.text} flex items-center justify-center font-bold mb-2 shadow-sm`}>
                                    {p.name[0]}
                                </div>
                                <span className="text-sm font-medium">{p.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Device ID Input */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Device ID / Account No</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HardDrive className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter device ID"
                            value={deviceId}
                            onChange={(e) => setDeviceId(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm text-lg font-medium"
                        />
                    </div>
                </section>

                {/* Plan Selection */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Select Bundle</h2>
                    <div className="space-y-2">
                        {currentPlans.map((pkg) => (
                            <button
                                key={pkg.id}
                                onClick={() => setSelectedPlan(pkg)}
                                className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all duration-200 ${selectedPlan?.id === pkg.id
                                    ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                                    : "border-gray-100 bg-white hover:border-indigo-200"
                                    }`}
                            >
                                <span className="font-bold text-gray-800">{pkg.name}</span>
                                <span className="font-semibold text-indigo-600">₦{pkg.price.toLocaleString()}</span>
                            </button>
                        ))}
                    </div>
                </section>

            </main>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg md:relative md:bg-transparent md:border-t-0 md:shadow-none max-w-2xl mx-auto">
                <button
                    disabled={!selectedPlan || !deviceId || loading}
                    onClick={handlePurchase}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${!selectedPlan || !deviceId || loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-600/25 active:scale-[0.98]"
                        }`}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5" />
                            Pay ₦{selectedPlan?.price.toLocaleString() || "0.00"}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
