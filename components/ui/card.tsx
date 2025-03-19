import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
    )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

export function CardComponent({
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
