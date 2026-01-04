"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ChatBubble from "@/components/ChatBubble";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const coupleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // State for Chat Bubbles
    const [showFemaleChat, setShowFemaleChat] = useState(false);
    const [showMaleChat, setShowMaleChat] = useState(false);

    // Countdown Logic
    const targetDate = new Date("2026-02-08T08:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    // GSAP Animations
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            // 1. Text Reveal (Cormorant)
            tl.fromTo(".home-title",
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 1.2, delay: 0.5 }
            );

            // 2. Names & Infinity (Great Vibes)
            tl.fromTo(".bride-name",
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1.2 },
                "-=0.8"
            );
            tl.fromTo(".infinity-icon",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 1 },
                "-=1"
            );
            tl.fromTo(".groom-name",
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1.2 },
                "-=1"
            );

            // 3. Countdown
            tl.fromTo(".home-countdown",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1 },
                "-=0.8"
            );

            // 4. Couple Image Slide In & Grounding
            tl.fromTo(coupleRef.current,
                { y: "15%", opacity: 0, scale: 0.95 },
                { y: "0%", opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
                "-=0.5"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Chat Bubble Logic
    useEffect(() => {
        const timer1 = setTimeout(() => setShowFemaleChat(true), 1800);
        const timer2 = setTimeout(() => setShowMaleChat(true), 2800);
        const timer3 = setTimeout(() => {
            setShowFemaleChat(false);
            setShowMaleChat(false);
        }, 8000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-start justify-start pt-[max(env(safe-area-inset-top),_4rem)] overflow-hidden"
        >
            {/* Main Content - Centered Top */}
            <div ref={textRef} className="z-10 flex flex-col items-center space-y-2 text-center w-full px-6 mt-4">

                {/* Title */}
                <p className="home-title font-serif text-primary text-xs md:text-sm tracking-[0.25em] uppercase opacity-0 drop-shadow-sm mb-1">
                    The Wedding Of
                </p>

                {/* Names */}
                <div className="flex flex-col items-center justify-center space-y-0 py-2">
                    <h1 className="bride-name font-vibes text-[3.2rem] md:text-6xl text-primary opacity-0 leading-tight drop-shadow-sm">
                        Desty
                    </h1>

                    <div className="infinity-icon w-8 h-6 relative opacity-0 my-1">
                        <Image
                            src="/assets/images/ornaments/infinity.gif"
                            alt="Infinity"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <h1 className="groom-name font-vibes text-[3.2rem] md:text-6xl text-primary opacity-0 leading-tight drop-shadow-sm">
                        Rizqull
                    </h1>
                </div>

                {/* Countdown */}
                <div className="home-countdown flex space-x-3 opacity-0 pt-4">
                    <CountdownItem value={timeLeft.days} label="Hari" />
                    <CountdownItem value={timeLeft.hours} label="Jam" />
                    <CountdownItem value={timeLeft.minutes} label="Menit" />
                    <CountdownItem value={timeLeft.seconds} label="Detik" />
                </div>


            </div>

            {/* Couple Image (Foreground) - Full Screen Alignment */}
            <div
                ref={coupleRef}
                className="absolute bottom-0 w-full h-full opacity-0 pointer-events-auto z-30"
            >
                <div className="relative w-full h-full">
                    {/* Grounding Shadow / Gradient */}
                    <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/20 to-transparent z-0 pointer-events-none" />

                    <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-20">
                        {/* Female Bubble (Left) - Adjusted slightly up for mobile */}
                        <div className="absolute bottom-[23%] md:bottom-[23%] left-[25%] md:left-[30%] scale-90">
                            <ChatBubble text="Haloo" sender="left" isVisible={showFemaleChat} />
                        </div>

                        {/* Male Bubble (Right) - Adjusted slightly right for mobile, lowered for desktop */}
                        <div className="absolute bottom-[27%] md:bottom-[27%] right-[10%] md:right-[15%] scale-90">
                            <ChatBubble text="Hai, Yeayy akhirnya kita nikah nih." sender="right" isVisible={showMaleChat} className="min-w-[160px]" tail="bottom-left-offset" />
                        </div>
                    </div>

                    <Image
                        src="/assets/images/couple/couple.png"
                        alt="Couple High Res"
                        fill
                        className="object-contain object-bottom"
                        quality={100}
                        sizes="100vw"
                        priority
                    />
                </div>

                {/* Click handlers */}
                <div
                    className="absolute bottom-0 left-0 w-1/2 h-full cursor-pointer z-30"
                    onClick={() => { setShowFemaleChat(true); setTimeout(() => setShowFemaleChat(false), 3000); }}
                />
                <div
                    className="absolute bottom-0 right-0 w-1/2 h-full cursor-pointer z-30"
                    onClick={() => { setShowMaleChat(true); setTimeout(() => setShowMaleChat(false), 3000); }}
                />
            </div>

            {/* Navigation Hint */}
            <div className="absolute bottom-[max(env(safe-area-inset-bottom),_1rem)] right-6 z-30 opacity-0 animate-fade-in delay-[2000ms]">
                <p className="text-[0.6rem] uppercase tracking-widest text-primary/60 animate-pulse-slow">Geser</p>
            </div>

        </section>
    );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg flex items-center justify-center shadow-sm">
                <span className="font-sans text-sm md:text-base font-bold text-primary">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-[8px] text-primary/80 uppercase tracking-wider mt-1 font-medium">
                {label}
            </span>
        </div>
    );
}
