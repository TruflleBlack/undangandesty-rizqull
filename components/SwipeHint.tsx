import { ChevronsRight } from "lucide-react";

export default function SwipeHint() {
    return (
        <div className="absolute bottom-24 right-6 z-50 flex items-center space-x-2 animate-pulse text-primary/60">
            <span className="text-[0.6rem] uppercase tracking-widest font-sans">Geser</span>
            <ChevronsRight className="w-5 h-5" />
        </div>
    );
}
