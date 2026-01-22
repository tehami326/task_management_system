export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("accessToken"));
};
