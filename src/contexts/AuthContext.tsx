import { createContext, Dispatch, FormEvent, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import axiosBase from "../axios/axiosBase";
import { useAlertContext } from "./AlertContext";

type AuthContextType = {
    loadingAuth: boolean;
    setLoadingAuth: Dispatch<SetStateAction<boolean>>;
    isAuth: boolean;
    handleLogin: (ev: FormEvent<HTMLFormElement>, formData: { email: string; password: string }) => Promise<boolean>;
    handleSignUp: (ev: FormEvent<HTMLFormElement>, formData: { email: string; password: string }) => Promise<boolean>;
    handleDeleteAccount: () => Promise<void>;
    handleLogout: () => void;
    getUserData: () => { email: string; name: string; id: number } | null;
};

const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [isAuth, setIsAuth] = useState(Boolean(localStorage.getItem("event-io-userData")));
    const { openAlert } = useAlertContext();

    async function handleLogin(ev: FormEvent<HTMLFormElement>, formData: { email: string; password: string }) {
        ev.preventDefault();

        setLoadingAuth(true);

        const result = await axiosBase
            .post("/auth", formData)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    localStorage.setItem(
                        "event-io-userData",
                        JSON.stringify({ name: res.data.user.name, email: res.data.user.email, id: res.data.user.id })
                    );
                    setIsAuth(true);

                    return true;
                }

                return false
            })
            .catch((e) => {
                setLoadingAuth(false);
                openAlert({
                    title: "Error",
                    message: e.response.data.message,
                    severity: "error"
                })
                return false;
            });

        return result;
    }

    async function handleSignUp(ev: FormEvent<HTMLFormElement>, formData: { email: string; password: string }) {
        ev.preventDefault();

        setLoadingAuth(true);

        const result = await axiosBase
            .post("/user", formData)
            .then(async (res) => {
                const result = await axiosBase
                    .post("/auth", formData)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res);
                            localStorage.setItem(
                                "event-io-userData",
                                JSON.stringify({ name: res.data.user.name, email: res.data.user.email, id: res.data.user.id })
                            );
                            setIsAuth(true);

                            return true;
                        }

                        return false;
                    })
                    .catch(() => {
                        setLoadingAuth(false);

                        return false;
                    });

                return result;
            })
            .catch(() => {
                setLoadingAuth(false);

                return false;
            });

        return result;
    }

    async function handleLogout() {
        await axiosBase.post("/auth/logout").then(() => {
            localStorage.removeItem("event-io-userData");
            setIsAuth(false);
        });
    }

    async function handleDeleteAccount() {
        const { id } = getUserData();
        await axiosBase.delete(`/user/${id}`).then(() => {
            localStorage.removeItem("event-io-userData");
            setIsAuth(false);
        });
    }

    function getUserData() {
        return JSON.parse(localStorage.getItem("event-io-userData")!) ?? null;
    }

    useEffect(() => {
        async function checkAuthStatus() {
            await axiosBase("/auth/status")
                .then((res) => {
                    localStorage.setItem("event-io-userData", JSON.stringify({ name: res.data.name, email: res.data.email, id: res.data.id }));
                    setIsAuth(true);
                })
                .catch((e) => {
                    localStorage.removeItem("event-io-userData");
                    setIsAuth(false);
                });
        }

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider
            value={{ loadingAuth, setLoadingAuth, isAuth, handleLogin, handleSignUp, handleLogout, getUserData, handleDeleteAccount }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
