import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Box, Button, Grid2, Typography } from "@mui/material";
import BaseContainer from "../components/BaseContainer";
import styled from "@emotion/styled";
import EventsList from "../components/EventsList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosBase from "../axios/axiosBase";
import { useAuthContext } from "../contexts/AuthContext";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import PageBase from "../components/PageBase";
import { useState } from "react";
import useGetMoreEvents from "../hooks/useGetMoreEvents";
import { EventType } from "../types";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

const StyledT = styled(Typography)`
    color: #361c00;
    font-family: "IBM Plex Serif";
    position: relative;
    margin: 16px 0;
`;

function HomeComponent() {
    const router = useRouter();

    const { isAuth } = useAuthContext();

    const [page, setPage] = useState(1);

    const [awaitAction, setAwaitAction] = useState(false);

    const { openModal } = useLoginModalContext();

    const getMoreEvents = useGetMoreEvents(page);

    const queryClient = useQueryClient();

    function handleClick(path: string) {
        router.navigate({ to: path });
    }

    const { data: events, isLoading } = useQuery({
        queryKey: ["query-events"],
        queryFn: async () => {
            return await axiosBase("/event?limit=4").then((res) => res.data);
        },
    });

    async function handleGetMoreEvents() {
        setAwaitAction(true);

        await getMoreEvents().then((data) => {
            queryClient.setQueryData(["query-events"], (oldEvents: EventType[]) => {
                return [...oldEvents, ...data];
            });
            setPage((prev) => prev + 1);

            if (data.length < 4) {
                setAwaitAction(true);
                return;
            }

            setAwaitAction(false);
        });
    }

    return (
        <PageBase>
            <BaseContainer>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: { xs: "80vh", md: "100vh" },
                        paddingTop: { xs: "20vh", md: 0 },
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 5,
                    }}
                >
                    <Box>
                        <StyledT variant="h6" sx={{ mb: 2, fontSize: "1.5rem" }}>
                            Your favorite events platform
                        </StyledT>
                        <StyledT variant="h2" fontWeight={600} sx={{ fontSize: { xs: "3rem", md: "3.5rem", lg: "4rem" } }}>
                            Discover and share events
                        </StyledT>
                        <StyledT variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
                            Explore, engage and join events that bring people together.
                        </StyledT>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexDirection: { xs: "column", md: "row", lg: "row" },
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => handleClick("/events")}
                            sx={{ fontSize: { xs: "1.2rem", md: "1rem" } }}
                        >
                            Explore events now
                        </Button>
                        <Button
                            variant="contained"
                            color={"secondary"}
                            size="large"
                            onClick={() => (isAuth ? handleClick("/my-events") : openModal("login", "You need to be logged in to create a event."))}
                            sx={{ fontSize: { xs: "1.2rem", md: "1rem" } }}
                        >
                            Host your event
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", paddingBottom: 15, paddingTop: { xs: 0, md: 15 } }}>
                    <StyledT variant="h3" sx={{ paddingBottom: 3, textAlign: "center" }}>
                        See what's happening now
                    </StyledT>
                    {!isLoading && <EventsList events={events} />}
                    <Box sx={{ mt: 10, display: "flex", justifyContent: "center", width: { xs: "50%" }, marginInline: "auto" }}>
                        <Button variant="contained" fullWidth size="large" onClick={handleGetMoreEvents} disabled={awaitAction}>
                            More events
                        </Button>
                    </Box>
                </Box>
            </BaseContainer>
        </PageBase>
    );
}
