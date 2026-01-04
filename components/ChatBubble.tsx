"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ChatBubbleProps {
    text: string;
    sender: "left" | "right"; // left = female, right = male
    isVisible?: boolean;
    className?: string; // Add className to interface
    textClassName?: string; // Add textClassName to interface
    tail?: "bottom-center" | "bottom-left" | "bottom-right" | "left-center" | "right-center" | "right-bottom" | "bottom-left-offset" | "left-bottom";
}

export default function ChatBubble({ text, sender, isVisible = true, className, textClassName, tail }: ChatBubbleProps) {
    // Determine Tail Classes based on prop or fallback to sender
    const getTailClass = () => {
        if (tail) {
            switch (tail) {
                case "bottom-center": return "bottom-[-6px] left-1/2 -translate-x-1/2 bg-inherit";
                case "bottom-left-offset": return "bottom-[-6px] left-[35%] bg-inherit"; // Slightly left of center
                case "bottom-left": return "bottom-[-6px] left-4 bg-inherit";
                case "bottom-right": return "bottom-[-6px] right-4 bg-inherit";
                case "left-center": return "top-1/2 -translate-y-1/2 left-[-6px] bg-inherit";
                case "right-center": return "top-1/2 -translate-y-1/2 right-[-6px] bg-inherit";
                case "right-bottom": return "bottom-3 right-[-6px] bg-inherit";
                case "left-bottom": return "bottom-3 left-[-6px] bg-inherit";
                default: return "";
            }
        }
        // Fallback
        return sender === "left"
            ? "bottom-[-6px] left-1/2 -translate-x-1/2 bg-white"  // Default Female: Bottom Center
            : "top-[70%] -translate-y-1/2 left-[-6px] bg-primary"; // Default Male: Left Side
    };

    return (
        <div
            className={cn(
                "absolute top-[-80px] z-20 max-w-[180px] p-3 rounded-2xl shadow-lg transition-all duration-500 transform",
                sender === "left"
                    ? "left-4 bg-white rounded-bl-sm"
                    : "right-4 bg-primary text-white rounded-br-sm",
                isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-90 pointer-events-none",
                className
            )}
        >
            <p className={cn("text-xs font-sans leading-relaxed", sender === "left" ? "text-slate-800" : "text-white/90", textClassName)}>
                {text}
            </p>

            {/* Triangle Tail */}
            <div
                className={cn(
                    "absolute w-4 h-4 transform rotate-45",
                    getTailClass(),
                    // Override default bg logic to match parent if not inherited (though bg-inherit works well if parent has color)
                    // Actually, let's ensure it matches the container's bg. 
                    // The 'bg-inherit' in switch above relies on the tail div being a child.
                    // But tail div is a child! 
                    // However, we need to handle the specific colors passed via className or default logic.
                    // If className overrides bg, 'bg-inherit' is perfect.
                    // If default 'bg-white' or 'bg-primary' is used, we need to be careful.
                    // Let's rely on explicit bg classes in the switch or the sender logic if no tail prop.
                    // For the custom tail prop case (bottom-right), we essentially want it to match the bubble color.
                    className?.includes("bg-") ? "bg-inherit" : ""
                )}
                // Fix: bg-inherit might not work if parent has gradient or complex bg, but here it's solid.
                // Re-forcing specific bg handling:
                style={{ backgroundColor: "inherit" }}
            />
        </div>
    );
}
