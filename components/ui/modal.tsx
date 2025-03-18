"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    className,
    showCloseButton = true,
    size = "md"
}: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={cn(
                    sizeClasses[size],
                    "max-h-[90vh] md:max-h-screen flex flex-col",
                    className
                )}
            >
                {(title || description || showCloseButton) && (
                    <DialogHeader className="flex-shrink-0 flex flex-row items-center justify-between border-b border-border py-4">
                        <div>
                            {title && (
                                <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
                            )}
                            {description && (
                                <DialogDescription className="text-muted-foreground mt-1">
                                    {description}
                                </DialogDescription>
                            )}
                        </div>
                    </DialogHeader>
                )}
                <div className="flex-1 overflow-y-auto py-4">{children}</div>
            </DialogContent>
        </Dialog>
    );
}
