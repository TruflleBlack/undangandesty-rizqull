"use client";

import React, { useRef, useLayoutEffect, useState } from "react";

import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { Copy, Check, CreditCard, Home, X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewState = "main" | "bank-select" | "bank-detail" | "address";
type BankType = "BNI" | "BRI" | "BCA" | null;

const BANK_DATA = {
    BNI: { name: "Rizqulloh Rifqi Edwanto", number: "1949645671" },
    BRI: { name: "Rizqulloh Rifqi Edwanto", number: "818001012806535" },
    BCA: { name: "Desty Ramadhani Fardi", number: "8465888276" },
};

export default function Gift() {
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [view, setView] = useState<ViewState>("main");
    const [selectedBank, setSelectedBank] = useState<BankType>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Main Entry Animation
            gsap.fromTo(".gift-main-content",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top center" }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Handle View Switching with Animation
    const openModal = (targetView: ViewState) => {
        setView(targetView);
        setIsModalOpen(true);

        // Animate Modal In
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "block" });
        gsap.fromTo(modalRef.current,
            { y: "100%" },
            { y: "0%", duration: 0.5, ease: "power3.out", display: "block" }
        );
    };

    const closeModal = () => {
        // Animate Modal Out
        gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.3, onComplete: () => {
                if (overlayRef.current) overlayRef.current.style.display = "none";
            }
        });
        gsap.to(modalRef.current, {
            y: "100%",
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
                setIsModalOpen(false);
                setView("main"); // Reset view
                setSelectedBank(null);
                if (modalRef.current) modalRef.current.style.display = "none";
            }
        });
    };

    const handleBankSelect = (bank: BankType) => {
        setSelectedBank(bank);
        setView("bank-detail");
    };

    return (
        <section
            ref={containerRef}
            className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden p-6"
        >


            {/* MAIN CONTENT */}
            <div className="gift-main-content w-full max-w-sm flex flex-col items-center space-y-8 z-10 p-8 bg-white/40 backdrop-blur-sm border border-white/40 rounded-[3rem] shadow-sm">

                {/* Title */}
                <div className="text-center space-y-4">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#512725] drop-shadow-sm">
                        Wedding Gift
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-[#512725]/80 leading-relaxed max-w-xs mx-auto italic">
                        “Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila berkenan memberikan tanda kasih, dapat melalui:”
                    </p>
                </div>

                {/* Main Actions */}
                <div className="w-full space-y-4">
                    <Button
                        onClick={() => openModal("bank-select")}
                        className="w-full h-14 rounded-full border border-[#512725] bg-white/40 hover:bg-[#512725]/10 text-[#512725] flex items-center justify-center space-x-3 transition-transform active:scale-95 shadow-sm backdrop-blur-sm"
                    >
                        <CreditCard className="w-5 h-5" />
                        <span className="font-serif text-lg tracking-wide">Kirim Hadiah via ATM</span>
                    </Button>

                    <Button
                        onClick={() => openModal("address")}
                        className="w-full h-14 rounded-full border border-[#512725] bg-white/40 hover:bg-[#512725]/10 text-[#512725] flex items-center justify-center space-x-3 transition-transform active:scale-95 shadow-sm backdrop-blur-sm"
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-serif text-lg tracking-wide">Kirim Hadiah ke Rumah</span>
                    </Button>
                </div>
            </div>

            {/* MODAL OVERLAY & SHEET */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 hidden opacity-0"
                onClick={closeModal}
            />

            <div
                ref={modalRef}
                className="absolute bottom-0 left-0 w-full max-h-[70vh] bg-[#FFF5F5] rounded-t-[2rem] shadow-2xl z-50 p-6 hidden flex-col items-center overflow-hidden"
            >
                {/* Modal Handle */}
                <div className="w-12 h-1.5 bg-[#512725]/20 rounded-full mb-6 shrink-0" />

                {/* MODAL CONTENT SWITCHER */}
                <div className="w-full max-w-sm flex-1 flex flex-col overflow-y-auto no-scrollbar pb-6">

                    {/* View: Bank Selection */}
                    {view === "bank-select" && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-serif text-2xl text-[#512725] font-bold">Pilih Bank</h3>
                                <Button variant="ghost" size="icon" onClick={closeModal} className="text-[#512725]/60 hover:text-[#512725] hover:bg-transparent">
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {(Object.keys(BANK_DATA) as BankType[]).map((bank) => (
                                    bank && (
                                        <button
                                            key={bank}
                                            onClick={() => handleBankSelect(bank)}
                                            className="w-full p-4 bg-white/50 border border-[#512725]/20 rounded-2xl flex items-center justify-between hover:bg-white/80 transition-colors shadow-sm"
                                        >
                                            <span className="font-bold text-[#512725] text-lg">{bank}</span>
                                            <div className="w-8 h-8 rounded-full bg-[#512725]/10 flex items-center justify-center text-[#512725]">
                                                <ChevronLeft className="w-4 h-4 rotate-180" />
                                            </div>
                                        </button>
                                    )
                                ))}
                            </div>

                            <Button variant="ghost" className="w-full mt-4 text-[#512725]/60" onClick={closeModal}>
                                Close
                            </Button>
                        </div>
                    )}

                    {/* View: Bank Detail */}
                    {view === "bank-detail" && selectedBank && (
                        <div className="space-y-6 animate-fade-in text-center">
                            <div className="relative flex items-center justify-center mb-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setView("bank-select")}
                                    className="absolute left-0 text-[#512725]/60 hover:bg-transparent"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                                <h3 className="font-serif text-2xl text-[#512725] font-bold">{selectedBank}</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={closeModal}
                                    className="absolute right-0 text-[#512725]/60 hover:bg-transparent"
                                >
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            <div className="bg-white/60 border border-[#512725]/20 rounded-3xl p-8 shadow-sm space-y-2">
                                <p className="font-sans text-sm text-[#512725]/70">No. Rekening</p>
                                <p className="font-serif text-3xl text-[#512725] font-bold tracking-wider">
                                    {BANK_DATA[selectedBank].number}
                                </p>
                                <div className="w-full h-px bg-[#512725]/10 my-4" />
                                <p className="font-sans text-sm text-[#512725]/70">Atas Nama</p>
                                <p className="font-serif text-xl text-[#512725] font-medium">
                                    {BANK_DATA[selectedBank].name}
                                </p>
                            </div>

                            <CopyButton textToCopy={BANK_DATA[selectedBank].number} label="Salin Nomor Rekening" />
                        </div>
                    )}

                    {/* View: Address Detail */}
                    {view === "address" && (
                        <div className="space-y-6 animate-fade-in text-center">
                            <div className="relative flex items-center justify-center mb-4">
                                <h3 className="font-serif text-2xl text-[#512725] font-bold">Kirim ke Rumah</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={closeModal}
                                    className="absolute right-0 text-[#512725]/60 hover:bg-transparent"
                                >
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            <div className="bg-white/60 border border-[#512725]/20 rounded-3xl p-6 shadow-sm space-y-4">
                                <Home className="w-8 h-8 text-[#512725] mx-auto opacity-80" />
                                <div className="space-y-1">
                                    <p className="font-serif font-bold text-[#512725]">Alamat Lengkap:</p>
                                    <p className="font-sans text-sm text-[#512725]/80 leading-relaxed">
                                        Perumahan Griya Taman Sari 1 Blok A6,
                                        Mandungan, Kel. Srimartani,
                                        Kec. Piyungan, Kab. Bantul, D.I. Yogyakarta
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <CopyButton
                                    textToCopy="Perumahan Griya Taman Sari 1 Blok A6, Mandungan, Kel. Srimartani, Kec. Piyungan, Kab. Bantul, D.I. Yogyakarta"
                                    label="Salin Alamat"
                                />
                                <p className="font-serif text-sm italic text-[#512725]/60">
                                    “Terima kasih atas perhatian dan tanda kasih Anda.”
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

function CopyButton({ textToCopy, label }: { textToCopy: string, label: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            onClick={handleCopy}
            className={cn(
                "w-full h-12 rounded-full font-sans transition-all duration-300 shadow-md",
                copied ? "bg-green-700 text-white" : "bg-[#512725] text-white hover:bg-[#512725]/90"
            )}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 mr-2" /> Tersalin
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4 mr-2" /> {label}
                </>
            )}
        </Button>
    );
}
