export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <div className="mb-4 text-5xl">📝</div>
            <h3 className="text-xl font-semibold text-gray-800">
                No tasks yet
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-sm">
                You’re all clear for now. Create your first task and start building momentum.
            </p>
        </div>
    );
}
