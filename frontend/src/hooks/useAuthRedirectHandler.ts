import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const pathname = window.location.pathname;

        if (pathname === "/reset-password") return;

        if (hash.includes("access_token")) {
            navigate(`/auth/callback${hash}`);
        }
    }, [navigate]);
}
