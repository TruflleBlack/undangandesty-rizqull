"use client";

import React, { useState, useEffect } from "react";
import { Link2, ExternalLink, Copy, Check, MessageSquare } from "lucide-react";

export default function AdminPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [domain, setDomain] = useState("");
    const [copied, setCopied] = useState(false);

    // Get current domain on mount (client-side only)
    useEffect(() => {
        setDomain(window.location.origin);
    }, []);

    // 1. Generate Link
    // Format: {{domain}}/?to={{name}}
    // Encodes the name properly for URL
    const invitationLink = name
        ? `${domain}/?to=${encodeURIComponent(name.trim())}`
        : "";

    // 2. Normalize Phone Number
    // Converts 08xx -> 628xx, 8xx -> 628xx
    const getNormalizedPhone = (input: string) => {
        const clean = input.replace(/\D/g, ""); // Remove non-digits
        if (clean.startsWith("62")) return clean;
        if (clean.startsWith("08")) return "62" + clean.substring(1);
        if (clean.startsWith("8")) return "62" + clean;
        return clean;
    };

    // 3. Generate WhatsApp Link
    // Template with placeholders
    const generateWaLink = () => {
        const targetPhone = getNormalizedPhone(phone);
        if (!targetPhone || !name) return "#";

        const message = `Assalamu’alaikum Wr. Wb.

Yth. ${name.trim()},

Dengan penuh rasa syukur, kami mengundang
Bapak/Ibu/Saudara/i untuk menghadiri
acara pernikahan kami.

Silakan membuka undangan melalui tautan berikut:
${invitationLink}

Merupakan suatu kehormatan bagi kami
apabila berkenan hadir.

Terima kasih 🙏`;

        return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    };

    // Actions
    const handleCopy = () => {
        if (!invitationLink) return;
        navigator.clipboard.writeText(invitationLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="bg-slate-900 px-6 py-6 text-center">
                    <h1 className="text-xl font-bold text-white tracking-wide">
                        Admin Invitation Generator
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Create personalized links & messages
                    </p>
                </div>

                {/* Form */}
                <div className="p-6 space-y-6">
                    {/* Guest Name Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">
                            Guest Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Budi Santoso"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">
                            WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="e.g. 08123456789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                        />
                        <p className="text-xs text-slate-500">
                            Auto-formats to 628...
                        </p>
                    </div>

                    <div className="h-px bg-slate-100 my-4" />

                    {/* Result Section */}
                    {name && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">

                            {/* Generated Link Preview */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Invitation Link
                                    </span>
                                    <Link2 className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="text-sm text-slate-800 break-all font-mono bg-white p-2 rounded border border-slate-100">
                                    {invitationLink}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="w-full py-2 px-4 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-600" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span>Copy Link</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* WhatsApp Button */}
                            <div className="pt-2">
                                <a
                                    href={generateWaLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95 ${phone.length > 5
                                            ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                            : "bg-slate-300 cursor-not-allowed"
                                        }`}
                                    onClick={(e) => {
                                        if (phone.length <= 5) e.preventDefault();
                                    }}
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Send via WhatsApp
                                </a>
                                {!phone && (
                                    <p className="text-center text-xs text-slate-400 mt-2">
                                        Enter phone number to enable WhatsApp button
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
