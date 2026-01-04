"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAudio } from "@/components/providers/AudioProvider";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function OpeningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";
  const { play } = useAudio();

  // State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buttonText, setButtonText] = useState("Buka Undangan");

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const transitionVideoRef = useRef<HTMLVideoElement>(null);

  // Initial Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, ease: "power2.out", delay: 0.5 }
      );

      // Button idle animation (pulse)
      gsap.to(buttonRef.current, {
        scale: 1.06,
        duration: 1.25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5 // Start after text appears
      });

      // Fade in button
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpenInvitation = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setButtonText("Membuka...");

    // 1. Play Audio
    play();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Cleanup done in timeline logic or after video
        }
      });

      // 2. Button Ripple & Disable
      tl.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power1.out"
      });

      // 3. UI Fade Out 
      tl.to([textRef.current, buttonRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.in"
      });

      // 4. Crossfade Videos
      // We manually start the transition video and fade it in over the loop
      if (transitionVideoRef.current && loopVideoRef.current) {
        transitionVideoRef.current.style.display = 'block';
        transitionVideoRef.current.style.opacity = '0';
        transitionVideoRef.current.play();

        gsap.to(loopVideoRef.current, { opacity: 0, duration: 1 });
        gsap.to(transitionVideoRef.current, { opacity: 1, duration: 1 });
      }

    }, containerRef);
  };

  const onTransitionVideoEnd = () => {
    // Fade out to black or just push
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        const queryString = searchParams.toString();
        router.push(queryString ? `/invitation?${queryString}` : "/invitation");
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-black text-white flex flex-col items-center justify-center"
    >
      {/* 1. Loop Video (Background) */}
      <video
        ref={loopVideoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/videos/opening-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 2. Transition Video (Hidden initially) */}
      <video
        ref={transitionVideoRef}
        className="absolute inset-0 w-full h-full object-cover z-10 hidden"
        src="/assets/videos/opening-transition.mp4"
        muted={false} // Transition video has audio? Usually we rely on global audio.
        playsInline
        onEnded={onTransitionVideoEnd}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-end h-full pb-32 space-y-8 w-full px-6">

        {/* Dynamic Text */}
        <div ref={textRef} className="text-center space-y-2 opacity-0">
          <p className="font-serif text-lg tracking-widest text-slate-200">Dear</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-white capitalize drop-shadow-lg">
            {guestName}
          </h1>
        </div>

        {/* Action Button */}
        <button
          ref={buttonRef}
          onClick={handleOpenInvitation}
          disabled={isTransitioning}
          className={cn(
            "opacity-0 relative group px-8 py-3 rounded-full overflow-hidden transition-all duration-300",
            "bg-white/10 backdrop-blur-sm border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
            "hover:bg-white/20 hover:border-white/50",
            isTransitioning && "cursor-not-allowed grayscale"
          )}
          aria-label="Open Invitation"
        >
          <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
            {buttonText}
          </span>

          {/* Ripple Effect Container (could be enhanced) */}
          <div className="absolute inset-0 rounded-full bg-white/0 group-active:bg-white/10 transition-colors duration-200" />
        </button>

      </div>
    </div>
  );
}
