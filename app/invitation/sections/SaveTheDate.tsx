"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { CalendarPlus } from "lucide-react";
import ChatBubble from "@/components/ChatBubble";

export default function SaveTheDate() {
    const containerRef = useRef<HTMLDivElement>(null);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Desty+%26+Rizqull&dates=20260208T080000/20260208T130000&details=Kami+mengundang+Bapak%2FIbu%2FSaudara%2Fi+untuk+hadir+di+pernikahan+kami.&location=Kediaman+Mempelai+Wanita`;

    /** CHAT STATE */
    const [showFemaleChat, setShowFemaleChat] = useState(false);
    const [showMaleChat, setShowMaleChat] = useState(false);

    /** AUTO BUBBLE */
    useEffect(() => {
        const t1 = setTimeout(() => setShowFemaleChat(true), 1200);
        const t2 = setTimeout(() => setShowMaleChat(true), 2000);
        const t3 = setTimeout(() => {
            setShowFemaleChat(false);
            setShowMaleChat(false);
        }, 7000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    /** GSAP */
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".std-content",
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center+=80"
                    }
                }
            );

            const obj = { value: 0 };
            gsap.to(obj, {
                value: 8,
                duration: 1.2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center+=80",
                },
                onUpdate: () => {
                    const el = document.querySelector(".std-date-number");
                    if (el) el.textContent = Math.ceil(obj.value).toString().padStart(2, "0");
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    /** CLICK BUBBLE */
    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width;

        if (relativeX < 0.48) {
            setShowMaleChat(true);
            setTimeout(() => setShowMaleChat(false), 4500);
        } else {
            setShowFemaleChat(true);
            setTimeout(() => setShowFemaleChat(false), 4500);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative h-full w-full flex flex-col items-center justify-start pt-[max(env(safe-area-inset-top),_4rem)] pb-[max(env(safe-area-inset-bottom),_4.5rem)] px-6 text-center overflow-hidden"
        >

            {/* LOGO */}
            <div className="std-content relative w-35 h-35 md:w-30 md:h-30 z-20">
                <Image
                    src="/assets/images/logo/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain opacity-90"
                    priority
                />
            </div>

            {/* DATE CARD */}
            <div className="std-content mt-4 z-20 flex flex-col items-center space-y-2">
                <div className="border-t border-b border-primary/30 py-4 px-6 w-full max-w-[300px]">
                    <p className="font-serif text-3xl md:text-2xl font-bold text-primary">
                        Minggu
                    </p>

                    <div className="flex items-center justify-center space-x-4 my-2">
                        <span className="h-px w-6 bg-primary/40"></span>
                        <p className="std-date-number font-serif text-5xl md:text-4xl font-bold text-primary">
                            08
                        </p>
                        <span className="h-px w-6 bg-primary/40"></span>
                    </div>

                    <p className="font-serif text-xl md:text-lg text-primary">
                        Februari 2026
                    </p>
                </div>

                {/* BUTTON */}
                <div className="pt-4">
                    <Button
                        onClick={() => window.open(googleCalendarUrl, "_blank")}
                        className="rounded-full bg-primary/80 hover:bg-primary text-white shadow-lg h-10 px-6 text-sm md:h-8 md:px-4 md:text-xs"
                        size="sm"
                    >
                        <CalendarPlus className="w-3 h-3 mr-2" />
                        Save The Date
                    </Button>
                </div>
            </div>

            {/* SPACER */}
            <div className="w-full h-[8vh]" />

            {/* BIKE IMAGE */}
            <div
                className="absolute bottom-0 left-0 w-full h-[75%] md:h-[80%] z-10 cursor-pointer"
                onClick={handleImageClick}
            >
                {/* BUBBLES */}
                <div className="absolute inset-0 pointer-events-none">

                    {/* Male */}
                    <div className="absolute bottom-[25%] md:bottom-[22%] left-[2%] md:left-[2%] w-[150px] md:w-[170px]">
                        <ChatBubble
                            text="Gas, yuk! Biar cepat sampai ke pelaminan"
                            sender="left"
                            isVisible={showMaleChat}
                            className="bg-[#8B5E3C] border-none"
                            textClassName="text-[#FFFDD0] font-medium"
                            tail="right-bottom"
                        />
                    </div>

                    {/* Female */}
                    <div className="absolute bottom-[30%] right-[1%] md:right-[2%] md:bottom-[28%] w-[150px] md:w-[170px]">
                        <ChatBubble
                            text="Mas, ayo kita berangkat… Semoga Allah berkahi langkah kita 🤍"
                            sender="left"
                            isVisible={showFemaleChat}
                            className="bg-[#FFB7C5] border-none"
                            textClassName="text-[#4A0404] font-medium"
                            tail="left-bottom"
                        />
                    </div>
                </div>

                <Image
                    src="/assets/images/couple/sepedah.png"
                    alt="Save The Date Couple"
                    fill
                    className="object-contain object-bottom"
                    priority
                    sizes="100vw"
                    unoptimized
                />
            </div>
        </section>
    );
}
