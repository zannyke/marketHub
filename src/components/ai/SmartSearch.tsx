"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './SmartSearch.module.css';
import { Search, Sparkles, TrendingUp, X } from 'lucide-react';

export const SmartSearch = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleFocus = () => setIsOpen(true);

    return (
        <div className={styles.searchWrapper} ref={wrapperRef}>
            <div className={styles.searchBar}>
                <Search size={18} className="text-secondary" />
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Search for agents, models, or prompts..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleFocus}
                />
                {query && (
                    <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                        <X size={16} />
                    </button>
                )}
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    {!query ? (
                        <>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.sectionTitle}>
                                    <TrendingUp size={12} style={{ display: 'inline', marginRight: '6px' }} /> Trending Now
                                </div>
                                <div className={styles.suggestionItem}>DataWizard Pro</div>
                                <div className={styles.suggestionItem}>CopyMaster AI</div>
                                <div className={styles.suggestionItem}>Llama 3 Fine-tuner</div>
                            </div>
                            <div>
                                <div className={styles.sectionTitle}>
                                    <Sparkles size={12} style={{ display: 'inline', marginRight: '6px' }} /> Suggested for You
                                </div>
                                <div className={styles.suggestionItem}>
                                    <span>FinanceGPT Agent</span>
                                    <span className={styles.reasonTag}>Based on your history</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className={styles.sectionTitle}>AI Recommendations</div>
                            <div className={styles.suggestionItem}>
                                <span>{query} <strong>Agent</strong></span>
                                <span className={styles.reasonTag}>High match</span>
                            </div>
                            <div className={styles.suggestionItem}>
                                <span>{query} <strong>automation tool</strong></span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
