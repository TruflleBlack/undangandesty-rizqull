"use client";

import { useAudio } from "@/components/providers/AudioProvider";
import { Disc3, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingMusicButton() {
    const { isPlaying, toggle } = useAudio();

    return (
        <button
            onClick={toggle}
            className={cn(
                "fixed bottom-[max(env(safe-area-inset-bottom),_2rem)] right-[max(env(safe-area-inset-right),_1rem)] z-50",
                "w-12 h-12 rounded-full flex items-center justify-center",
                "bg-white/40 backdrop-blur-md border border-white/30 shadow-lg text-primary",
                "transition-all duration-300 transform active:scale-95",
                isPlaying ? "animate-pulse-slow" : "opacity-80 hover:opacity-100"
            )}
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
            {isPlaying ? (
                <div className="relative">
                    <Disc3 className="w-6 h-6 animate-spin-slow" />
                    <Pause className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
            ) : (
                <Play className="w-5 h-5 ml-1" />
            )}
        </button>
    );
}
