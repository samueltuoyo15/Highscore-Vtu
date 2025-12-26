"use client";
import { Plus, Eye, EyeOff, Send, CreditCard } from "lucide-react";
import { useState } from "react";

export default function Balance() {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-6">
      <div className="flex flex-col md:flex-row gap-6">

        <div className="flex-1 bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-white/10 transition-colors duration-500"></div>

          <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-4xl font-bold tracking-tight">
                    {showBalance ? "₦1,000,000.00" : "•••••••••••"}
                  </h3>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <CreditCard className="w-8 h-8 text-white/20" />
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors active:scale-95">
                <Plus className="w-4 h-4" />
                Add Money
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors active:scale-95">
                <Send className="w-4 h-4" />
                Transfer
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
          <h4 className="text-gray-500 text-sm font-medium mb-4">Monthly Spending</h4>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">₦24,500</span>
            <span className="text-sm text-green-600 font-medium mb-1.5 bg-green-50 px-2 py-0.5 rounded-full">▼ 12%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">vs ₦28,000 last month</p>
        </div>
      </div>
    </div>
  );
}
