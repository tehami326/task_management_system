const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "API error");
    }

    return res.json();
};
