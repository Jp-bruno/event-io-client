import { Box, Button, Divider, Grid2, Modal, Paper, TextField, Typography, Zoom } from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import LinearProgressBar from "./LinearProgressBar";
import axiosBase from "../axios/axiosBase";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useAlertContext } from "../contexts/AlertContext";
import { EventType } from "../types";
import { useNavigate } from "@tanstack/react-router";

export default function UpdateEventModal({ isOpen, close, event }: { isOpen: boolean; close: () => void; event: EventType }) {
    const [formData, setFormData] = useState({
        title: event.title ?? "",
        description: event.description ?? "",
        resume: event.resume ?? "",
        location: event.location ?? "",
        date: event.date ? new Date(event.date).toISOString().slice(0, 16) : null,
    });

    const [thumbnailProgress, setThumbnailProgress] = useState<null | number>(null);
    const [bannerProgress, setBannerProgress] = useState<null | number>(null);
    const [awaitAction, setAwaitAction] = useState(false);

    const navigate = useNavigate()

    const thumbnailInputRef = useRef(document.querySelector("#thumbnail-image-input") as HTMLInputElement);
    const bannerInputRef = useRef(document.querySelector("#banner-image-input") as HTMLInputElement);

    const queryClient = useQueryClient();

    const { openAlert } = useAlertContext();

    function handleSetFormData(field: "title" | "description" | "resume" | "location" | "date", value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleCreateEvent(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        setAwaitAction(true);

        const thumbnailFile = thumbnailInputRef.current.files?.[0];
        const bannerFile = bannerInputRef.current.files?.[0];

        const body = {
            ...formData,
            id: event.id,
        };

        if (thumbnailFile) {
            Object.assign(body, { thumbnail: { name: thumbnailFile.name, mimetype: thumbnailFile.type } });
        }

        if (bannerFile) {
            Object.assign(body, { banner: { name: bannerFile.name, mimetype: bannerFile.type } });
        }

        await axiosBase
            .put("/event", body)
            .then(async (res) => {
                if (thumbnailFile && res.data.thumbnailSignedUrl) {
                    await axios.put(res.data.thumbnailSignedUrl, thumbnailFile, {
                        headers: { "Content-Type": thumbnailFile.type },
                        onUploadProgress(progressEvent) {
                            let progress: number = Math.round((progressEvent.loaded * 100) / progressEvent.total!);

                            setThumbnailProgress(progress);
                        },
                    });
                }

                if (bannerFile && res.data.bannerSignedUrl) {
                    await axios.put(res.data.bannerSignedUrl, bannerFile, {
                        headers: { "Content-Type": bannerFile.type },
                        onUploadProgress(progressEvent) {
                            let progress: number = Math.round((progressEvent.loaded * 100) / progressEvent.total!);

                            setBannerProgress(progress);
                        },
                    });
                }

                return res.data
            })
            .then(async (data) => {
                await queryClient.invalidateQueries({ queryKey: [`event-${event.slug}`] });
                setAwaitAction(false);
                close();
                openAlert({
                    title: "Success",
                    message: "Event successfully updated",
                });

                if (formData.title !== event.title) {
                    navigate({to: `/events/${data.slug}`})
                }
            })
            .catch((e) => {
                setAwaitAction(false);
                openAlert({
                    title: "Error",
                    message: "There was a error while updating your event",
                    severity: "error",
                });
            });
    }

    function handleCancel() {
        setFormData({
            title: event.title,
            description: event.description ?? "",
            resume: event.resume ?? "",
            location: event.location ?? "",
            date: event.date ? new Date(event.date).toISOString().slice(0, 16) : null,
        });

        close();
    }

    return (
        <Modal open={isOpen} onClose={handleCancel} sx={{ display: "grid", placeItems: "center" }}>
            <Zoom in={isOpen}>
                <Paper sx={{ maxWidth: "500px" }}>
                    <Typography sx={{ p: 2, pb: 0, textAlign: "center" }}>Update event data</Typography>

                    <Divider sx={{ my: 2 }} />

                    <Grid2 container component="form" onSubmit={handleCreateEvent} sx={{ p: 2 }} spacing={1}>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                value={formData.title}
                                onChange={(ev) => handleSetFormData("title", ev.target.value)}
                                label="Title"
                                required
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                value={formData.description}
                                onChange={(ev) => handleSetFormData("description", ev.target.value)}
                                label="Description"
                                multiline
                                rows={4}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                value={formData.resume}
                                onChange={(ev) => handleSetFormData("resume", ev.target.value)}
                                label="Resume"
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                value={formData.location}
                                onChange={(ev) => handleSetFormData("location", ev.target.value)}
                                label="Location"
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                fullWidth
                                label="Thumbnail"
                                type="file"
                                slotProps={{ inputLabel: { shrink: true } }}
                                inputRef={thumbnailInputRef}
                            />
                            {thumbnailProgress && <LinearProgressBar progress={thumbnailProgress} />}
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField fullWidth label="Banner" type="file" slotProps={{ inputLabel: { shrink: true } }} inputRef={bannerInputRef} />
                            {bannerProgress && <LinearProgressBar progress={bannerProgress} />}
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                value={formData.date}
                                onChange={(ev) => handleSetFormData("date", ev.target.value)}
                                label="Date"
                                type="datetime-local"
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Grid2>

                        <Grid2 size={12} sx={{ display: "flex", columnGap: 1, mt: 2 }}>
                            <Button fullWidth variant="outlined" onClick={handleCancel} disabled={awaitAction}>
                                Cancel
                            </Button>
                            <Button fullWidth variant="contained" type="submit" disabled={awaitAction}>
                                Update
                            </Button>
                        </Grid2>
                    </Grid2>
                </Paper>
            </Zoom>
        </Modal>
    );
}
