export default function TaskSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl border bg-white p-6">
            <div className="h-4 w-2/3 rounded bg-gray-200" />
            <div className="mt-3 h-3 w-full rounded bg-gray-200" />
            <div className="mt-2 h-3 w-5/6 rounded bg-gray-200" />
        </div>
    );
}
