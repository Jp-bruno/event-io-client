import { Box, Button, LinearProgress, Modal, Paper, TextField, Typography, Zoom } from "@mui/material";
import axiosBase from "../axios/axiosBase";
import { FormEvent, useState } from "react";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import { useAuthContext } from "../contexts/AuthContext";

export default function LoginModal() {
    const [formData, setFormData] = useState({ email: "alice@example.com", password: "hashedpassword1" });

    const { isOpen, openModal, closeModal, message, setMessage } = useLoginModalContext();

    const { loadingAuth, setLoadingAuth, handleLogin } = useAuthContext();

    function handleSetFormData(field: "email" | "password", value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function login(ev: FormEvent<HTMLFormElement>) {
        const loginSuccess = await handleLogin(ev, formData).then((response) => response);

        console.log({ loginSuccess });
        if (!loginSuccess) {
            setLoadingAuth(false);
            setMessage("Login failed");
            return;
        }

        setLoadingAuth(false);
        closeModal();
        return;
    }

    return (
        <Modal open={isOpen} onClose={closeModal} sx={{ display: "grid", placeItems: "center" }}>
            <Zoom in={isOpen}>
                <Paper>
                    <Typography variant="h4" color="primary" sx={{ textAlign: "center", pt: 2 }}>
                        Welcome
                    </Typography>

                    {message && (
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                            {message}
                        </Typography>
                    )}

                    <Box component="form" sx={{ display: "flex", flexDirection: "column", rowGap: 2, p: 2 }} onSubmit={(ev) => login(ev)}>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, p: 0 }}>
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
                                    Login
                                </Button>
                                <Button variant="outlined" size="small" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Zoom>
        </Modal>
    );
}
