import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface MultiSelectProps {
    value: string[];
    onValueChange: (value: string[]) => void;
    options: string[];
    placeholder?: string;
}

export function MultiSelect({
    value,
    onValueChange,
    options,
    placeholder = "Select options"
}: MultiSelectProps) {
    const handleValueChange = (newValue: string) => {
        const currentValues = value;
        const newValues = currentValues.includes(newValue)
            ? currentValues.filter((v) => v !== newValue)
            : [...currentValues, newValue];
        onValueChange(newValues);
    };

    return (
        <Select value={value[value.length - 1] || ""} onValueChange={handleValueChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder}>
                    {value.length > 0 ? `${value.length} selected` : placeholder}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={value.includes(option)}
                                className="h-4 w-4"
                                readOnly
                            />
                            {option}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
