import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    image?: {
        src: string;
        alt: string;
        height?: number;
    };
    title?: string;
    details?: Array<{
        icon?: React.ReactNode;
        text: string;
    }>;
    actions?: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

export function Card({
    image,
    title,
    details,
    actions,
    className,
    contentClassName,
    ...props
}: CardProps) {
    return (
        <div
            className={cn("bg-white rounded-lg overflow-hidden shadow-sm border", className)}
            {...props}
        >
            {image && (
                <div className="relative h-48">
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
            )}
            <div className={cn("p-4 space-y-4", contentClassName)}>
                {title && <h3 className="text-2xl font-semibold mb-2">{title}</h3>}

                {details && details.length > 0 && (
                    <div className="space-y-2 text-gray-600">
                        {details.map((detail, index) => (
                            <p key={index} className="flex items-center gap-2">
                                {detail.icon}
                                {detail.text}
                            </p>
                        ))}
                    </div>
                )}

                {actions && <div className="mt-4 flex gap-3">{actions}</div>}
            </div>
        </div>
    );
}
