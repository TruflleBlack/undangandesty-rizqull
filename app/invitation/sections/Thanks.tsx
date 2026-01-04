"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Thanks() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".thanks-text",
                { y: 25, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center+=60"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-center text-center overflow-hidden pt-[max(env(safe-area-inset-top),_4rem)] pb-[max(env(safe-area-inset-bottom),_3rem)]"
        >

            {/* Background - selalu pas di semua device */}
            <Image
                src="/assets/images/couple/terimakasih.png"
                alt="Terima Kasih"
                fill
                className="object-cover object-bottom"
                priority
            />

            {/* Overlay halus agar teks terbaca */}


            {/* TEXT AREA */}
            <div className="relative z-10 thanks-text opacity-0 flex flex-col items-center px-6 max-w-[640px] pb-[35%]">
                {/* Kalimat Penutup Baru - Diimpit ke tengah atas */}
                <p className="font-sans text-xs md:text-sm leading-relaxed text-[#512725]/90 max-w-md mb-8 italic">
                    "Merupakan kehormatan serta kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai."
                    <br /><br />
                    <span className="not-italic font-semibold">Wassalamualaikum Warahmatullahi Wabarakatuh</span>
                </p>

                <p className="font-serif text-xs md:text-sm uppercase tracking-[0.2em] text-[#512725]/85">
                    Kami yang berbahagia
                </p>

                <h1 className="font-vibes text-5xl md:text-6xl text-[#512725] drop-shadow-sm my-2">
                    Desty & Rizqull
                </h1>

                <p className="font-sans text-[0.75rem] md:text-xs text-[#512725]/85 tracking-widest mb-4">
                    Beserta Keluarga Besar
                </p>
            </div>
        </section>
    );
}
