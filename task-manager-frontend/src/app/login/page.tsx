"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }


            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);


            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">

            <div className="hidden md:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-black/20 blur-3xl" />

                <div className="relative z-10 max-w-lg px-12">
                    <h1 className="text-5xl font-extrabold leading-tight mb-6">
                        Welcome Back
                    </h1>
                    <p className="text-lg text-white/90 leading-relaxed">
                        Manage your tasks beautifully, stay productive, and keep your life
                        organized all from one powerful workspace.
                    </p>
                </div>
            </div>


            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] p-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Sign in
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Welcome back please enter your details
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-white font-semibold
              shadow-lg shadow-indigo-500/30 hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]
              transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
