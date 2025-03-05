import { ReactNode } from "@tanstack/react-router";
import { Dispatch, SetStateAction, useState, createContext, useContext } from "react";

type LoginModalContextType = {
    isOpen: "login" | "signup" | null;
    openModal: (type: "login" | "signup", message?: string) => void;
    closeModal: () => void;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
};

export const LoginModalContext = createContext({} as LoginModalContextType);

export default function LoginModalContextProvider({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState<"login" | "signup" | null>(null);
    const [message, setMessage] = useState("");

    function openModal(type: "login" | "signup", message?: string) {
        setOpen(type);
        if (message) {
            setMessage(message);
        }
    }

    function closeModal() {
        setOpen(null);
        setMessage("");
    }

    return <LoginModalContext.Provider value={{ isOpen, openModal, closeModal, message, setMessage }}>{children}</LoginModalContext.Provider>;
}

export function useLoginModalContext() {
    return useContext(LoginModalContext);
}
