import { AlertTitle, Snackbar, Typography } from "@mui/material";
import { useAlertContext } from "../contexts/AlertContext";
import Alert, { AlertProps } from "@mui/material/Alert";

export default function CustomAlert() {
    const { isOpen, openAlert, closeAlert, message, title, severity } = useAlertContext();

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={2000}
            onClose={closeAlert}
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
            <Alert variant="filled" severity={severity} >
                <AlertTitle>{title}</AlertTitle>
                <Typography>{message}</Typography>
            </Alert>
        </Snackbar>
    );
}
