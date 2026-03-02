"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as maptiler from '@maptiler/sdk';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

maptiler.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '';

interface LiveMapProps {
    className?: string;
    center?: [number, number]; // [lng, lat]
    zoom?: number;
}

export const LiveMap = ({ className, center = [39.2026, -6.7924], zoom = 12 }: LiveMapProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;
        if (map.current) return;

        try {
            if (!maptiler.config.apiKey || maptiler.config.apiKey === 'YOUR_MAPTILER_API_KEY_HERE') {
                setError("MapTiler API Key is missing. Please add it to your .env.local file.");
                setIsLoading(false);
                return;
            }

            map.current = new maptiler.Map({
                container: mapContainer.current,
                style: maptiler.MapStyle.STREETS,
                center: center,
                zoom: zoom,
                geolocate: true,
                navigationControl: true,
            });

            map.current.on('load', () => {
                setIsLoading(false);

                // Add a sample marker for the delivery hub location
                if (map.current) {
                    new maptiler.Marker({ color: "#008B8B" })
                        .setLngLat(center)
                        .setPopup(new maptiler.Popup().setHTML("<h4>Your Location</h4>"))
                        .addTo(map.current);
                }
            });

            map.current.on('error', (e: any) => {
                console.error("MapTiler Error:", e);
                setError("Failed to load map. Check your API key and connection.");
                setIsLoading(false);
            });

        } catch (err) {
            console.error("Error initializing map:", err);
            setError("Map initialization failed.");
            setIsLoading(false);
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [center, zoom]);

    return (
        <div className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl ${className}`}>
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

            {isLoading && (
                <div className="absolute inset-0 z-10 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white">
                    <Loader2 className="animate-spin mb-4" size={32} />
                    <p className="font-black uppercase tracking-widest text-[10px]">Initializing Live Navigation Engine...</p>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 z-10 bg-slate-900 flex flex-col items-center justify-center p-8 text-center text-white">
                    <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-500 mb-4 shadow-lg">
                        <MapPin size={32} />
                    </div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Navigation Sync Failed</h3>
                    <p className="text-slate-400 text-sm max-w-xs">{error}</p>
                    <div className="mt-8 px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                        Powered by MapTiler Engine
                    </div>
                </div>
            )}

            {!isLoading && !error && (
                <div className="absolute top-4 left-4 z-10 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Live Tracking Active</span>
                </div>
            )}
        </div>
    );
};
