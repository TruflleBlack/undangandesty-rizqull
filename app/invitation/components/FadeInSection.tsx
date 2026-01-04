"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface FadeInSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elRef.current;
        if (!element) return;

        // Set initial state
        gsap.set(element, {
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)"
        });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Fade In
                    gsap.to(element, {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        delay: delay,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                } else {
                    // Fade Out
                    gsap.to(element, {
                        opacity: 0,
                        scale: 0.95,
                        filter: "blur(4px)",
                        duration: 0.8,
                        ease: "power2.in",
                        overwrite: "auto"
                    });
                }
            },
            {
                threshold: 0.15, // Trigger early enough
                root: null // viewport
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={elRef} className={`w-full h-full transition-transform will-change-transform ${className || ''}`}>
            {children}
        </div>
    );
}
