import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                <ArrowLeft size={16} className="mr-2" style={{ marginRight: '8px' }} /> Back to Marketplace
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
                <div>
                    <div style={{
                        height: '400px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                        borderRadius: '24px',
                        marginBottom: '2rem',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Interactive Demo Placeholder</span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <span style={{ background: 'rgba(0, 243, 255, 0.1)', color: 'var(--accent-blue)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>AI AGENT</span>
                    </div>

                    <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>DataWizard Pro {params.id}</h1>
                    <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '3rem' }}>
                        Unleash the power of automated data analysis. DataWizard Pro connects to your data sources and provides real-time insights using advanced machine learning algorithms. Perfect for business intelligence and financial forecasting.
                    </p>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Key Capabilities</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {['Advanced Pattern Recognition', 'Natural Language Processing v4', 'Real-time Data Streaming', 'Customizable API Endpoints', 'Auto-Scaling Infrastructure', 'Enterprise Grade Security'].map(feat => (
                                <li key={feat} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                    <CheckCircle size={16} color="var(--accent-blue)" style={{ marginRight: '10px' }} /> {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <Card style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>$49.99</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>One-time purchase. Lifetime updates.</p>

                        <Button size="lg" className="w-full mb-4" style={{ width: '100%', marginBottom: '1rem' }}>Add to Cart</Button>
                        <Button variant="outline" className="w-full" style={{ width: '100%' }}>View Live Demo</Button>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>License</span>
                                <strong>Commercial</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Support</span>
                                <strong>Priority 24/7</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Updates</span>
                                <strong>Included</strong>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
