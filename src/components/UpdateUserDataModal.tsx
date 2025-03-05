import { Box, Button, Divider, Modal, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import axiosBase from "../axios/axiosBase";

export default function UpdateUserDataModal({ user, isOpen, close }: { user: { email: string; name: string }; isOpen: boolean; close: () => void }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
    });

    function handleClose() {
        setFormData({
            name: user.name,
            email: user.email,
        });

        close();
    }

    function handleSetFormData(field: "name" | "email", value: string) {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        if (formData.name === user.name && formData.email === user.email) {
            close();
            return;
        }

        await axiosBase
            .put("/user", formData)
            .then((res) => {
                if (res.status === 200) {
                    close();
                    return;
                }
            })
            .catch((e) => {
                window.alert(e.response.data.message);
            });
    }

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
            <Paper>
                <Typography sx={{ p: 2, textAlign: "center" }}>Update your info</Typography>

                <Divider />

                <Box component="form" sx={{ p: 2, display: "flex", flexDirection: "column", rowGap: 2 }} onSubmit={handleSubmit}>
                    <TextField value={formData.name} onChange={(ev) => handleSetFormData("name", ev.target.value)} label="Name" required />
                    <TextField value={formData.email} onChange={(ev) => handleSetFormData("email", ev.target.value)} label="E-mail" required />

                    <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: 1 }}>
                        <Button fullWidth variant="outlined" color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button fullWidth variant="contained" type="submit">
                            Send
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}
