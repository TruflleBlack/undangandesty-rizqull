"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Opening() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered Fade In
            gsap.fromTo(
                ".opening-element",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.3,
                    ease: "power2.out",
                    delay: 0.5
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="h-full w-full flex flex-col items-center justify-center px-8 text-center space-y-8"
        >
            {/* Bismillah (Arabic) */}
            <h1 className="opening-element font-serif text-3xl md:text-4xl text-primary leading-relaxed">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </h1>

            {/* Greeting */}
            <div className="opening-element space-y-2">
                <h2 className="font-vibes text-4xl md:text-5xl text-primary">
                    Assalamu’alaikum
                </h2>
                <p className="font-serif text-primary/80 text-sm tracking-wide">
                    Warahmatullahi Wabarakatuh
                </p>
            </div>

            {/* Intro Text */}
            <p className="opening-element font-sans text-primary/70 text-xs md:text-sm leading-loose max-w-xs">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami:
            </p>

            {/* Optional: Ornament or Divider if assets exist */}
            {/* <div className="opening-element w-32 h-px bg-primary/20 mt-4" /> */}

        </section>
    );
}
