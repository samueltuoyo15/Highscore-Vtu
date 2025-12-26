"use client";

import { useState } from "react";
import { ArrowLeft, Tv, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const providers = [
    { id: "dstv", name: "DSTV", color: "bg-blue-500", text: "text-white" },
    { id: "gotv", name: "GOTV", color: "bg-green-500", text: "text-white" },
    { id: "startimes", name: "Startimes", color: "bg-orange-500", text: "text-white" },
];

const packages = {
    dstv: [
        { id: 1, name: "Padi", price: 2500 },
        { id: 2, name: "Yanga", price: 3500 },
        { id: 3, name: "Confam", price: 6200 },
        { id: 4, name: "Compact", price: 10500 },
        { id: 5, name: "Compact Plus", price: 16600 },
        { id: 6, name: "Premium", price: 29500 },
    ],
    gotv: [
        { id: 1, name: "Smallie", price: 1100 },
        { id: 2, name: "Jinja", price: 2250 },
        { id: 3, name: "Jolli", price: 3300 },
        { id: 4, name: "Max", price: 4850 },
        { id: 5, name: "Supa", price: 6400 },
    ],
    startimes: [
        { id: 1, name: "Nova", price: 1200 },
        { id: 2, name: "Basic", price: 2100 },
        { id: 3, name: "Smart", price: 2800 },
        { id: 3, name: "Classic", price: 3100 },
        { id: 4, name: "Super", price: 5300 },
    ],
};

export default function CablePage() {
    const [selectedProvider, setSelectedProvider] = useState(providers[0]);
    const [smartcardNumber, setSmartcardNumber] = useState("");
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verifiedName, setVerifiedName] = useState("");

    const currentPackages = packages[selectedProvider.id as keyof typeof packages] || [];

    const handleVerify = () => {
        if (smartcardNumber.length < 10) return;
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setVerifiedName("John Doe"); // Mock
        }, 1500);
    }

    const handlePurchase = () => {
        if (!smartcardNumber || !selectedPackage) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Success! Subscribed to ${selectedProvider.name} ${selectedPackage.name} for ${smartcardNumber}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-purple-900 text-white p-4 pt-8 sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Cable TV</h1>
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
                                    setSelectedPackage(null);
                                    setVerifiedName("");
                                }}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${selectedProvider.id === p.id
                                        ? "ring-2 ring-purple-500 ring-offset-2 scale-105 shadow-md"
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

                {/* Smartcard Input */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">IUC / Smartcard Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Tv className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            placeholder="Enter number"
                            value={smartcardNumber}
                            onChange={(e) => {
                                setSmartcardNumber(e.target.value);
                                setVerifiedName("");
                            }}
                            onBlur={handleVerify}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-sm text-lg font-medium"
                        />
                        {verifying && (
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
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

                {/* Package Selection */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Select Package</h2>
                    <div className="space-y-2">
                        {currentPackages.map((pkg) => (
                            <button
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg)}
                                className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all duration-200 ${selectedPackage?.id === pkg.id
                                        ? "border-purple-600 bg-purple-50 ring-1 ring-purple-600"
                                        : "border-gray-100 bg-white hover:border-purple-200"
                                    }`}
                            >
                                <span className="font-bold text-gray-800">{pkg.name}</span>
                                <span className="font-semibold text-purple-600">₦{pkg.price.toLocaleString()}</span>
                            </button>
                        ))}
                    </div>
                </section>

            </main>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg md:relative md:bg-transparent md:border-t-0 md:shadow-none max-w-2xl mx-auto">
                <button
                    disabled={!selectedPackage || !smartcardNumber || loading}
                    onClick={handlePurchase}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${!selectedPackage || !smartcardNumber || loading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-purple-900 text-white hover:bg-purple-800 hover:shadow-purple-900/25 active:scale-[0.98]"
                        }`}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5" />
                            Pay ₦{selectedPackage?.price.toLocaleString() || "0.00"}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
