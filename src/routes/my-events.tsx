import { createFileRoute, useRouter } from "@tanstack/react-router";
import PageBase from "../components/PageBase";
import BaseContainer from "../components/BaseContainer";
import { z } from "zod";
import { Box, Paper, OutlinedInput, InputAdornment, Typography, Button } from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState, FormEvent } from "react";
import axiosBase from "../axios/axiosBase";
import EventsList from "../components/EventsList";
import SearchIcon from "@mui/icons-material/Search";
import LoadingPage from "../components/LoadingPage";
import { Add } from "@mui/icons-material";
import CreateEventModal from "../components/CreateEventModal";
import useGetMoreUserEvents from "../hooks/useGetMoreUserEvents";
import { EventType } from "../types";

const searchSchema = z.object({
    query: z.string().optional(),
});

export const Route = createFileRoute("/my-events")({
    component: RouteComponent,
    validateSearch: searchSchema,
    beforeLoad: async () => {
        await axiosBase("/auth/status")
            .then((res) => {
                return;
            })
            .catch((e) => {
                localStorage.removeItem("event-io-userData");
                window.location.replace("/");
            });
    },
});

function RouteComponent() {
    const { query } = Route.useSearch();

    const [queryString, setQueryString] = useState(query ?? "");
    const [page, setPage] = useState(1);
    const [awaitAction, setAwaitAction] = useState(false);
    const [createEventModalState, setCreateEventModalState] = useState(false);

    const getMoreUserEvets = useGetMoreUserEvents(page, queryString);

    const queryClient = useQueryClient();

    const router = useRouter();

    const { data: queriedEvents, isLoading } = useQuery({
        queryKey: ["user-events"],
        queryFn: async () => {
            if (queryString.length === 0) {
                return await axiosBase("/user-events?limit=4&offset=0").then((res) => {
                    if (res.data.length < 4) {
                        setAwaitAction(true);
                        return res.data;
                    }

                    setAwaitAction(false);
                    return res.data;
                });
            }

            return await axiosBase(`/user-events?query=${queryString}&limit=4&offset=0`).then((res) => {
                if (res.data.length < 4) {
                    setAwaitAction(true);
                    return res.data;
                }

                setAwaitAction(false);
                return res.data;
            });
        },
    });

    async function handleSubmitSearchForm(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        setPage(1);

        if (queryString) {
            router.navigate({ to: "/my-events", search: { query: queryString } });
            await queryClient.invalidateQueries({ queryKey: ["user-events"] });
            return;
        }

        await queryClient.invalidateQueries({ queryKey: ["user-events"] });
        router.navigate({ to: "/my-events" });
    }

    async function handleGetMoreEvents() {
        setAwaitAction(true);

        await getMoreUserEvets().then((data) => {
            queryClient.setQueryData(["user-events"], (oldEvents: EventType[]) => {
                setPage((prev) => prev + 1);

                setAwaitAction(data.length < 4);

                return [...oldEvents, ...data];
            });
        });
    }

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <PageBase>
            <BaseContainer sx={{ minHeight: "100vh", display: "grid", placeItems: "center", py: "130px" }}>
                <Box sx={{ height: "100%", width: "100%" }}>
                    <Box>
                        <Paper component={"form"} onSubmit={handleSubmitSearchForm} elevation={18}>
                            <OutlinedInput
                                fullWidth
                                placeholder="Search in your events"
                                value={queryString}
                                onChange={(ev) => setQueryString(ev.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </Paper>
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" endIcon={<Add />} onClick={() => setCreateEventModalState(true)}>
                                New event
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, mt: 4 }}>
                        <Typography variant="h5" color="primary.dark">
                            Your events:
                        </Typography>
                        {queriedEvents && queriedEvents.length > 0 && <EventsList events={queriedEvents} />}
                        {queriedEvents && queriedEvents.length === 0 && <Typography>Your search returned no results.</Typography>}
                    </Box>
                    <Box sx={{ mt: 10, display: "flex", justifyContent: "center", width: { xs: "50%" }, marginInline: "auto" }}>
                        <Button variant="contained" fullWidth size="large" onClick={handleGetMoreEvents} disabled={awaitAction}>
                            More events
                        </Button>
                    </Box>
                </Box>
                <CreateEventModal isOpen={createEventModalState} close={() => setCreateEventModalState(false)} />
            </BaseContainer>
        </PageBase>
    );
}
