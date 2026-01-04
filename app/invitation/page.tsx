"use client";

import Image from "next/image";

// Sections

import Home from "./sections/Home";
import Doa from "./sections/Doa";
import Salam from "./sections/Salam";
import Bride from "./sections/Bride";
import Groom from "./sections/Groom";
import SaveTheDate from "./sections/SaveTheDate";
import Gift from "./sections/Gift";
import Akad from "./sections/Akad";
import Resepsi from "./sections/Resepsi";
import RSVP from "./sections/RSVP";
import Thanks from "./sections/Thanks";
import FloatingMusicButton from "@/components/FloatingMusicButton";

import { Suspense } from "react";
import FadeInSection from "./components/FadeInSection";

export default function InvitationPage() {
    return (
        <div className="relative h-[100svh] w-full bg-slate-950 overflow-hidden">
            {/* ... Global Background ... */}

            {/* Global Background Image */}
            <div className="absolute inset-0 z-0 h-full w-full">
                {/* Mobile Background (Portrait/Small Screens) - background.png */}
                <div className="relative w-full h-full block md:hidden">
                    <Image
                        src="/assets/images/background/background.png"
                        alt="Background Mobile"
                        fill
                        className="object-cover object-bottom"
                        quality={100}
                        sizes="100vw"
                        priority
                    />
                </div>

                {/* Desktop/Tablet Background - background4x5.png */}
                <div className="relative w-full h-full hidden md:block">
                    <Image
                        src="/assets/images/background/background4x5.png"
                        alt="Background Desktop"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                </div>

                {/* Optional Overlay for text readability */}
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
            </div>

            {/* Horizontal Swipe Container */}
            <div className="relative z-10 w-full h-full flex flex-row overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar">

                {/* Helper function to standardize slide structure */}
                {/* Each slide is strictly 100% width and height */}

                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><Home /></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Doa /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Salam /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Bride /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Groom /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><SaveTheDate /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Akad /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Resepsi /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Gift /></FadeInSection></div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative">
                    <FadeInSection>
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/50">Loading RSVP...</div>}>
                            <RSVP />
                        </Suspense>
                    </FadeInSection>
                </div>
                <div className="min-w-full w-full h-full snap-center shrink-0 overflow-hidden relative"><FadeInSection><Thanks /></FadeInSection></div>
            </div>

            {/* Global Music Control (Persistent across slides) */}
            <FloatingMusicButton />
        </div>
    );
}
