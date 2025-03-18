"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group fixed top-4 right-4 z-40"
            position="bottom-right"
            richColors
            toastOptions={{
                classNames: {
                    toast: "group toast flex items-center gap-4 rounded-xl p-4 shadow-xl transition-transform duration-300 ease-in-out group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
                    description: "group-[.toast]:text-muted-foreground text-sm",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground px-3 py-1.5 rounded-lg hover:bg-muted/80 transition"
                },
                duration: 4000,
                closeButton: false
            }}
            {...props}
        />
    );
};

export { Toaster };
