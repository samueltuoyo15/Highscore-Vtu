"use client"
import Header from "@/components/header"
import Balance from "@/components/balance"
import Services from "@/components/services"
import { ArrowRight, Zap, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white md:bg-gray-50/30" onContextMenu={(e) => e.preventDefault()}>
      <Header />
      <main className="space-y-6 animate-fade-in pb-24 md:pb-10">
        <Balance />
        <Services />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer">
            <div className="relative z-10 flex flex-col items-start h-full justify-between min-h-[160px]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs font-medium mb-4">
                  <Zap className="w-3 h-3 text-yellow-400" fill="currentColor" />
                  <span>Limited Offer</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">5% Interest on Savings</h3>
                <p className="text-gray-400 text-sm max-w-xs">Grow your wealth with our new high-yield savings vault.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold mt-6 group-hover:gap-3 transition-all">
                Start Saving <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10">
              <TrendingUp className="w-48 h-48 -translate-y-10 translate-x-10" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
              <button className="text-xs font-semibold text-gray-500 hover:text-black">View All</button>
            </div>

            <div className="space-y-1 flex-1">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 -mx-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      MTN
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Airtime Purchase</p>
                      <p className="text-xs text-gray-500 font-medium">Today, 10:23 AM</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">-₦500.00</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}