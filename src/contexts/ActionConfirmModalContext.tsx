import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ActionConfirmModalContextType = {
    isOpen: boolean;
    closeConfirmActionModal: () => void;
    openConfirmActionModal: ({ title, message, action, secondaryMessage, confirmButtonText }: Omit<ActionConfirmModalStateType, "isOpen">) => void;
    action: null | (() => Promise<void>);
    title: string;
    message: string;
    secondaryMessage?: string | null;
    confirmButtonText?: string;
    callbackOnClose?: null | (() => void);
};

type ActionConfirmModalStateType = {
    isOpen: boolean;
    title: string;
    message: string;
    action: null | (() => Promise<void>);
    secondaryMessage?: string | null;
    confirmButtonText?: string;
    callbackOnClose?: null | (() => void);
};

export const ActionConfirmModalContext = createContext({} as ActionConfirmModalContextType);

export default function ActionConfirmModalContextProvider({ children }: { children: ReactNode }) {
    const [state, setActionConfirmModalState] = useState<ActionConfirmModalStateType>({
        isOpen: false,
        title: "",
        message: "",
        action: null,
        secondaryMessage: null,
        confirmButtonText: "Confirm",
        callbackOnClose: null,
    });

    function closeConfirmActionModal() {
        setActionConfirmModalState((prev) => {
            return {
                ...prev,
                isOpen: false,
                title: "",
                message: "",
                action: null,
                secondaryMessage: null,
                confirmButtonText: "Confirm",
                callbackOnClose: null,
            };
        });
    }

    function openConfirmActionModal({
        title,
        message,
        action,
        secondaryMessage,
        confirmButtonText,
        callbackOnClose,
    }: Omit<ActionConfirmModalStateType, "isOpen">) {
        setActionConfirmModalState(() => {
            return {
                isOpen: true,
                title,
                message,
                action: action ?? null,
                secondaryMessage: secondaryMessage ?? null,
                confirmButtonText: confirmButtonText ? confirmButtonText : "Confirm",
                callbackOnClose: callbackOnClose ?? null,
            };
        });
    }

    return (
        <ActionConfirmModalContext.Provider
            value={{
                isOpen: state.isOpen,
                closeConfirmActionModal,
                openConfirmActionModal,
                action: state.action,
                title: state.title,
                message: state.message,
                secondaryMessage: state.secondaryMessage,
                confirmButtonText: state.confirmButtonText,
                callbackOnClose: state.callbackOnClose,
            }}
        >
            {children}
        </ActionConfirmModalContext.Provider>
    );
}

export function useActionConfirmModalContext() {
    return useContext(ActionConfirmModalContext);
}
