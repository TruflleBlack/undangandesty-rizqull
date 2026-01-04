"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Resepsi() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".resepsi-content",
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top center" }
                }
            );

            // Date counting animation
            const dateObj = { value: 0 };
            gsap.to(dateObj, {
                value: 8,
                duration: 1.5,
                ease: "power1.out",
                scrollTrigger: { trigger: containerRef.current, start: "top center" },
                onUpdate: () => {
                    const dateEl = document.querySelector(".resepsi-date-number");
                    if (dateEl) {
                        dateEl.textContent = Math.ceil(dateObj.value).toString().padStart(2, '0');
                    }
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="h-full w-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden"
        >
            {/* Background Color Layer (Matching Doa/Akad) */}
            <div className="absolute inset-0 bg-[#e7b5a2]/30 backdrop-blur-xs -z-10" />

            {/* Main Content Card - Pill Shape - Fixed Size Equalization */}
            <div className="resepsi-content w-[85%] md:w-[85%] min-h-[500px] bg-[#FFF5E1] rounded-[100px] p-8 md:p-12 shadow-sm text-center relative z-10 flex flex-col items-center justify-center">
                {/* Inner Border Decoration */}
                <div className="absolute inset-4 border border-[#cc5c62] rounded-[80px] pointer-events-none opacity-60" />

                {/* Title Moved Inside */}
                <h2 className="font-vibes text-4xl md:text-5xl text-[#512725] drop-shadow-sm mb-6">Resepsi</h2>

                {/* Date Header matching reference */}
                <div className="flex items-center justify-center space-x-6 mb-5 text-[#512725]">
                    <span className="resepsi-date-number font-serif text-5xl md:text-6xl text-[#cc5c62]">08</span>
                    <div className="flex flex-col items-start leading-tight uppercase font-serif tracking-widest text-xs md:text-sm">
                        <span>Minggu</span>
                        <span>Februari</span>
                        <span>2026</span>
                    </div>
                </div>

                <div className="w-full h-px bg-[#512725]/20 mb-5"></div>

                {/* Time */}
                <div className="flex items-center justify-center space-x-3 mb-5 px-4 text-[#512725]">
                    <Clock className="w-4 h-4 text-[#cc5c62]" />
                    <span className="font-serif text-base tracking-wide">12.00 - 13.30</span>
                </div>

                {/* Location */}
                <div className="space-y-4 text-[#512725]">
                    <div className="space-y-2">
                        <p className="font-serif font-bold tracking-widest uppercase text-xs text-center px-4 text-[#cc5c62]">Lokasi Acara:</p>
                        <div className="space-y-1 font-serif text-xs leading-relaxed text-[#512725]/80 text-center px-4 max-w-xs mx-auto">
                            <p>Kediaman Mempelai Wanita</p>
                            <p>Perumahan Griya Taman Sari 1 Blok A6, Mandungan, Kel.Srimartani, Kec.Piyungan, Kab.Bantul, D.I.Yogyakarta</p>
                        </div>
                    </div>

                    <div className="px-4 text-center">
                        <Button
                            size="sm"
                            className="bg-[#cc5c62] text-white hover:bg-[#cc5c62]/90 shadow-md rounded-full px-6 text-xs h-8"
                            onClick={() => window.open("https://www.google.com/maps/@-7.8231995,110.4735434,3a,75y,117.73h,68.38t/data=!3m7!1e1!3m5!1s6Ky0CKPF-AfcsdWEPDPp2Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D21.620000000000005%26panoid%3D6Ky0CKPF-AfcsdWEPDPp2Q%26yaw%3D117.73!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D", "_blank")}
                        >
                            <MapPin className="w-3 h-3 mr-2" />
                            Lihat Lokasi
                        </Button>
                    </div>
                </div>

            </div>

        </section>
    );
}
