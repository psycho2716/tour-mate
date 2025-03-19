"use client";

import { useForm } from "@/hooks/use-form";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { CloudUpload, X } from "lucide-react";
import React from "react";
import { Destination, destinationCategories, DestinationCategory } from "@/data/destinations";
import { toast } from "sonner";
import tourGuides from "@/data/tour-guides";
import { Combobox } from "@/components/ui/combobox";

interface EditDestinationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, data: Omit<Destination, "id" | "imgUrl">) => void;
    destination: Destination;
}

const convertTimeToInputFormat = (timeStr: string) => {
    try {
        const [time, period] = timeStr.split(" ");
        const [hours, minutes] = time.split(":");
        let hour = parseInt(hours);

        if (period?.toLowerCase() === "pm" && hour !== 12) {
            hour += 12;
        } else if (period?.toLowerCase() === "am" && hour === 12) {
            hour = 0;
        }

        return `${hour.toString().padStart(2, "0")}:${minutes}`;
    } catch {
        return "";
    }
};

export function EditDestinationModal({
    isOpen,
    onClose,
    onSubmit,
    destination
}: EditDestinationModalProps) {
    const [imagePreview, setImagePreview] = React.useState<string>(destination.imgUrl);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedGuides, setSelectedGuides] = React.useState<string[]>(
        destination.guides.map((guide) => guide.id)
    );

    const initialFormState = {
        name: {
            value: destination.name,
            error: null,
            rules: { required: true }
        },
        description: {
            value: destination.description,
            error: null,
            rules: { required: true }
        },
        location: {
            value: destination.location,
            error: null,
            rules: { required: true }
        },
        category: {
            value: destination.category,
            error: null,
            rules: { required: true }
        },
        openingHours: {
            value: convertTimeToInputFormat(destination.openingHours),
            error: null,
            rules: { required: true }
        },
        closingHours: {
            value: convertTimeToInputFormat(destination.closingHours),
            error: null,
            rules: { required: true }
        },
        guides: {
            value: destination.guides,
            error: null,
            rules: { required: true }
        },
        keywords: {
            value: destination.keywords.join(", "),
            error: null,
            rules: { required: true }
        },
        image: {
            value: null as File | null,
            error: null,
            rules: { required: false }
        }
    };

    const { formState, setFieldValue, validateForm, resetForm } = useForm(initialFormState);

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
            onSubmit(destination.id, {
                name: formState.name.value,
                description: formState.description.value,
                location: formState.location.value,
                category: formState.category.value as DestinationCategory,
                openingHours: formState.openingHours.value,
                closingHours: formState.closingHours.value,
                guides: formState.guides.value,
                keywords: formState.keywords.value.split(",").map((f) => f.trim()),
                coordinates: destination.coordinates
            });
            resetForm();
            setImagePreview(destination.imgUrl);
            onClose();
            toast.success("Destination updated successfully");
        }
    };

    return (
        <ModalForm isOpen={isOpen} onClose={onClose} title="Edit Destination">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                    <Label>Destination Image</Label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full h-32 rounded-md ${
                            !imagePreview ? "border-2" : ""
                        } border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden relative flex items-center justify-center`}
                    >
                        {imagePreview ? (
                            <>
                                <Image
                                    src={imagePreview}
                                    alt="Destination preview"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                                {formState.image.value && (
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImagePreview(destination.imgUrl);
                                            setFieldValue("image", null);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = "";
                                            }
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <CloudUpload className="h-12 w-12 text-gray-400" />
                                <div className="mt-2 flex text-sm text-gray-600">
                                    <span className="relative rounded-md font-medium text-primary hover:text-primary/80">
                                        Upload Image
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            id="image-upload"
                        />
                    </div>
                    {formState.image.error && (
                        <p className="text-sm text-red-500">{formState.image.error}</p>
                    )}
                </div>

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
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={formState.description.value}
                        onChange={(e) => setFieldValue("description", e.target.value)}
                    />
                    {formState.description.error && (
                        <p className="text-sm text-red-500">{formState.description.error}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={formState.location.value}
                            onChange={(e) => setFieldValue("location", e.target.value)}
                        />
                        {formState.location.error && (
                            <p className="text-sm text-red-500">{formState.location.error}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            value={formState.category.value}
                            onValueChange={(value: DestinationCategory) =>
                                setFieldValue("category", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {destinationCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formState.category.error && (
                            <p className="text-sm text-red-500">{formState.category.error}</p>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="workingHours">Working Hours</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="openingHours" className="text-xs text-gray-500">
                                From
                            </Label>
                            <Input
                                id="openingHours"
                                type="time"
                                value={formState.openingHours.value}
                                onChange={(e) => setFieldValue("openingHours", e.target.value)}
                                className="cursor-pointer"
                                onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
                                onKeyDown={(e) => e.preventDefault()}
                            />
                            {formState.openingHours.error && (
                                <p className="text-sm text-red-500">
                                    {formState.openingHours.error}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="closingHours" className="text-xs text-gray-500">
                                To
                            </Label>
                            <Input
                                id="closingHours"
                                type="time"
                                value={formState.closingHours.value}
                                onChange={(e) => setFieldValue("closingHours", e.target.value)}
                                className="cursor-pointer"
                                onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker()}
                                onKeyDown={(e) => e.preventDefault()}
                            />

                            {formState.closingHours.error && (
                                <p className="text-sm text-red-500">
                                    {formState.closingHours.error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <Label htmlFor="guides">Tour Guides</Label>
                    <Combobox
                        options={tourGuides.map((guide) => ({
                            value: guide.id,
                            label: guide.name
                        }))}
                        value={selectedGuides}
                        onChange={(value: string | string[]) => {
                            const guides = Array.isArray(value) ? value : [value];
                            setSelectedGuides(guides);
                            setFieldValue(
                                "guides",
                                guides.map((guideId) => {
                                    const guide = tourGuides.find((g) => g.id === guideId);
                                    return {
                                        id: guideId,
                                        name: guide?.name || "",
                                        value: guideId,
                                        label: guide?.name || ""
                                    };
                                })
                            );
                        }}
                        multiSelect
                        searchPlaceholder="Search for a guide"
                        placeholder="Select guides"
                        emptyMessage="No guides found"
                        className="w-full"
                    />

                    {formState.guides.error && (
                        <p className="text-sm text-red-500">{formState.guides.error}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="features">Features (comma-separated)</Label>
                    <Input
                        id="keywords"
                        value={formState.keywords.value}
                        onChange={(e) => setFieldValue("keywords", e.target.value)}
                        placeholder="e.g., Swimming, Snorkeling, Beach Camping"
                    />
                    {formState.keywords.error && (
                        <p className="text-sm text-red-500">{formState.keywords.error}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Update Destination</Button>
                </div>
            </form>
        </ModalForm>
    );
}
