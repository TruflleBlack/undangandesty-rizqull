"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavHintProps {
    text: string;
    direction?: "left" | "right";
    className?: string;
    delay?: number; // Delay in ms before appearing
}

export default function NavHint({ text, direction = "right", className, delay = 0 }: NavHintProps) {
    return (
        <div
            className={cn(
                "absolute bottom-[max(env(safe-area-inset-bottom),_1rem)] z-30 flex items-center space-x-2 animate-pulse text-primary/60 opacity-0 animate-fade-in pointer-events-none",
                direction === "right" ? "right-6" : "left-6 flex-row-reverse space-x-reverse",
                className
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
        >
            <span className="text-[0.6rem] uppercase tracking-widest font-sans">{text}</span>
            <ChevronRight className={cn("w-4 h-4", direction === "left" && "rotate-180")} />
        </div>
    );
}
