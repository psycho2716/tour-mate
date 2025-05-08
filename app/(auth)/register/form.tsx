"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";

const specializations = [
    "Historical Tours",
    "Cultural Tours",
    "Adventure Tours",
    "Nature Tours",
    "Food Tours",
    "City Tours"
];

export function RegisterForm() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("tourist");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [languages, setLanguages] = useState("");
    const [certificate, setCertificate] = useState<File | null>(null);
    const [certificatePreview, setCertificatePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCertificate(file);
            const reader = new FileReader();
            reader.onloadend = () => setCertificatePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const userType = activeTab;
        // Basic validation
        if (!fullName || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (userType === "tour-guide") {
            if (!phoneNumber || !specialization || !languages) {
                setError("All tour guide fields are required");
                return;
            }
            if (!certificate) {
                setError("Training certificate is required");
                return;
            }
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // Simulate registration data
            const registrationData = {
                userType,
                fullName,
                email,
                password,
                ...(userType === "tour-guide"
                    ? {
                          phoneNumber,
                          specialization,
                          languages: languages.split(",").map((l) => l.trim()),
                          certificate
                      }
                    : {})
            };
            console.log("Registration attempt with:", registrationData);
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="tourist">Tourist</TabsTrigger>
                    <TabsTrigger value="tour-guide">Tour Guide</TabsTrigger>
                </TabsList>
                <TabsContent value="tourist">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                </TabsContent>
                <TabsContent value="tour-guide">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                placeholder="e.g. Juan Dela Cruz"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
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
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                placeholder="09123456789"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="specialization">Specialization</Label>
                            <Select value={specialization} onValueChange={setSpecialization}>
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
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="languages">Languages (comma separated)</Label>
                            <Input
                                id="languages"
                                placeholder="e.g. English, Tagalog"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="certificate">Training Certificate</Label>
                            {certificatePreview && (
                                <Image
                                    src={certificatePreview}
                                    alt="Certificate preview"
                                    className="w-20 h-auto rounded border mb-2"
                                    width={100}
                                    height={100}
                                />
                            )}
                            <Input
                                id="certificate"
                                type="file"
                                accept="image/*"
                                onChange={handleCertificateChange}
                                required
                            />
                        </div>
                        {error && <div className="text-sm text-red-500 col-span-2">{error}</div>}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white mt-2 col-span-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing up..." : "Sign up"}
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
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
