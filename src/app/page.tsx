"use client";

import { useApp } from "@/providers/AppProvider";
import { BuyerHome } from "@/components/home/BuyerHome";
import { SellerHome } from "@/components/home/SellerHome";
import { DeliveryHome } from "@/components/home/DeliveryHome";

export default function Home() {
  const { role, user, isLoading } = useApp();

  if (isLoading) {
    // Simple loading state to prevent flash of wrong content
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // If not logged in, default to Buyer/Public view
  if (!user) {
    return <BuyerHome />;
  }

  // Role-based routing
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
