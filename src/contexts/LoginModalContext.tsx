import { ReactNode } from "@tanstack/react-router";
import { Dispatch, SetStateAction, useState, createContext, useContext } from "react";

type LoginModalContextType = {
    isOpen: boolean
    openModal: (message?: string) => void;
    closeModal: () => void;
    message: string
    setMessage: Dispatch<SetStateAction<string>>
};

export const LoginModalContext = createContext({} as LoginModalContextType);

export default function LoginModalContextProvider({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    function openModal(message?: string) {
        setOpen(true);
        if (message) {
            setMessage(message);
        }
    }

    function closeModal() {
        setOpen(false);
        setMessage("");
    }

    return <LoginModalContext.Provider value={{ isOpen, openModal, closeModal, message, setMessage }}>{children}</LoginModalContext.Provider>;
}

export function useLoginModalContext() {
    return useContext(LoginModalContext);
}
