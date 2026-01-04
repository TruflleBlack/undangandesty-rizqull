import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    fullHeight?: boolean;
}

export default function Container({
    children,
    className,
    fullHeight = false,
    ...props
}: ContainerProps) {
    return (
        <section
            className={cn(
                "w-full px-6 py-8 relative",
                fullHeight && "min-h-full flex flex-col justify-center",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}
