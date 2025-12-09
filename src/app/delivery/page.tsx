import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, DollarSign, Clock, Zap } from "lucide-react";

export default function DeliveryPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/delivery-hero.png')",
                        filter: "brightness(0.4)"
                    }}
                ></div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
                        Deliver with <span className="text-gradient">MarketHub</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slideUp">
                        Join the world's most advanced universal delivery network.
                    </p>
                    <div className="flex gap-4 justify-center animate-slideUp" style={{ animationDelay: "0.2s" }}>
                        <Link href="/auth/signup?role=delivery">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover-lift">
                                Start Delivering
                            </Button>
                        </Link>
                        <Link href="#benefits">
                            <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full hover-lift glass text-white border-white/20 hover:bg-white/10">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        Why Partner with <span className="text-gradient">MarketHub?</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl glass hover-lift border border-white/5">
                            <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                                <DollarSign size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Top Earnings</h3>
                            <p className="text-gray-400">
                                Earn competitive rates with 100% of tips. Weekly bonuses and peak hour surges.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl glass hover-lift border border-white/5">
                            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Flexible Schedule</h3>
                            <p className="text-gray-400">
                                Be your own boss. Work whenever you want with no minimum hours required.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl glass hover-lift border border-white/5">
                            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-6 text-green-400">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Instant Payouts</h3>
                            <p className="text-gray-400">
                                Cash out your earnings instantly after every delivery with market-leading speed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        Get Started in 3 Steps
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-8">
                        {[
                            { step: 1, title: "Sign Up Online", desc: "Submit your application and documents in minutes." },
                            { step: 2, title: "Get Verified", desc: "Background check and vehicle verification usually takes 24h." },
                            { step: 3, title: "Start Earning", desc: "Log in to the app, accept orders, and earn immediately." }
                        ].map((item, i) => (
                            <div key={item.step} className="flex gap-6 items-start p-6 rounded-xl glass border border-white/5">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <div className="p-12 rounded-3xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 glass border border-white/10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to hit the road?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of delivery partners earning on their own terms.
                        </p>
                        <Link href="/auth/signup?role=delivery">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg rounded-full shadow-lg hover-lift">
                                Sign Up Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
