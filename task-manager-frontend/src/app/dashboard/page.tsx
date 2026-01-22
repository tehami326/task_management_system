"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TaskCard from "@/components/tasks/TaskCard";
import EmptyState from "@/components/tasks/EmptyState";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import TaskSkeleton from "@/components/tasks/TaskSkeleton";
import { apiFetch } from "@/lib/api";

interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // FETCH TASKS
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await apiFetch("/tasks");
                setTasks(data.tasks ?? data);
            } catch (error: any) {
                toast.error("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // CREATE TASK
    const handleCreate = async (
        title: string,
        description?: string
    ) => {
        try {
            const newTask = await apiFetch("/tasks", {
                method: "POST",
                body: JSON.stringify({ title, description }),
            });

            setTasks((prev) => [newTask, ...prev]);
            toast.success("Task created");
            setShowModal(false);
        } catch {
            toast.error("Failed to create task");
        }
    };

    // TOGGLE TASK
    const handleToggle = async (id: string) => {
        try {
            const updated = await apiFetch(`/tasks/${id}/toggle`, {
                method: "PATCH",
            });

            setTasks((prev) =>
                prev.map((t) => (t.id === id ? updated : t))
            );
            toast.success("Task updated");
        } catch {
            toast.error("Failed to update task");
        }
    };

    // DELETE TASK
    const handleDelete = async (id: string) => {
        try {
            await apiFetch(`/tasks/${id}`, {
                method: "DELETE",
            });

            setTasks((prev) => prev.filter((t) => t.id !== id));
            toast.success("Task deleted");
        } catch {
            toast.error("Failed to delete task");
        }
    };

    return (
        <div>
            {/* HEADER */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Your Tasks ✨
                    </h2>
                    <p className="text-sm text-gray-500">
                        Stay productive and keep things moving
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-[1.03] transition"
                >
                    + New Task
                </button>
            </div>

            {/* CONTENT */}
            {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <TaskSkeleton key={i} />
                    ))}
                </div>
            ) : tasks.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            title={task.title}
                            description={task.description}
                            completed={task.completed}
                            onToggle={() => handleToggle(task.id)}
                            onDelete={() => handleDelete(task.id)}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <CreateTaskModal
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreate}
                />
            )}
        </div>
    );
}
