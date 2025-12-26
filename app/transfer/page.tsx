"use client";

import { useState } from "react";
import { ArrowLeft, Landmark, CreditCard, User, CheckCircle } from "lucide-react";
import Link from "next/link";


const banks = [
    { id: "gtb", name: "Guaranty Trust Bank" },
    { id: "firstbank", name: "First Bank" },
    { id: "zenith", name: "Zenith Bank" },
    { id: "access", name: "Access Bank" },
    { id: "uba", name: "United Bank for Africa" },
    { id: "opay", name: "OPay" },
    { id: "palmpay", name: "PalmPay" },
];

export default function TransferPage() {

    const [selectedBank, setSelectedBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verifiedName, setVerifiedName] = useState("");

    const handleVerify = () => {
        if (accountNumber.length < 10) return;
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            setVerifiedName("John Doe"); // Mock
        }, 1500);
    }

    const handleTransfer = () => {
        if (!accountNumber || !amount || !selectedBank) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Success! Transferred ₦${amount} to ${verifiedName || accountNumber}`);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-pink-600 text-white p-4 pt-8 sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Transfer / Mobile Money</h1>
                </div>
            </div>

            <main className="max-w-2xl mx-auto p-4 space-y-6 animate-slide-up">

                {/* Bank Selection */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Select Bank</label>
                    <div className="relative">
                        <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="block w-full pl-3 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all shadow-sm text-lg font-medium appearance-none bg-white"
                        >
                            <option value="" disabled>Select a bank</option>
                            {banks.map(bank => (
                                <option key={bank.id} value={bank.id}>{bank.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <Landmark className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </section>

                {/* Account Number */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Account Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            placeholder="0123456789"
                            maxLength={10}
                            value={accountNumber}
                            onChange={(e) => {
                                setAccountNumber(e.target.value);
                                setVerifiedName("");
                            }}
                            onBlur={handleVerify}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all shadow-sm text-lg font-medium tracking-widest"
                        />
                        {verifying && (
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-600"></div>
                            </div>
                        )}
                        {verifiedName && (
                            <div className="absolute inset-y-0 right-3 flex items-center text-green-600 gap-1 animate-fade-in">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-bold">{verifiedName}</span>
                            </div>
                        )}
                    </div>
                    {verifiedName && (
                        <div className="mt-2 p-2 bg-green-50 text-green-800 rounded-lg text-sm font-medium flex items-center gap-2 animate-fade-in border border-green-100">
                            <CheckCircle className="w-4 h-4" />
                            Account Name: {verifiedName}
                        </div>
                    )}
                </section>

                {/* Amount Input */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Amount (₦)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all shadow-sm text-2xl font-bold text-gray-800"
                    />
                </section>

                {/* Note */}
                <section>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Description (Optional)</label>
                    <input
                        type="text"
                        placeholder="What is this for?"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all shadow-sm text-base"
                    />
                </section>

            </main>

            {/* Fixed Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg md:relative md:bg-transparent md:border-t-0 md:shadow-none max-w-2xl mx-auto">
                <button
                    disabled={!amount || !accountNumber || !selectedBank || loading}
                    onClick={handleTransfer}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${!amount || !accountNumber || !selectedBank || loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-pink-600 text-white hover:bg-pink-700 hover:shadow-pink-600/25 active:scale-[0.98]"
                        }`}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        <>
                            <CreditCard className="w-5 h-5" />
                            Transfer ₦{amount || "0.00"}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
