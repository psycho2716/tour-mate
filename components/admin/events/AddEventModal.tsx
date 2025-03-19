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

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EventFormData) => void;
}

interface EventFormData {
    name: string;
    description: string;
    date: string;
    status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
}

type EventFormState = {
    [K in keyof EventFormData]: {
        value: EventFormData[K];
        error: string | null;
        rules?: {
            required?: boolean;
        };
    };
};

const initialFormState: EventFormState = {
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
    date: {
        value: "",
        error: null,
        rules: { required: true }
    },
    status: {
        value: "Upcoming",
        error: null,
        rules: { required: true }
    }
};

export function AddEventModal({ isOpen, onClose, onSubmit }: AddEventModalProps) {
    const { formState, setFieldValue, validateForm, resetForm } =
        useForm<EventFormState>(initialFormState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                name: formState.name.value,
                description: formState.description.value,
                date: formState.date.value,
                status: formState.status.value
            });
            resetForm();
            onClose();
        }
    };

    return (
        <ModalForm isOpen={isOpen} onClose={onClose} title="Add New Event">
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
                    <Label htmlFor="date">Date</Label>
                    <Input
                        id="date"
                        type="date"
                        value={formState.date.value}
                        onChange={(e) => setFieldValue("date", e.target.value)}
                    />
                    {formState.date.error && (
                        <p className="text-sm text-red-500">{formState.date.error}</p>
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

                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Add Event</Button>
                </div>
            </form>
        </ModalForm>
    );
}
