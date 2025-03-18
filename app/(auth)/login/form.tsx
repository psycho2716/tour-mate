"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { users } from "@/data/mockData";

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);

            // Simple validation for demo purposes
            if (email.trim() === "" || password.trim() === "") {
                setError("Please enter both email and password");
                return;
            }

            const user = users.find((user) => user.email === email);

            if (!user) {
                setError("Invalid email or password");
                toast.error("Invalid email or password");
                return;
            }

            if (user.password !== password) {
                setError("Invalid email or password");
                toast.error("Invalid email or password");
                return;
            }

            if (user.type === "tourist") {
                router.push("/home");
            } else if (user.type === "tour-guide") {
                router.push("/tour-guide");
            } else if (user.type === "admin") {
                router.push("/admin");
            }

            // Show success message
            toast.success("Login successful!", {
                description: "Redirecting to dashboard..."
            });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back! 👋</h1>
                <p className="text-muted-foreground">
                    Enter your credentials to access your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

                {error && <div className="text-sm text-red-500">{error}</div>}

                <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log In"}
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
