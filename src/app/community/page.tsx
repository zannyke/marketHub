
import { Button } from "@/components/ui/button";
import { MessageCircle, User } from "lucide-react";

export default function CommunityPage() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>Community Hub</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Connect, share, and learn from other AI enthusiasts.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Latest Discussions</h2>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: 'fit-content' }}>
                                <MessageCircle size={24} color="var(--accent-blue)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Best practices for fine-tuning Llama 3?</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>I've been experimenting with low-rank adaptation but getting mixed results...</p>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    <span>Posted by <strong>AlexDev</strong></span>
                                    <span>•</span>
                                    <span>2 hours ago</span>
                                    <span>•</span>
                                    <span>14 replies</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Top Contributors</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>User_{i}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>1.2k reputation</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(189,0,255,0.1), rgba(0,0,0,0))' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Weekly Challenge</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>Create an agent that can summarize GitHub repositories. Best submission wins $500 credits.</p>
                        <Button size="sm" className="w-full">Participate</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
