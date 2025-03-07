import { Box, Button, Divider, Modal, Paper, Typography, Zoom } from "@mui/material";
import { useActionConfirmModalContext } from "../contexts/ActionConfirmModalContext";
import { useState } from "react";

export default function ActionConfirmModal() {
    const { isOpen, title, message, secondaryMessage, closeConfirmActionModal, confirmButtonText, action, callbackOnEndAction } =
        useActionConfirmModalContext();

    const [awaitAction, setAwaitAction] = useState(false);

    function handleClose() {
        closeConfirmActionModal();
    }

    async function handleAction() {
        if (action) {
            setAwaitAction(true);

            await action().then(() => {
                handleClose();
                if (callbackOnEndAction) {
                    callbackOnEndAction();
                }
                setAwaitAction(false);
            });
        }
    }

    return (
        <Modal sx={{ display: "grid", placeItems: "center" }} open={isOpen} onClose={handleClose}>
            <Zoom in={isOpen}>
                <Paper>
                    {title && <Typography sx={{ p: 2, textAlign: "center" }}>{title}</Typography>}

                    <Divider />

                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {message && (
                                <Typography variant="h6" sx={{ textAlign: "center", maxWidth: "400px", marginInline: "auto" }}>
                                    {message}
                                </Typography>
                            )}

                            {secondaryMessage && (
                                <Typography
                                    sx={{ p: 2, pt: 0, textAlign: "center", color: "text.secondary", maxWidth: "300px", marginInline: "auto" }}
                                >
                                    {secondaryMessage}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ display: "flex", columnGap: 1, mt: 2 }}>
                            <Button fullWidth variant="outlined" color="error" onClick={handleClose} disabled={awaitAction}>
                                Cancel
                            </Button>
                            <Button fullWidth variant="contained" color="error" onClick={handleAction} disabled={awaitAction}>
                                {confirmButtonText}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Zoom>
        </Modal>
    );
}
