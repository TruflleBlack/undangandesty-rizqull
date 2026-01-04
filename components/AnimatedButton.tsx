import { Button } from "@/components/ui/Button";

interface AnimatedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function AnimatedButton({ children, onClick }: AnimatedButtonProps) {
    return (
        <Button onClick={onClick} className="animate-pulse">
            {children}
        </Button>
    );
}
