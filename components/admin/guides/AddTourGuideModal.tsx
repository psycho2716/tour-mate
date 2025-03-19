"use client";

import { useForm } from "@/hooks/use-form";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";
import { X } from "lucide-react";

interface AddTourGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TourGuideFormData) => void;
}

interface TourGuideFormData {
    name: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    languages: string[];
    image: File | null;
}

const initialFormState = {
    name: {
        value: "",
        error: null,
        rules: { required: true }
    },
    email: {
        value: "",
        error: null,
        rules: {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        }
    },
    phoneNumber: {
        value: "",
        error: null,
        rules: {
            required: true,
            pattern: /\d{11}$/
        }
    },
    specialization: {
        value: "",
        error: null,
        rules: { required: true }
    },
    languages: {
        value: [] as string[],
        error: null,
        rules: { required: true }
    },
    image: {
        value: null as File | null,
        error: null,
        rules: { required: true }
    }
};

const specializations = [
    "Historical Tours",
    "Cultural Tours",
    "Adventure Tours",
    "Nature Tours",
    "Food Tours",
    "City Tours"
];

const availableLanguages = [
    "English",
    "Tagalog",
    "Cebuano",
    "Ilocano",
    "Spanish",
    "Japanese",
    "Korean",
    "Mandarin"
];

export function AddTourGuideModal({ isOpen, onClose, onSubmit }: AddTourGuideModalProps) {
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const { formState, setFieldValue, validateForm, resetForm } =
        useForm<TourGuideFormData>(initialFormState);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFieldValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                name: formState.name.value,
                email: formState.email.value,
                phoneNumber: formState.phoneNumber.value,
                specialization: formState.specialization.value,
                languages: formState.languages.value,
                image: formState.image.value
            });
            resetForm();
            setImagePreview(null);
            toast.success("Tour guide added successfully");
            onClose();
        }
    };

    return (
        <ModalForm isOpen={isOpen} onClose={onClose} title="Add New Tour Guide">
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <div className="flex flex-col items-center gap-4">
                        {imagePreview ? (
                            <div className="relative w-24 sm:w-32 h-24 sm:h-32">
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <Image
                                        src={imagePreview}
                                        alt="Profile preview"
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="w-5 h-5 flex items-center justify-center absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFieldValue("image", null);
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                <span className="text-gray-500">No image</span>
                            </div>
                        )}
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                                id="image-upload"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imagePreview ? "Change Image" : "Upload Image"}
                            </Button>
                        </div>
                    </div>
                    {formState.image.error && (
                        <p className="text-sm text-red-500">{formState.image.error}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formState.name.value}
                            onChange={(e) => setFieldValue("name", e.target.value)}
                        />
                        {formState.name.error && (
                            <p className="text-sm text-red-500">{formState.name.error}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formState.email.value}
                            onChange={(e) => setFieldValue("email", e.target.value)}
                        />
                        {formState.email.error && (
                            <p className="text-sm text-red-500">{formState.email.error}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            placeholder="09123456789"
                            value={formState.phoneNumber.value}
                            onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
                        />
                        {formState.phoneNumber.error && (
                            <p className="text-sm text-red-500">{formState.phoneNumber.error}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Select
                            value={formState.specialization.value}
                            onValueChange={(value) => setFieldValue("specialization", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent>
                                {specializations.map((spec) => (
                                    <SelectItem key={spec} value={spec}>
                                        {spec}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formState.specialization.error && (
                            <p className="text-sm text-red-500">{formState.specialization.error}</p>
                        )}
                    </div>
                </div>

                <div className="relative space-y-2">
                    <Label htmlFor="languages">Languages</Label>
                    <Combobox
                        options={availableLanguages.map((language) => ({
                            value: language,
                            label: language
                        }))}
                        value={formState.languages.value}
                        onChange={(value) => setFieldValue("languages", value as string[])}
                        multiSelect
                        searchPlaceholder="Search for a language"
                        placeholder="Select languages"
                        emptyMessage="No languages found"
                        className="w-full"
                    />

                    {formState.languages.error && (
                        <p className="text-sm text-red-500">{formState.languages.error}</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="w-full sm:w-auto">
                        Add Tour Guide
                    </Button>
                </div>
            </form>
        </ModalForm>
    );
}
