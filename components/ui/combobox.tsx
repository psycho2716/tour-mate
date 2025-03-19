"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type ComboboxOption = {
    value: string;
    label: string;
};

type ComboboxProps = {
    options: ComboboxOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    multiSelect?: boolean;
    value?: string | string[];
    defaultValue?: string | string[];
    onChange: (value: string | string[]) => void;
    className?: string;
    disabled?: boolean;
};

export function Combobox({
    options,
    placeholder = "Select option...",
    searchPlaceholder = "Search...",
    emptyMessage = "No option found.",
    multiSelect = false,
    value,
    defaultValue,
    onChange,
    className,
    disabled = false
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    // Initialize internal state with defaultValue if value is not provided
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
        value !== undefined
            ? value
            : defaultValue !== undefined
            ? defaultValue
            : multiSelect
            ? []
            : ""
    );

    // Update internal state when value prop changes
    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);

    // Use either controlled value or internal state
    const currentValue = value !== undefined ? value : internalValue;

    // Convert single string value to array for consistent internal handling
    const selectedValues = React.useMemo(
        () => (Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : []),
        [currentValue]
    );

    // Get display text for the trigger button
    const displayValue = React.useMemo(() => {
        if (selectedValues.length === 0) return placeholder;

        if (!multiSelect) {
            const selected = options.find((option) => option.value === selectedValues[0]);
            return selected?.label || placeholder;
        }

        return `${selectedValues.length} selected`;
    }, [selectedValues, options, placeholder, multiSelect]);

    // Handle selection of an item
    const handleSelect = React.useCallback(
        (optionValue: string) => {
            let newValue: string | string[];

            if (!multiSelect) {
                newValue = optionValue === selectedValues[0] ? "" : optionValue;
                setOpen(false);
            } else {
                // For multi-select, toggle the selection
                newValue = selectedValues.includes(optionValue)
                    ? selectedValues.filter((v) => v !== optionValue)
                    : [...selectedValues, optionValue];
            }

            // Update internal state if uncontrolled
            if (value === undefined) {
                setInternalValue(newValue);
            }

            // Call onChange handler
            onChange(newValue);
        },
        [multiSelect, onChange, selectedValues, value]
    );

    // Remove a selected item (for multi-select badges)
    const handleRemove = React.useCallback(
        (optionValue: string, e?: React.MouseEvent | React.KeyboardEvent) => {
            e?.preventDefault();
            e?.stopPropagation();

            if (multiSelect) {
                const newValues = selectedValues.filter((v) => v !== optionValue);

                // Update internal state if uncontrolled
                if (value === undefined) {
                    setInternalValue(newValues);
                }

                onChange(newValues);
            }
        },
        [multiSelect, onChange, selectedValues, value]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "w-full justify-between",
                        "data-[state=open]:bg-accent",
                        className
                    )}
                >
                    {multiSelect && selectedValues.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-[90%] overflow-hidden">
                            {selectedValues.slice(0, 3).map((selectedValue) => {
                                const option = options.find((o) => o.value === selectedValue);
                                return option ? (
                                    <Badge
                                        key={selectedValue}
                                        variant="secondary"
                                        className="mr-1 px-1.5 py-0"
                                    >
                                        {option.label}
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onClick={(e) => handleRemove(selectedValue, e)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    handleRemove(selectedValue, e);
                                                }
                                            }}
                                        >
                                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                        </div>
                                    </Badge>
                                ) : null;
                            })}
                            {selectedValues.length > 3 && (
                                <Badge variant="secondary" className="px-1.5 py-0">
                                    +{selectedValues.length - 3} more
                                </Badge>
                            )}
                        </div>
                    ) : (
                        <span className="truncate">{displayValue}</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0"
                align="start"
                sideOffset={4}
                style={{ width: "var(--radix-popover-trigger-width)" }}
            >
                {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Command className="w-full">
                    <CommandInput
                        // eslint-disable @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        placeholder={searchPlaceholder}
                        className="h-9 border-none focus-visible:ring-0"
                    />
                    {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <CommandList>
                        {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <CommandGroup>
                            {options.map((option) => (
                                // eslint-disable @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={handleSelect}
                                >
                                    <div className="flex items-center">
                                        <span
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                                                selectedValues.includes(option.value)
                                                    ? "bg-primary border-primary text-primary-foreground"
                                                    : "opacity-50"
                                            )}
                                        >
                                            {selectedValues.includes(option.value) && (
                                                <Check className="h-3 w-3" />
                                            )}
                                        </span>
                                        {option.label}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
