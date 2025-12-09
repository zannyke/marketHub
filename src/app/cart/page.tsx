import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
    const cartItems = [
        { id: 1, title: "DataWizard Pro", type: "Agent", price: 49.99, imageColor: "var(--accent-blue)" },
        { id: 2, title: "CopyMaster AI", type: "Prompt", price: 19.99, imageColor: "var(--accent-purple)" }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Your Cart</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cartItems.map((item) => (
                        <div key={item.id} className="glass" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: `linear-gradient(135deg, rgba(255,255,255,0.1), ${item.imageColor})` }}></div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '100px' }}>{item.type}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>${item.price}</span>
                                <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                            <span>Subtotal</span>
                            <span>$69.98</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            <span>Tax (Est.)</span>
                            <span>$5.60</span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                            <span>Total</span>
                            <span>$75.58</span>
                        </div>
                        <Button size="lg" className="w-full">
                            Checkout <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Button>
                        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Secure checkout powered by Stripe
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
