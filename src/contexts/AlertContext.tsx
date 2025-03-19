import { AlertColor, AlertProps, AlertPropsColorOverrides } from "@mui/material";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type AlertContextType = {
    isOpen: boolean;
    closeAlert: () => void;
    openAlert: ({ title, message }: Omit<AlertStateType, "isOpen">) => void;
    title: string;
    message: string;
    severity?: "error" | "info" | "success" | "warning";
};

type AlertStateType = {
    isOpen: boolean;
    title: string;
    severity?: "error" | "info" | "success" | "warning";
    message: string;
};

export const AlertContext = createContext({} as AlertContextType);

export default function AlertContextProvider({ children }: { children: ReactNode }) {
    const [state, setAlertState] = useState<AlertStateType>({
        isOpen: false,
        title: "",
        message: "",
        severity: "info",
    });

    function closeAlert() {
        setAlertState((prev) => {
            return {
                isOpen: false,
                title: "",
                message: "",
                severity: state.severity,
            };
        });
    }

    function openAlert({ title, message, severity }: Omit<AlertStateType, "isOpen">) {
        setAlertState(() => {
            return {
                isOpen: true,
                title,
                message,
                severity,
            };
        });
    }

    return (
        <AlertContext.Provider
            value={{
                isOpen: state.isOpen,
                title: state.title,
                message: state.message,
                closeAlert,
                openAlert,
                severity: state.severity,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
}

export function useAlertContext() {
    return useContext(AlertContext);
}
