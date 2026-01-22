"use client";

interface TaskCardProps {
    title: string;
    description?: string;
    completed?: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

export default function TaskCard({
    title,
    description,
    completed = false,
    onToggle,
    onDelete,
}: TaskCardProps) {
    return (
        <div
            className={`group relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl ${completed ? "border-green-300 bg-green-50/40" : "border-gray-200"
                }`}
        >
            {/* Status dot */}
            <span
                className={`absolute top-4 right-4 h-3 w-3 rounded-full ${completed ? "bg-green-500" : "bg-gray-300"
                    }`}
            />

            <h3
                className={`text-lg font-semibold ${completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}
            >
                {title}
            </h3>

            {description && (
                <p
                    className={`mt-2 text-sm ${completed ? "text-gray-400" : "text-gray-600"
                        }`}
                >
                    {description}
                </p>
            )}

            {/* Actions */}
            <div className="mt-4 flex gap-3 opacity-0 transition group-hover:opacity-100">
                <button
                    onClick={onToggle}
                    className="rounded-lg bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-100"
                >
                    Toggle
                </button>

                <button
                    onClick={onDelete}
                    className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
