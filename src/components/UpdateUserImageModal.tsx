import { Box, Button, Divider, Modal, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import axiosBase from "../axios/axiosBase";

export default function UpdateUserImageModal({ currentImage, isOpen, close }: { currentImage?: string; isOpen: boolean; close: () => void }) {
    function handleClose() {
        console.log(close)
        close()
    }

    return (
        <Modal open={isOpen} onClose={handleClose}  sx={{ display: "grid", placeItems: "center" }}>
            <Paper>
                <Typography sx={{ p: 2, textAlign: "center" }}>This feature is not ready yet</Typography>

                <Divider />

                <Box sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
}
