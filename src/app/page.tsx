"use client";

import { useApp } from "@/providers/AppProvider";
import { BuyerHome } from "@/components/home/BuyerHome";
import { SellerHome } from "@/components/home/SellerHome";
import { DeliveryHome } from "@/components/home/DeliveryHome";

export default function Home() {
  const { role, setRole, user, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // If not logged in or role not explicitly set, show the Market Hub Gateway
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold tracking-tight text-slate-900">
              Market <span className="text-teal-600">Hub</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              Swift. Secure. Verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Buyer Toggle */}
            <button
              onClick={() => { setRole('buyer'); window.location.href = '/auth/login'; }}
              className="group relative h-64 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-teal-500"
            >
              <div className="mb-4 p-4 bg-teal-100 rounded-2xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">BUYER</h3>
              <p className="text-sm text-slate-500 mt-2 text-center">Marketplace, Cart, and Wallet Access</p>
            </button>

            {/* Seller Toggle */}
            <button
              onClick={() => { setRole('seller'); window.location.href = '/auth/login'; }}
              className="group relative h-64 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-500"
            >
              <div className="mb-4 p-4 bg-blue-100 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">SELLER</h3>
              <p className="text-sm text-slate-500 mt-2 text-center">Storefront, Analytics, and Inventory</p>
            </button>

            {/* Delivery Toggle */}
            <button
              onClick={() => { setRole('delivery'); window.location.href = '/auth/login'; }}
              className="group relative h-64 glass-panel rounded-3xl p-8 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-purple-500"
            >
              <div className="mb-4 p-4 bg-purple-100 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">DELIVERY</h3>
              <p className="text-sm text-slate-500 mt-2 text-center">Logistics and Active Orders</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Role-based routing for authenticated users
  switch (role) {
    case 'seller':
      return <SellerHome />;
    case 'delivery':
      return <DeliveryHome />;
    case 'buyer':
    default:
      return <BuyerHome />;
  }
}
