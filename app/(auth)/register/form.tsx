"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function RegisterForm() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!fullName || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        // Simulate registration process
        setTimeout(() => {
            setIsLoading(false);

            // In a real app, you would handle user registration here
            console.log("Registration attempt with:", { fullName, email, password });

            // Show success message
            toast.success("Registration successful", {
                description: "Your account has been created. Redirecting to login..."
            });

            router.push("/login");
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create an account</h1>
                <p className="text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        placeholder="e.g. Juan Dela Cruz"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}

                <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white mt-2"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing up..." : "Sign up"}
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
