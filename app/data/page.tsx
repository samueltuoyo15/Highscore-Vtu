"use client";

import { useState } from "react";
import { ArrowLeft, Check, Smartphone, CreditCard } from "lucide-react";
import Link from "next/link";


const providers = [
    { id: "mtn", name: "MTN", color: "bg-yellow-400", text: "text-yellow-900" },
    { id: "airtel", name: "Airtel", color: "bg-red-500", text: "text-white" },
    { id: "glo", name: "Glo", color: "bg-green-500", text: "text-white" },
    { id: "9mobile", name: "9mobile", color: "bg-lime-600", text: "text-white" },
];

const planTypes = ["SME", "Gifting", "Corporate"];

const plans = {
    mtn: [
        { id: 1, name: "500MB SME", price: 135, validity: "30 Days" },
        { id: 2, name: "1GB SME", price: 260, validity: "30 Days" },
        { id: 3, name: "2GB SME", price: 520, validity: "30 Days" },
        { id: 4, name: "3GB SME", price: 780, validity: "30 Days" },
        { id: 5, name: "5GB SME", price: 1300, validity: "30 Days" },
        { id: 6, name: "10GB SME", price: 2600, validity: "30 Days" },
    ],
    airtel: [
        { id: 1, name: "750MB", price: 150, validity: "14 Days" },
        { id: 2, name: "1.5GB", price: 300, validity: "30 Days" },
        { id: 3, name: "3GB", price: 600, validity: "30 Days" },
    ],
    glo: [
        { id: 1, name: "1GB", price: 250, validity: "30 Days" },
        { id: 2, name: "2.5GB", price: 500, validity: "30 Days" },
    ],
    "9mobile": [
        { id: 1, name: "1.5GB", price: 350, validity: "30 Days" },
    ],
};

interface Plan {
    id: number;
    name: string;
    price: number;
    validity: string;
}

export default function DataPage() {

    const [selectedProvider, setSelectedProvider] = useState(providers[0]);
    const [selectedPlanType, setSelectedPlanType] = useState("SME");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(false);

    // Filter plans based on provider (and plan type in a real app, simplified here)
    const currentPlans = plans[selectedProvider.id as keyof typeof plans] || [];

    const handlePurchase = () => {
        if (!phoneNumber || !selectedPlan) return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert(`Success! Purchased ${selectedPlan.name} for ${phoneNumber}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-purple-800 text-white p-4 pt-8 sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 hover:bg-purple-700/50 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Buy Mobile Data</h1>
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
                                onClick={() => {
                                    setSelectedProvider(p);
                                    setSelectedPlan(null);
                                }}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${selectedProvider.id === p.id
                                    ? "ring-2 ring-purple-600 ring-offset-2 scale-105 shadow-md"
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

                {/* Plan Type Selection */}
                <section>
                    <div className="flex bg-gray-200 p-1 rounded-lg">
                        {planTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedPlanType(type)}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${selectedPlanType === type
                                    ? "bg-white text-purple-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Phone Input */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Smartphone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            placeholder="080 1234 5678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm text-lg font-medium"
                        />
                    </div>
                </section>

                {/* Data Plans Grid */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Available Plans</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {currentPlans.map((plan) => (
                            <button
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan)}
                                className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${selectedPlan?.id === plan.id
                                    ? "border-purple-600 bg-purple-50/50 ring-1 ring-purple-600"
                                    : "border-gray-100 bg-white hover:border-purple-200 hover:shadow-sm"
                                    }`}
                            >
                                {selectedPlan?.id === plan.id && (
                                    <div className="absolute top-2 right-2 text-purple-600">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                                <div className="font-bold text-gray-900 text-lg mb-1">{plan.name}</div>
                                <div className="text-purple-700 font-semibold">₦{plan.price}</div>
                                <div className="text-xs text-gray-500 mt-2">{plan.validity}</div>
                            </button>
                        ))}
                    </div>
                </section>

            </main>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg md:relative md:bg-transparent md:border-t-0 md:shadow-none max-w-2xl mx-auto">
                <button
                    disabled={!selectedPlan || !phoneNumber || loading}
                    onClick={handlePurchase}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${!selectedPlan || !phoneNumber || loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/25 active:scale-[0.98]"
                        }`}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5" />
                            Pay ₦{selectedPlan?.price || "0.00"}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
