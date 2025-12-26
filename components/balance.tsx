"use client";
import { Plus, Eye, EyeOff, Send } from "lucide-react";
import { useState } from "react";

export default function Balance() {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-6">
      <div className="bg-gradient-to-br from-slate-900 to-primary rounded-3xl p-6 md:p-10 shadow-xl shadow-primary/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-50/80">
              <span className="text-sm font-medium">Total Balance</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                {showBalance ? "₦1,000,000.00" : "••••••••"}
              </h3>
              <p className="text-sm text-emerald-100/70 font-medium">+2.5% this month</p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold font-sm hover:bg-emerald-50 transition-all shadow-lg shadow-black/5 active:scale-95">
              <Plus className="w-5 h-5" />
              Top Up
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold font-sm hover:bg-white/30 transition-all active:scale-95">
              <Send className="w-5 h-5" />
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
