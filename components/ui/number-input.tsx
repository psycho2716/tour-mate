"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
}

export function NumberInput({
    className,
    min = 1,
    max = 20,
    value,
    onChange,
    ...props
}: NumberInputProps) {
    const [inputValue, setInputValue] = useState<number>(typeof value === "number" ? value : min);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setInputValue(newValue);
            onChange?.(newValue);
        }
    };

    const increment = () => {
        if (inputValue < max) {
            const newValue = inputValue + 1;
            setInputValue(newValue);
            onChange?.(newValue);
        }
    };

    const decrement = () => {
        if (inputValue > min) {
            const newValue = inputValue - 1;
            setInputValue(newValue);
            onChange?.(newValue);
        }
    };

    return (
        <div className="relative">
            <Input
                type="number"
                value={inputValue}
                onChange={handleChange}
                className={cn(
                    "pr-8 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                    className
                )}
                min={min}
                max={max}
                {...props}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                <button
                    type="button"
                    onClick={increment}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    tabIndex={-1}
                >
                    <ChevronUp className="h-3 w-3" />
                </button>
                <button
                    type="button"
                    onClick={decrement}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    tabIndex={-1}
                >
                    <ChevronDown className="h-3 w-3" />
                </button>
            </div>
        </div>
    );
}
