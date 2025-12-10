export default function CuratedQualityPage() {
    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">Curated Quality</h1>
                <p className="text-lg text-slate-600 mb-8">
                    Hand-picked. Expertly reviewed. Only the best makes it to MarketHub.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="border border-slate-100 p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Design First</h3>
                        <p className="text-sm text-slate-500">We prioritize products with exceptional industrial design and aesthetics.</p>
                    </div>
                    <div className="border border-slate-100 p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Durability Tested</h3>
                        <p className="text-sm text-slate-500">Items are physically tested for longevity before listing.</p>
                    </div>
                    <div className="border border-slate-100 p-6 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-2">Authenticity</h3>
                        <p className="text-sm text-slate-500">Guaranteed original items. Zero tolerance for counterfeits.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
