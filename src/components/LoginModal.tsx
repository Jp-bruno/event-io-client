import { Box, Button, LinearProgress, Modal, Paper, TextField, Tooltip, Typography, Zoom } from "@mui/material";
import { FormEvent, useState } from "react";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useAlertContext } from "../contexts/AlertContext";

export default function LoginModal() {
    const { isOpen, closeModal, message, setMessage } = useLoginModalContext();

    const [formData, setFormData] = useState({
        name: "",
        email: isOpen === "login" ? "john.doe@example.com" : "",
        password: isOpen === "login" ? "hashedpassword1" : "",
    });

    const { loadingAuth, setLoadingAuth, handleSignUp, handleLogin } = useAuthContext();
    const { openAlert } = useAlertContext();

    function handleSetFormData(field: "name" | "email" | "password", value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function login(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        const loginSuccess = await handleLogin(ev, { email: formData.email, password: formData.password }).then((response) => response);

        if (!loginSuccess) {
            setLoadingAuth(false);
            setMessage("Login failed");
            return;
        }

        setLoadingAuth(false);
        setFormData({ name: "", email: "", password: "" });
        closeModal();
        return;
    }

    async function signUp(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        const signUpSuccess = await handleSignUp(ev, formData).then((response) => response);

        if (!signUpSuccess) {
            setLoadingAuth(false);
            setMessage("Sign up failed");
            // TODO - MAKE ALERT TO SHOW CUSTOM ERROR MESSAGE
            return;
        }

        setLoadingAuth(false);
        closeModal();
        return;
    }

    return (
        <Modal open={Boolean(isOpen)} onClose={closeModal} sx={{ display: "grid", placeItems: "center" }}>
            <Zoom in={Boolean(isOpen)}>
                <Paper>
                    <Typography variant="h4" color="primary" sx={{ textAlign: "center", pt: 2 }}>
                        Welcome
                    </Typography>

                    {message && (
                        <Typography color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
                            {message}
                        </Typography>
                    )}

                    {isOpen === "signup" && (
                        <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                            Create your account
                        </Typography>
                    )}

                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", rowGap: 2, p: 2 }}
                        onSubmit={(ev) => (isOpen === "login" ? login(ev) : signUp(ev))}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, p: 0 }}>
                            {isOpen === "signup" && (
                                <TextField
                                    required
                                    size="small"
                                    label="Name"
                                    value={formData.name}
                                    onChange={(ev) => handleSetFormData("name", ev.target.value)}
                                    disabled={loadingAuth}
                                />
                            )}
                            <TextField
                                required
                                size="small"
                                label="Email"
                                value={formData.email}
                                onChange={(ev) => handleSetFormData("email", ev.target.value)}
                                disabled={loadingAuth}
                            />
                            <TextField
                                required
                                size="small"
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(ev) => handleSetFormData("password", ev.target.value)}
                                disabled={loadingAuth}
                            />
                        </Box>
                        {loadingAuth ? (
                            <Box>
                                <LinearProgress />
                            </Box>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, p: 0 }}>
                                <Button type="submit" variant="contained">
                                    {isOpen === "login" ? "Sign in" : "Sign up"}
                                </Button>
                                <Button variant="outlined" size="small" onClick={closeModal}>
                                    Cancel
                                </Button>
                                {isOpen === "login" && (
                                    <Tooltip title="Feature not ready yet">
                                        <Button variant="text" size="small">
                                            Forgot password?
                                        </Button>
                                    </Tooltip>
                                )}
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Zoom>
        </Modal>
    );
}
