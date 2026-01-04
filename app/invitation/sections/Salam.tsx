"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Salam() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Title reveal
            gsap.fromTo(
                ".salam-title",
                { opacity: 0, y: -20, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    delay: 0.3,
                }
            );

            // Subtitle + text stagger
            gsap.fromTo(
                ".salam-text",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.25,
                    ease: "power2.out",
                    delay: 0.6,
                }
            );

            // Foreground Image Entry
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, y: 50, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.8,
                    ease: "power3.out",
                    delay: 0.9,
                }
            );

            // Gentle breathing motion
            gsap.to(imageRef.current, {
                y: "+=8",
                duration: 4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-start text-center overflow-hidden pt-20 md:pt-32 [@media(min-height:840px)]:pt-44 [@media(min-height:840px)]:gap-y-12"
        >
            {/* TEXT BLOCK */}
            <div className="relative z-40 flex flex-col items-center space-y-1 [@media(min-height:840px)]:space-y-3">
                <h2 className="salam-title font-vibes text-5xl md:text-4xl [@media(min-height:840px)]:text-6xl text-primary drop-shadow-sm">
                    Assalamu’alaikum
                </h2>

                <p className="salam-text font-serif text-primary/80 text-xs [@media(min-height:840px)]:text-base tracking-widest uppercase">
                    Warahmatullahi Wabarakatuh
                </p>

                <p className="salam-text font-sans text-primary/70 text-xs leading-loose md:text-xs [@media(min-height:840px)]:text-[16px] [@media(min-height:840px)]:leading-loose [@media(min-height:840px)]:max-w-sm max-w-[300px] pt-4">
                    Dengan penuh rasa syukur dan memohon ridho Allah SWT,
                    kami mengundang Bapak/Ibu/Saudara/i
                    untuk hadir memberikan doa restu
                    dan turut berbahagia dalam pernikahan kami.
                </p>
            </div>

            {/* FOREGROUND IMAGE */}
            <div
                ref={imageRef}
                className="absolute bottom-0 w-full h-full pointer-events-none z-30"
            >
                <div className="relative w-full h-full">
                    {/* Grounding Shadow */}
                    <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/20 to-transparent z-0" />

                    <Image
                        src="/assets/images/couple/salam4x5.png"
                        alt="Couple Salam"
                        fill
                        className="object-contain object-bottom"
                        quality={100}
                        priority
                        sizes="100vw"
                    />
                </div>
            </div>
        </section>
    );
}
