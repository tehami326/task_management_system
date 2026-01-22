"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg hidden md:block">
                <div className="p-6 text-xl font-bold text-indigo-600">
                    TaskManager
                </div>

                <nav className="px-4 space-y-2">
                    <div className="rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 font-medium">
                        Dashboard
                    </div>
                    <div className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Tasks
                    </div>
                    <div className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Settings
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white shadow flex items-center justify-between px-6">
                    <h1 className="text-lg font-semibold text-gray-800">
                        Dashboard
                    </h1>

                    <button
                        onClick={() => {
                            localStorage.clear();
                            router.push("/login");
                        }}
                        className="text-sm text-red-600 hover:underline"
                    >
                        Logout
                    </button>
                </header>

                {/* Page */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
