"use client";

import { useState } from "react";

interface Props {
    onClose: () => void;
    onCreate: (title: string, description?: string) => void;
}

export default function CreateTaskModal({
    onClose,
    onCreate,
}: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    New Task
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    What do you want to get done?
                </p>

                <div className="space-y-4">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
            focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm
            focus:ring-2 focus:ring-indigo-500/30 focus:outline-none resize-none"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-xl px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            if (!title.trim()) return;
                            onCreate(title, description);
                        }}
                        className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5
            text-sm font-semibold text-white shadow-lg hover:scale-[1.03] transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
