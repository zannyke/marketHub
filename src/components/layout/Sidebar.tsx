"use client";

import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export const Sidebar = () => {
    // Basic state for the accordion effect - extending for demo
    const [sections, setSections] = useState({
        category: true,
        price: true,
        brand: true,
        rating: true
    });

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }));
    }

    return (
        <aside className="w-64 flex-shrink-0 bg-white border rounded-xl h-fit border-border hidden lg:block p-4 sticky top-[90px]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button className="text-xs text-blue-500 font-medium hover:underline">Reset</button>
            </div>

            {/* Category Section */}
            <div className="mb-6 border-b border-gray-100 pb-6">
                <div
                    className="flex items-center justify-between cursor-pointer mb-3"
                    onClick={() => toggleSection('category')}
                >
                    <h4 className="font-semibold text-sm">Category</h4>
                    {sections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {sections.category && (
                    <div className="space-y-3">
                        {[{ l: "Electronics", c: 2345 }, { l: "Fashion", c: 1892 }, { l: "Home & Living", c: 1854 }, { l: "Beauty", c: 897 }, { l: "Sports", c: 756 }].map((item, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={`cat-${i}`} />
                                    <label htmlFor={`cat-${i}`} className="text-sm text-slate-600 group-hover:text-blue-600 cursor-pointer">{item.l}</label>
                                </div>
                                <span className="text-xs text-slate-400">({item.c})</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range */}
            <div className="mb-6 border-b border-gray-100 pb-6">
                <div
                    className="flex items-center justify-between cursor-pointer mb-3"
                    onClick={() => toggleSection('price')}
                >
                    <h4 className="font-semibold text-sm">Price Range</h4>
                    {sections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {sections.price && (
                    <div className="px-2">
                        <Slider defaultValue={[50]} max={100} step={1} className="mb-4" />
                        <div className="flex items-center justify-between text-sm">
                            <span className="bg-gray-100 px-3 py-1 rounded text-slate-600">$0</span>
                            <span className="text-slate-400">-</span>
                            <span className="bg-gray-100 px-3 py-1 rounded text-slate-600">$1000+</span>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};
