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

interface AddDestinationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DestinationFormData) => void;
}

interface DestinationFormData {
    name: string;
    description: string;
    location: string;
    category: string;
    status: "Active" | "Inactive" | "Under Maintenance";
}

type DestinationFormState = {
    [K in keyof DestinationFormData]: {
        value: DestinationFormData[K];
        error: string | null;
        rules?: {
            required?: boolean;
        };
    };
};

const initialFormState: DestinationFormState = {
    name: {
        value: "",
        error: null,
        rules: { required: true }
    },
    description: {
        value: "",
        error: null,
        rules: { required: true }
    },
    location: {
        value: "",
        error: null,
        rules: { required: true }
    },
    category: {
        value: "",
        error: null,
        rules: { required: true }
    },
    status: {
        value: "Active",
        error: null,
        rules: { required: true }
    }
};

const categories = [
    "Beach",
    "Mountain",
    "Historical",
    "Cultural",
    "Nature",
    "Adventure",
    "Religious",
    "Urban"
];

export function AddDestinationModal({ isOpen, onClose, onSubmit }: AddDestinationModalProps) {
    const { formState, setFieldValue, validateForm, resetForm } =
        useForm<DestinationFormState>(initialFormState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                name: formState.name.value,
                description: formState.description.value,
                location: formState.location.value,
                category: formState.category.value,
                status: formState.status.value as DestinationFormData["status"]
            });
            resetForm();
            onClose();
        }
    };

    return (
        <ModalForm isOpen={isOpen} onClose={onClose} title="Add New Destination">
            <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                        value={formState.status.value}
                        onValueChange={(value) => setFieldValue("status", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                        </SelectContent>
                    </Select>
                    {formState.status.error && (
                        <p className="text-sm text-red-500">{formState.status.error}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Add Destination</Button>
                </div>
            </form>
        </ModalForm>
    );
}
