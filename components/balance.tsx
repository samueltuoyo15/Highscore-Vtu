"use client";
import { Plus, Eye, EyeOff, Phone } from "lucide-react";
import { useState } from "react";

export default function Balance() {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="md:max-w-2xl mx-auto p-4 bg-purple-800 text-white rounded-xl shadow-lg">
      <div className="text-center space-y-2">
        <h2 className="font-bold text-2xl">Wallet Balance</h2>
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-3xl font-bold">
            {showBalance ? "₦1,000,000" : "•••••••"}
          </h3>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-violet-300 hover:text-white transition-colors"
          >
            {showBalance ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-violet-300">Commission: ₦0</p>
      </div>

      <div className="flex justify-between items-center mt-6 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full p-3 rounded-full bg-teal-500 hover:bg-teal-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Money</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full p-3 rounded-full bg-transparent border-2 border-violet-300 hover:bg-violet-300/10 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>Contact</span>
        </button>
      </div>
    </div>
  );
}
