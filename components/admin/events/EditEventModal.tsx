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
import { Event, EventStatus, categories } from "@/data/events";
import { toast } from "sonner";

interface EditEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, data: Omit<Event, "id" | "imgUrl">) => void;
    event: Event;
}

export function EditEventModal({ isOpen, onClose, onSubmit, event }: EditEventModalProps) {
    const [imagePreview, setImagePreview] = React.useState<string>(event.imgUrl);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const initialFormState = {
        title: {
            value: event.title,
            error: null,
            rules: { required: true }
        },
        description: {
            value: event.description,
            error: null,
            rules: { required: true }
        },
        date: {
            value: (() => {
                const d = new Date(event.date);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                    d.getDate()
                ).padStart(2, "0")}`;
            })(),
            error: null,
            rules: { required: true }
        },
        category: {
            value: event.category,
            error: null,
            rules: { required: true }
        },
        location: {
            value: event.location,
            error: null,
            rules: { required: true }
        },
        status: {
            value: event.status,
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
            onSubmit(event.id, {
                title: formState.title.value,
                description: formState.description.value,
                date: formState.date.value,
                category: formState.category.value,
                location: formState.location.value,
                status: formState.status.value
            });
            resetForm();
            setImagePreview(event.imgUrl);
            onClose();
            toast.success("Event updated successfully");
        }
    };

    return (
        <ModalForm isOpen={isOpen} onClose={onClose} title="Edit Event">
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="space-y-2">
                    <Label>Event Image</Label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full h-36 sm:h-48 rounded-md ${
                            !imagePreview ? "border-2" : ""
                        } border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden relative flex items-center justify-center`}
                    >
                        {imagePreview ? (
                            <>
                                <Image
                                    src={imagePreview}
                                    alt="Event preview"
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
                                            setImagePreview(event.imgUrl);
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
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={formState.title.value}
                        onChange={(e) => setFieldValue("title", e.target.value)}
                    />
                    {formState.title.error && (
                        <p className="text-sm text-red-500">{formState.title.error}</p>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={formState.date.value}
                            onChange={(e) => setFieldValue("date", e.target.value)}
                            className="w-full px-3 py-2"
                            onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                        />
                        {formState.date.error && (
                            <p className="text-sm text-red-500">{formState.date.error}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formState.category.value}
                            onValueChange={(value) => setFieldValue("category", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={formState.status.value}
                            onValueChange={(value) => setFieldValue("status", value as EventStatus)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Upcoming">Upcoming</SelectItem>
                                <SelectItem value="Ongoing">Ongoing</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        {formState.status.error && (
                            <p className="text-sm text-red-500">{formState.status.error}</p>
                        )}
                    </div>
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
                        Update Event
                    </Button>
                </div>
            </form>
        </ModalForm>
    );
}
