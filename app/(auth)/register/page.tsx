import Image from "next/image";
import { RegisterForm } from "./form";

export default function RegisterPage() {
    return (
        <div className="flex" style={{ height: "calc(100vh - 65px)" }}>
            {/* Left side - Image with quote */}
            <div className="relative hidden md:block md:w-1/2 lg:w-3/5">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/auth-bg.jpg"
                        alt="Beach sunset"
                        className="object-cover"
                        fill
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-12 z-10">
                    <div className="max-w-xl">
                        <blockquote className="text-white text-lg md:text-xl font-playfair italic font-light leading-relaxed">
                            &quot;Join our community of travelers and experience the world in a
                            whole new way with ai-powered recommendations.&quot;
                        </blockquote>
                        <div className="flex items-center mt-6">
                            <div className="flex items-center gap-2">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width="24" height="24" className="fill-white" />
                                    <path
                                        d="M7 8h10M7 12h10M7 16h10"
                                        className="stroke-black"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                                <span className="font-oleo text-xl text-white">TourMate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Registration form */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
