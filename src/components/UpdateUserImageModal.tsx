import { Box, Button, Divider, LinearProgress, Modal, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import axiosBase from "../axios/axiosBase";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import LinearProgressBar from "./LinearProgressBar";

export default function UpdateUserImageModal({ currentImage, isOpen, close }: { currentImage?: string; isOpen: boolean; close: () => void }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState<null | number>(null);

    const { getUserData } = useAuthContext();

    const queryClient = useQueryClient();

    function handleClose() {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
            setImageUrl(null);
        }
        close();
    }

    const imageInputRef = useRef(document.querySelector("#profile-image-input") as HTMLInputElement);

    function handleFileInputChange(ev: ChangeEvent<HTMLInputElement>) {
        const file = ev.target.files?.[0];

        console.log(imageInputRef.current.files?.[0].type);

        if (!file) return;

        if (file.size > 500000) {
            window.alert("File size should be less than 500KB");
            return;
        }

        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }

        const imageBlobUrl = URL.createObjectURL(file);
        setImageUrl(imageBlobUrl);
    }

    async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const user = getUserData();

        await axiosBase
            .put("/user", {
                name: user?.name,
                email: user?.email,
                image: { name: imageInputRef.current.files?.[0].name, mimetype: imageInputRef.current.files?.[0].type },
            })

            .then(async (res) => {
                if (res.data.signedUrl) {
                    await axios
                        .put(res.data.signedUrl, imageInputRef.current.files?.[0], {
                            headers: { "Content-Type": imageInputRef.current.files?.[0].type },
                            onUploadProgress(progressEvent) {
                                let progress: number = Math.round((progressEvent.loaded * 100) / progressEvent.total!);

                                setProgress(progress);
                            },
                        })
                        .then(async () => {
                            await queryClient.invalidateQueries({ queryKey: ["profile"] });
                            URL.revokeObjectURL(imageUrl as string);
                            setImageUrl(null);
                            close();
                            setProgress(null);
                        })
                        .catch((e) => {
                            window.alert("Erro: " + e.message);
                            URL.revokeObjectURL(imageUrl as string);
                            setImageUrl(null);
                            setProgress(null);
                            close();
                        });
                }
            });
    }

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
            <Paper>
                <Typography sx={{ p: 2, textAlign: "center" }}>Upload profile picture</Typography>

                <Divider />

                <Box sx={{ p: 2, display: "flex", flexDirection: "column", rowGap: 1 }} component="form" onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            width: "100px",
                            aspectRatio: "1/1",
                            border: "solid 1px #00000050",
                            marginInline: "auto",
                            borderRadius: "500px",
                            backgroundImage: `url('${imageUrl}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />

                    {progress && <LinearProgressBar progress={progress} showPercentage />}

                    <Button variant="outlined" size="small" onClick={() => imageInputRef.current.click()} disabled={Boolean(progress)}>
                        Choose image
                    </Button>

                    <input
                        type="file"
                        hidden
                        id="profile-image-input"
                        accept="image/png, image/jpeg"
                        ref={imageInputRef}
                        onChange={handleFileInputChange}
                        required
                    />

                    <Box sx={{ display: "flex", columnGap: 1 }}>
                        <Button variant="outlined" fullWidth onClick={handleClose} disabled={Boolean(progress)}>
                            Close
                        </Button>

                        <Button variant="contained" fullWidth type="submit" disabled={!Boolean(imageUrl)}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}
