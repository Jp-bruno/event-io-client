import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import BaseContainer from "../../../components/BaseContainer";
import { theme } from "../../../theme";
import PlaceIcon from "@mui/icons-material/Place";
import EventIcon from "@mui/icons-material/Event";
import ShareIcon from "@mui/icons-material/Share";
import { useLoginModalContext } from "../../../contexts/LoginModalContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axiosBase from "../../../axios/axiosBase";
import TooltipIconButton from "../../../components/TooltipIconButton";
import LoadingPage from "../../../components/LoadingPage";
import PageBase from "../../../components/PageBase";
import { useActionConfirmModalContext } from "../../../contexts/ActionConfirmModalContext";
import { useState } from "react";
import UpdateEventModal from "../../../components/UpdateEventModal";

export const Route = createFileRoute("/events/$eventSlug/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { eventSlug } = Route.useParams();

    const queryClient = useQueryClient();

    const { openModal } = useLoginModalContext();
    const { isAuth } = useAuthContext();
    const { openConfirmActionModal } = useActionConfirmModalContext();

    const router = useRouter();

    const [awaitAction, setAwaitAction] = useState(false);
    const [updateEventModal, setUpdateEventModal] = useState(false);

    const { data: event, isLoading } = useQuery({
        queryKey: [`event-${eventSlug}`],
        queryFn: async () => {
            return await axiosBase(`/event/${eventSlug}`).then((res) => res.data);
        },
    });

    const user = JSON.parse(localStorage.getItem("event-io-userData") as string);

    async function hanleDeleteEvent() {
        openConfirmActionModal({
            action: async () => await axiosBase.delete(`/event/${event.id}`),
            message: "Are you sure you want to delete this event?",
            title: "Delete event",
            confirmButtonText: "Yes, delete event",
            callbackOnEndAction: () => router.navigate({ to: "/my-events" }),
        });
    }

    async function handleAction() {
        if (!isAuth) {
            openModal("login", "You need to be logged in to enroll.");
            return;
        }

        setAwaitAction(true);

        if (event.is_enrolled) {
            await axiosBase.delete(`/user-events/${user.id}/${event.id}`);

            await queryClient.invalidateQueries({ queryKey: [`event-${eventSlug}`] });

            setAwaitAction(false);

            return;
        }

        await axiosBase.post("/user-events", { userId: user.id, eventId: event.id });

        await queryClient.invalidateQueries({ queryKey: [`event-${eventSlug}`] });

        setAwaitAction(false);
    }

    function goBack() {
        router.history.back();
    }

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!event) {
        return (
            <PageBase>
                <BaseContainer sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", py: "90px" }}>
                    <Link to={".."}>
                        <ArrowBackIcon />
                    </Link>
                    <Typography variant="h5">404 - No event found</Typography>
                </BaseContainer>
            </PageBase>
        );
    }

    return (
        <PageBase>
            <BaseContainer sx={{ minHeight: "100vh", display: "flex", py: "100px", flexDirection: "column" }}>
                <Paper
                    sx={{
                        p: 1,
                        backgroundImage: "linear-gradient(128deg, rgba(242,169,0,1) 0%, rgba(235,76,0,1) 100%)",
                        display: "flex",
                        alignItems: "center",
                        columnGap: 1,
                    }}
                >
                    <TooltipIconButton text="Back" cb={goBack} icon={<ArrowBackIcon />} />
                    <Typography color={"text.secondary"}>Back</Typography>
                </Paper>
                <Box
                    sx={{
                        height: "300px",
                        width: "100%",
                        backgroundImage: `url('${event.banner ?? "/cover.png"}')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        p: 2,
                        marginTop: 2,
                        marginBottom: 5,
                    }}
                >
                    <Typography
                        sx={{ backgroundColor: theme.palette.primary.main, p: 2, width: "fit-content", fontWeight: 500 }}
                        color="secondary"
                        variant="h4"
                    >
                        {event.title}
                    </Typography>
                </Box>

                <Grid2 container spacing={2}>
                    <Grid2 size={9}>
                        <Paper sx={{ p: 2, height: "100%" }} elevation={8}>
                            <Typography variant="h5">About this event:</Typography>
                            <Typography>{event.description ?? "No description yet"}</Typography>
                        </Paper>
                    </Grid2>
                    <Grid2 size={3}>
                        <Paper sx={{ p: 2, boxShadow: 8, "&:hover": { boxShadow: 20 } }}>
                            <Typography sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                                <PlaceIcon />
                                {event.location ?? "No location yet."}
                            </Typography>
                            <Typography sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                                <EventIcon />
                                {event.date
                                    ? `${new Date(event.date).toLocaleDateString("en-US")} - ${new Date(event.date).toLocaleTimeString("en-US")}`
                                    : "No date yet."}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: 1 }}>
                                <Button fullWidth variant="contained" onClick={handleAction} disabled={user?.id === event.host_id || awaitAction}>
                                    {Boolean(event.is_enrolled) ? "Unenroll" : "Enroll"}
                                </Button>
                                <Button fullWidth variant="outlined" endIcon={<ShareIcon />}>
                                    Share
                                </Button>
                            </Box>
                            {user?.id === event.host_id && (
                                <>
                                    {/*TODO - MODAL TO EDIT THE EVENT DATA*/}
                                    <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={() => setUpdateEventModal(true)}>
                                        Update event data
                                    </Button>
                                    <Button fullWidth variant="contained" color="error" sx={{ mt: 1 }} onClick={hanleDeleteEvent}>
                                        Delete
                                    </Button>
                                    <UpdateEventModal isOpen={updateEventModal} close={() => setUpdateEventModal(false)} event={event} />
                                </>
                            )}
                        </Paper>
                    </Grid2>
                </Grid2>
            </BaseContainer>
        </PageBase>
    );
}
