"use client"
import Header from "@/components/header"
import Balance from "@/components/balance"
import Services from "@/components/services"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50" onContextMenu={(e) => e.preventDefault()}>
      <Header />
      <main className="space-y-4 animate-fade-in">
        <Balance />
        <Services />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          <div className="bg-gradient-to-r from-slate-900 to-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold mb-4 backdrop-blur-md border border-white/10">Special Offer</span>
              <h3 className="text-2xl font-bold mb-2">Get 5% Cashback</h3>
              <p className="text-slate-300 mb-6 text-sm">On your first airtime recharge of the month. Terms apply.</p>
              <button className="px-5 py-2 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">Learn More</button>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-10 translate-y-10"></div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                      MTN
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">Airtime Purchase</p>
                      <p className="text-xs text-gray-400">Today, 10:23 AM</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-500">-₦500.00</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}