import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Upload, DollarSign, BarChart } from "lucide-react";

export default function SellPage() {
    return (
        <div className="bg-[#F9FAFB] min-h-[calc(100vh-73px)]">
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Monetize Your <span className="text-teal-600">AI Creations</span>
                </h1>
                <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of developers and prompt engineers selling their agents, models, and tools on AI Nexus.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 h-14 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-full">
                        Start Selling Now
                    </Button>
                    <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-white hover:text-slate-900 font-bold px-8 h-14 text-lg rounded-full">
                        Seller Guidelines
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
                    {[
                        { icon: <Upload size={32} className="text-teal-500" />, title: "Easy Upload", desc: "Connect your repo or upload files directly. We handle the hosting and distribution." },
                        { icon: <DollarSign size={32} className="text-indigo-500" />, title: "Instant Payouts", desc: "Get paid immediately when someone buys your tool. Low platform fees." },
                        { icon: <BarChart size={32} className="text-sky-500" />, title: "Detailed Analytics", desc: "Track views, sales, and user engagement with our advanced dashboard." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="mb-6 p-3 bg-slate-50 rounded-xl inline-block">{item.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
