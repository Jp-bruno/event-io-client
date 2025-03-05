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
                window.alert(e);
            });
    }

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
            <Paper>
                <Typography sx={{ p: 2, textAlign: "center" }}>Update your info</Typography>
                
                <Divider />

                <Box component="form" sx={{ p: 2, display: "flex", flexDirection: "column", rowGap: 2 }} onSubmit={handleSubmit}>
                    <TextField value={formData.name} label="Name" required />
                    <TextField value={formData.email} label="E-mail" required />

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
