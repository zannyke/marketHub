import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-teal-dark text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-teal-700 font-bold">
                                M
                            </div>
                            <span>MarketHub</span>
                        </Link>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            Premium marketplace for curated products and trusted sellers.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Shop</h4>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><Link href="/marketplace?cat=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                            <li><Link href="/marketplace?cat=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
                            <li><Link href="/marketplace?cat=home" className="hover:text-white transition-colors">Home & Living</Link></li>
                            <li><Link href="/marketplace" className="hover:text-white transition-colors">Trending</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white/80 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white/80 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white/80 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white/80 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
                    <p>© 2025 MarketHub. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
