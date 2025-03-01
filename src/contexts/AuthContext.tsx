import { createContext, Dispatch, FormEvent, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import axiosBase from "../axios/axiosBase";

type AuthContextType = {
    loadingAuth: boolean;
    setLoadingAuth: Dispatch<SetStateAction<boolean>>;
    isAuth: boolean;
    handleLogin: (ev: FormEvent<HTMLFormElement>, formData: { email: string; password: string }) => void;
    handleLogout: () => void;
    getUserData: () => { email: string; name: string; id: number } | null;
};

const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem("event-io-userData")));

    async function handleLogin(ev: FormEvent<HTMLFormElement>, formData: { email: string; password: string }) {
        ev.preventDefault();

        setLoadingAuth(true);

        await axiosBase.post("/auth", formData).then((res) => {
            if (res.status === 200) {
                console.log(res);
                localStorage.setItem(
                    "event-io-userData",
                    JSON.stringify({ name: res.data.user.name, email: res.data.user.email, id: res.data.user.id })
                );
                setIsAuth(true);
            }
        });

        setLoadingAuth(false);
    }

    async function handleLogout() {
        await axiosBase.post("/auth/logout").then(() => {
            localStorage.removeItem("event-io-userData");
            setIsAuth(false);
        });
    }

    function getUserData() {
        return JSON.parse("event-io-userData") ?? null;
    }

    useEffect(() => {
        async function checkAuthStatus() {
            await axiosBase("/auth/status")
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("event-io-userData", JSON.stringify({ name: res.data.name, email: res.data.email, id: res.data.id }));
                    }
                })
                .catch((e) => {
                    if (e.response.status === 401) {
                        localStorage.removeItem("event-io-userData");
                    }
                });
        }

        checkAuthStatus();
    }, []);

    return <AuthContext.Provider value={{ loadingAuth, setLoadingAuth, isAuth, handleLogin, handleLogout, getUserData }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
