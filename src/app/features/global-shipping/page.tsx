export default function GlobalShippingPage() {
    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">Global Shipping</h1>
                <p className="text-lg text-slate-600 mb-8">
                    Borderless commerce. We deliver to over 140 countries with real-time tracking and customs handling included.
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 font-bold">1</div>
                        <div>
                            <h3 className="font-bold text-lg">Smart Logistics</h3>
                            <p className="text-slate-500">Our AI routing engine finds the fastest, cheapest path for your package automatically.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600 font-bold">2</div>
                        <div>
                            <h3 className="font-bold text-lg">Carbon Neutral</h3>
                            <p className="text-slate-500">We offset 100% of carbon emissions for every international shipment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
