"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Groom() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Frame/Image Animation (Scale Up) - Removed Opacity to ensure visibility
            gsap.fromTo(".groom-img",
                { scale: 0.95 },
                {
                    scale: 1, duration: 1.5, ease: "power2.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top center" }
                }
            );

            // Text Animation (Slide Up)
            gsap.fromTo(".groom-content",
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.5, ease: "power2.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top center" }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="h-full w-full flex flex-col items-center justify-end relative overflow-hidden"
        >
            {/* Background Color Layer */}
            <div className="absolute inset-0 bg-[#d87c35]/30 backdrop-blur-xs -z-20" />

            {/* Arch Card Frame - Extended to Bottom */}
            <div className="groom-img relative w-full h-full flex flex-col items-center justify-end z-10 mx-auto pointer-events-none">

                {/* 
                   Dynamic Layout Container
                   Mobile Default: w-[90%] h-[92%]
                   iPhone 14 PM / Large Mobile (sm): w-[85%] h-[94%]
                   Desktop (md): h-[90%] aspect-[3.2/5]
                */}
                <div className="relative w-[90%] h-[92%] sm:w-[85%] sm:h-[94%] md:w-auto md:h-[90%] md:aspect-[3.2/5] flex flex-col justify-end transition-all duration-300">

                    {/* Image (Frame) - Positioned Above Card BG */}
                    <div className="absolute top-0 left-0 w-full z-30 pointer-events-none h-[60%] sm:h-[62%] md:h-[58.5%]">
                        <Image
                            src="/assets/images/groom/framerizqull.png"
                            alt="Rizqulloh"
                            fill
                            className="object-contain object-bottom scale-[1.01] translate-y-6 md:scale-110 md:translate-y-4"
                            sizes="(max-width: 768px) 90vw, 420px"
                            priority
                            unoptimized
                        />
                    </div>

                    {/* Card Background & Text */}
                    <div className="relative w-full h-full bg-[#f6e6ae] rounded-t-full shadow-lg overflow-hidden pointer-events-auto flex flex-col justify-end z-10">
                        {/* Inner Border Ring */}
                        <div className="absolute inset-3 md:inset-4 border border-[#d87c35]/30 rounded-t-full border-b-0 pointer-events-none z-20" />

                        {/* Gradient to blend image area */}
                        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-[#f6e6ae]/20 to-[#f6e6ae] z-0" />

                        {/* Text Content (Bottom, inside card) */}
                        <div className="groom-content relative z-30 text-center space-y-1 md:space-y-2 pb-10 pt-2 px-4 md:px-6 shrink-0">
                            <div className="space-y-1">
                                <p className="font-vibes text-3xl min-[400px]:text-4xl md:text-2xl text-[#d87c35] drop-shadow-sm leading-tight">Rizqulloh Rifqi Edwanto, S.Kom.</p>
                                <p className="font-sans text-[0.75rem] min-[400px]:text-[1rem] md:text-xs text-[#d87c35]/80 leading-relaxed max-w-[240px] xs:max-w-xs mx-auto">
                                    Putra pertama dari Bapak Purwanto (Alm) & Ibu Endang Puji Lestari
                                </p>
                            </div>

                            <div className="pt-1 md:pt-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 md:h-9 rounded-full text-[#d87c35]/70 hover:text-[#d87c35] hover:bg-[#d87c35]/10 text-[0.65rem] md:text-sm"
                                    onClick={() => window.open("https://www.instagram.com/rizqullr/", "_blank")}
                                >
                                    <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                                    @rizqullr
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
