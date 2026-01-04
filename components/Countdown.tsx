"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
    targetDate: string; // ISO string
    className?: string;
}

export default function Countdown({ targetDate, className }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <span className="text-xl md:text-3xl font-serif font-bold text-primary drop-shadow-sm">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.2em] text-primary/70 mt-1 font-medium">
                {label}
            </span>
        </div>
    );

    return (
        <div className={cn("flex items-center justify-center p-3 md:p-4 bg-white/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm", className)}>
            <TimeUnit value={timeLeft.days} label="Hari" />
            <span className="text-primary/40 pb-4 text-xs">:</span>
            <TimeUnit value={timeLeft.hours} label="Jam" />
            <span className="text-primary/40 pb-4 text-xs">:</span>
            <TimeUnit value={timeLeft.minutes} label="Menit" />
            <span className="text-primary/40 pb-4 text-xs">:</span>
            <TimeUnit value={timeLeft.seconds} label="Detik" />
        </div>
    );
}
