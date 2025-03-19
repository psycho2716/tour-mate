import { useState, useCallback } from "react";

export interface ValidationRule<T> {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    validate?: (value: T) => boolean | string;
}

export interface FormField<T> {
    value: T;
    error: string | null;
    rules?: ValidationRule<T>;
}

export type FormState<T> = {
    [K in keyof T]: FormField<T[K]>;
};

export function useForm<T>(initialState: FormState<T>) {
    const [formState, setFormState] = useState<FormState<T>>(initialState);

    const validateField = useCallback(
        <K extends keyof T>(name: K, value: T[K], rules?: ValidationRule<T[K]>) => {
            if (!rules) return null;

            if (rules.required && !value) {
                return "This field is required";
            }

            if (rules.pattern && !rules.pattern.test(String(value))) {
                return "Invalid format";
            }

            if (rules.minLength && String(value).length < rules.minLength) {
                return `Minimum length is ${rules.minLength}`;
            }

            if (rules.maxLength && String(value).length > rules.maxLength) {
                return `Maximum length is ${rules.maxLength}`;
            }

            if (rules.validate) {
                const result = rules.validate(value);
                if (typeof result === "string") return result;
                if (!result) return "Invalid value";
            }

            return null;
        },
        []
    );

    const setFieldValue = useCallback(
        <K extends keyof T>(name: K, value: T[K]) => {
            setFormState((prev) => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    value,
                    error: validateField(name, value, prev[name].rules)
                }
            }));
        },
        [validateField]
    );

    const validateForm = useCallback(() => {
        let isValid = true;
        const newState = { ...formState };

        (Object.keys(formState) as Array<keyof T>).forEach((key) => {
            const field = formState[key];
            const error = validateField(key, field.value, field.rules);
            newState[key] = { ...field, error };
            if (error) isValid = false;
        });

        setFormState(newState);
        return isValid;
    }, [formState, validateField]);

    const resetForm = useCallback(() => {
        setFormState(initialState);
    }, [initialState]);

    return {
        formState,
        setFieldValue,
        validateForm,
        resetForm
    };
}
