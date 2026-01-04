"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MobileFrameProps {
    children: ReactNode;
    className?: string;
}

export default function MobileFrame({ children, className }: MobileFrameProps) {
    return (
        <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            {/* Decorative Background for Desktop */}
            <div className="absolute inset-0 z-0 bg-slate-900 hidden md:block">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black" />
            </div>

            {/* Mobile Device Frame */}
            <div
                className={cn(
                    "relative z-10 w-full h-[100svh] md:h-[850px] md:w-[430px] md:max-h-[90vh] bg-white text-slate-900 shadow-2xl overflow-hidden md:rounded-[2rem]",
                    "flex flex-col",
                    className
                )}
            >
                <main className="flex-1 w-full h-full overflow-x-hidden relative">
                    {children}
                </main>
            </div>
        </div >
    );
}
