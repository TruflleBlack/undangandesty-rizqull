"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function Doa() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Animasi Kartu Utama (Scale & Fade)
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, scale: 0.9, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center+=100", // Mulai saat top container mencapai tengah+100px
                    }
                }
            );

            // 2. Animasi Konten Teks (Stagger)
            gsap.fromTo(
                ".doa-content",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.2, // Jeda antar elemen
                    ease: "power2.out",
                    delay: 0.3, // Tunggu kartu muncul sedikit
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center+=100",
                    }
                }
            );



        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="h-full w-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden"
        >
            {/* Background Color Layer */}
            <div className="absolute inset-0 bg-[#e7b5a2]/30 backdrop-blur-xs -z-10" />

            {/* Main Content Card */}
            <div
                ref={cardRef}
                className="w-full max-w-lg bg-[#FFF5E1] rounded-[100px] p-8 md:p-12 shadow-sm text-center relative z-10"
            >
                {/* Inner Border Decoration */}
                <div className="absolute inset-4 border border-[#cc5c62] rounded-[80px] pointer-events-none opacity-60" />

                {/* Bismillah (Arabic) */}
                <h1 className="doa-content font-serif text-3xl text-[#512725] leading-relaxed pb-6 drop-shadow-sm font-bold opacity-0">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </h1>

                {/* Terjemahan Ayat */}
                <div className="space-y-6">
                    <p className="doa-content font-sans text-[#512725]/90 text-sm leading-relaxed italic opacity-0">
                        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
                    </p>

                    <div className="doa-content pt-4 opacity-0">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-[#512725]/20 bg-[#512725]/5 font-serif text-[#512725] text-xs font-bold tracking-[0.2em] uppercase">
                            QS. Ar-Rum: 21
                        </span>
                    </div>
                </div>
            </div>

        </section>
    );
}
