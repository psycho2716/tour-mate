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
import { X } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { TourGuide } from "@/data/tour-guides";

interface EditTourGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, data: Omit<TourGuide, "id" | "rating">) => void;
    tourGuide: TourGuide;
}

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

export function EditTourGuideModal({
    isOpen,
    onClose,
    onSubmit,
    tourGuide
}: EditTourGuideModalProps) {
    const [imagePreview, setImagePreview] = React.useState<string>(tourGuide.avatar);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const initialFormState = {
        name: {
            value: tourGuide.name,
            error: null,
            rules: { required: true }
        },
        email: {
            value: tourGuide.email,
            error: null,
            rules: {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }
        },
        phoneNumber: {
            value: tourGuide.phoneNumber,
            error: null,
            rules: {
                required: true,
                pattern: /\d{11}$/
            }
        },
        specialization: {
            value: tourGuide.specialization,
            error: null,
            rules: { required: true }
        },
        languages: {
            value: tourGuide.languages,
            error: null,
            rules: { required: true }
        },
        avatar: {
            value: tourGuide.avatar,
            error: null,
            rules: { required: true }
        }
    };

    const { formState, setFieldValue, validateForm, resetForm } = useForm(initialFormState);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setImagePreview(imageUrl);
                setFieldValue("avatar", imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(tourGuide.id, {
                name: formState.name.value,
                email: formState.email.value,
                phoneNumber: formState.phoneNumber.value,
                specialization: formState.specialization.value,
                languages: formState.languages.value,
                avatar: formState.avatar.value
            });
            // toast.success("Tour guide updated successfully");
            resetForm();
            onClose();
        }
    };

    return (
        <ModalForm isOpen={isOpen} onClose={onClose} title="Edit Tour Guide">
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-24 sm:w-32 h-24 sm:h-32">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src={imagePreview || tourGuide.avatar}
                                    alt={`${tourGuide.name}'s profile`}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                            {imagePreview && imagePreview !== tourGuide.avatar && (
                                <button
                                    type="button"
                                    className="w-5 h-5 flex items-center justify-center absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    onClick={() => {
                                        setImagePreview(tourGuide.avatar);
                                        setFieldValue("avatar", tourGuide.avatar);
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
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
                                Change Image
                            </Button>
                        </div>
                    </div>
                    {formState.avatar.error && (
                        <p className="text-sm text-red-500">{formState.avatar.error}</p>
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
                            placeholder="(63) 9123456789"
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
                        defaultValue={tourGuide.languages}
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
                        Update Tour Guide
                    </Button>
                </div>
            </form>
        </ModalForm>
    );
}
