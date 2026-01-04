"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
    isPlaying: boolean;
    toggle: () => void;
    play: () => void;
    pause: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Ensure volume is set
        if (audioRef.current) {
            audioRef.current.volume = 0.6;
        }
    }, []);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((err) => {
                console.error("Audio playback failed:", err);
            });
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggle = () => {
        if (isPlaying) pause();
        else play();
    };

    return (
        <AudioContext.Provider value={{ isPlaying, toggle, play, pause }}>
            <audio
                ref={audioRef}
                src="/assets/audio/music.mp3"
                loop
                preload="auto"
                onError={(e) => console.error("Audio Error:", e.currentTarget.error)}
            />
            {children}
        </AudioContext.Provider>
    );


}
