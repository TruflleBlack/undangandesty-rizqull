"use client";

import React, { useRef, useLayoutEffect, useState } from "react";

import gsap from "gsap";
import { Check, CheckCircle2, User, XCircle, MessageSquare, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type AttendanceStatus = "hadir" | "tidak_hadir" | null;

export default function RSVP() {
    const containerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const isTestMode = searchParams.get("test") === "true";

    // State
    const [status, setStatus] = useState<AttendanceStatus>(null);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [wishes, setWishes] = useState<any[]>([]);

    // Fetch Wishes on Mount
    useLayoutEffect(() => {
        const fetchWishes = async () => {
            try {
                // Fetch wishes relevant to current mode (test or real)
                const res = await fetch(`/api/rsvp?test=${isTestMode}`);
                if (res.ok) {
                    const data = await res.json();
                    setWishes(data);
                }
            } catch (error) {
                console.error("Failed to fetch wishes", error);
            }
        };

        fetchWishes();
    }, [isTestMode]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(".rsvp-header",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top center" }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !status) return;

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    attendance: status,
                    message,
                    isTest: isTestMode,
                }),
            });

            if (res.ok) {
                const result = await res.json();
                setIsSubmitted(true);
                setWishes((prev) => [result.data, ...prev]);
            } else {
                // Try parsing JSON, fallback to text if failed (common with 500 HTML errors)
                let errorMessage = "Terjadi kesalahan server.";
                try {
                    const errorData = await res.json();
                    console.error("Submission failed (JSON):", errorData);
                    errorMessage = errorData.error || errorMessage;
                    if (errorData.details) errorMessage += ` (${errorData.details})`;
                } catch (parseError) {
                    const errorText = await res.text();
                    console.error("Submission failed (Text):", errorText);
                    errorMessage = `Server Error: ${res.status} ${res.statusText}`;
                }
                alert(`Gagal mengirim RSVP: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Submission error (Network/Client):", error);
            alert("Gagal terhubung ke server. Periksa koneksi internet Anda.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setStatus(null);
        setName("");
        setMessage("");
        setIsSubmitted(false);
    };

    return (
        <section
            ref={containerRef}
            className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden p-4 sm:p-6"
        >


            {/* Main Center Card - Scrollable internally if content is too tall */}
            <div className="w-full max-w-sm max-h-[90vh] overflow-y-auto no-scrollbar bg-white/40 backdrop-blur-sm border border-white/40 rounded-[3rem] p-6 shadow-sm flex flex-col items-center space-y-6 z-10 transition-all duration-500">

                {/* 1. Header Section */}
                {!isSubmitted ? (
                    <div className="rsvp-header text-center space-y-2">
                        {isTestMode && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold tracking-wider mb-2 border border-amber-200">
                                <AlertCircle className="w-3 h-3" /> TEST MODE ACTIVE
                            </div>
                        )}
                        <MessageSquare className="w-6 h-6 text-[#512725] mx-auto opacity-70" />
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#512725] drop-shadow-sm">
                            RSVP
                        </h2>
                        <p className="font-sans text-xs md:text-sm text-[#512725]/80 leading-relaxed max-w-xs mx-auto italic">
                            “Apakah Bapak/Ibu/Saudara/i berkenan hadir pada acara pernikahan kami?”
                        </p>
                    </div>
                ) : (
                    <div className="text-center space-y-4 animate-fade-in py-8">
                        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto drop-shadow-sm" />
                        <h3 className="font-serif text-3xl text-[#512725] font-bold">Terima Kasih!</h3>
                        <p className="font-sans text-sm text-[#512725]/80 max-w-xs mx-auto">
                            Konfirmasi kehadiran Anda telah kami terima.
                        </p>
                        <Button onClick={resetForm} variant="ghost" className="text-xs text-[#512725]/60 hover:text-[#512725]">
                            Isi Lagi
                        </Button>
                    </div>
                )}

                {/* 2. Attendance Selection */}
                {!isSubmitted && (
                    <div className="w-full space-y-6 animate-fade-in">
                        <div className="flex flex-row gap-3 justify-center w-full">
                            <button
                                onClick={() => setStatus("hadir")}
                                className={cn(
                                    "flex-1 py-3 px-2 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-1.5",
                                    status === "hadir"
                                        ? "bg-[#512725] border-[#512725] text-white shadow-md scale-105"
                                        : "bg-white/50 border-[#512725]/20 text-[#512725]/70 hover:bg-[#512725]/5"
                                )}
                            >
                                <CheckCircle2 className={cn("w-5 h-5", status === "hadir" ? "text-white" : "text-[#512725]/50")} />
                                <span className="font-serif font-bold text-sm">Hadir</span>
                            </button>

                            <button
                                onClick={() => setStatus("tidak_hadir")}
                                className={cn(
                                    "flex-1 py-3 px-2 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-1.5",
                                    status === "tidak_hadir"
                                        ? "bg-[#512725] border-[#512725] text-white shadow-md scale-105"
                                        : "bg-white/50 border-[#512725]/20 text-[#512725]/70 hover:bg-[#512725]/5"
                                )}
                            >
                                <XCircle className={cn("w-5 h-5", status === "tidak_hadir" ? "text-white" : "text-[#512725]/50")} />
                                <span className="font-serif font-bold text-sm">Tidak Hadir</span>
                            </button>
                        </div>

                        {/* 3. Conditional Form Expansion */}
                        {status && (
                            <form
                                onSubmit={handleSubmit}
                                className="w-full space-y-4 animate-fade-in-up origin-top"
                            >
                                <div className="space-y-3">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 w-4 h-4 text-[#512725]/50" />
                                        <input
                                            type="text"
                                            placeholder="Nama Lengkap"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-[#512725]/20 rounded-2xl text-sm font-sans text-[#512725] placeholder:text-[#512725]/40 focus:outline-none focus:border-[#512725]/50 focus:ring-1 focus:ring-[#512725]/20 transition-all shadow-sm"
                                        />
                                    </div>

                                    {/* Message Input */}
                                    <textarea
                                        placeholder="Ucapan & Doa (Opsional)"
                                        rows={2}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-[#512725]/20 rounded-2xl text-sm font-sans text-[#512725] placeholder:text-[#512725]/40 focus:outline-none focus:border-[#512725]/50 focus:ring-1 focus:ring-[#512725]/20 transition-all resize-none shadow-sm"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={!name || isSubmitting}
                                    className="w-full h-10 rounded-full bg-[#512725] text-white hover:bg-[#512725]/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-serif tracking-wide text-sm transition-transform active:scale-95 flex items-center justify-center"
                                >
                                    {isSubmitting ? "Mengirim..." : "Kirim RSVP"}
                                </Button>
                            </form>
                        )}
                    </div>
                )}

                {/* 4. Wishes List (Always Visible, below content) */}
                <div className="w-full pt-2">
                    <div className="w-full h-px bg-[#512725]/10 mb-3" />
                    <p className="font-serif text-sm text-[#512725] text-left mb-2 pl-1 font-bold">Ucapan Terbaru</p>

                    <div className="w-full max-h-[140px] overflow-y-auto space-y-2 no-scrollbar px-1 pb-1">
                        {wishes.length > 0 ? (
                            wishes.map((wish, idx) => (
                                <div key={wish.id || idx} className="bg-white/40 border border-[#512725]/10 p-2.5 rounded-xl flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="font-sans font-bold text-[11px] text-[#512725]">{wish.name}</span>
                                            {wish.attendance && (
                                                <span className={cn(
                                                    "text-[9px] px-1.5 py-0.5 rounded-full border",
                                                    wish.attendance === "hadir" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
                                                )}>
                                                    {wish.attendance === "hadir" ? "Hadir" : "Maaf, Tidak Bisa"}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[9px] text-[#512725]/50">
                                            {/* Simple relative time or date formatting */}
                                            {new Date(wish.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                    <p className="font-sans text-[11px] text-[#512725]/80 leading-snug line-clamp-2">
                                        "{wish.message}"
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-[10px] text-[#512725]/50 italic py-2">Belum ada ucapan. Jadilah yang pertama!</p>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
