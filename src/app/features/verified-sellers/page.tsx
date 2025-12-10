export default function VerifiedSellersPage() {
    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">Verified Sellers</h1>
                <p className="text-lg text-slate-600 mb-8">
                    At MarketHub, trust is our currency. Our "Verified Seller" badge is not just a label; it's a promise.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="p-6 bg-teal-50 rounded-xl border border-teal-100">
                        <h3 className="font-bold text-xl mb-3 text-teal-800">Rigorous Vetting</h3>
                        <p className="text-slate-600">Every seller undergoes a strict 5-step verification process verifying identity, business registration, and supply chain quality.</p>
                    </div>
                    <div className="p-6 bg-teal-50 rounded-xl border border-teal-100">
                        <h3 className="font-bold text-xl mb-3 text-teal-800">Track Record</h3>
                        <p className="text-slate-600">We continuously monitor performance. Sellers must maintain a 4.5+ star rating and <1% dispute rate to keep their badge.</p>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Want to become a Verified Seller?</h2>
                    <p className="mb-6 text-slate-300">Join the elite network of merchants shaping the future of commerce.</p>
                    <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-8 rounded-full transition-colors">Apply Now</button>
                </div>
            </div>
        </div>
    );
}
