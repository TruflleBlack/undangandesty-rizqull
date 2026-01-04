import { Suspense } from "react";
import InvitationContent from "./InvitationContent";

export const dynamic = "force-dynamic";

export default function InvitationPage() {
    return (
        <Suspense fallback={<div className="h-[100svh] w-full bg-slate-950 flex items-center justify-center text-white/50 font-serif animate-pulse">Loading Invitation...</div>}>
            <InvitationContent />
        </Suspense>
    );
}
