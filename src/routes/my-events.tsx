import { createFileRoute, useRouter } from "@tanstack/react-router";
import PageBase from "../components/PageBase";
import BaseContainer from "../components/BaseContainer";
import { z } from "zod";
import { Box, Paper, OutlinedInput, InputAdornment, Typography } from "@mui/material";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState, FormEvent } from "react";
import axiosBase from "../axios/axiosBase";
import EventsList from "../components/EventsList";
import SearchIcon from "@mui/icons-material/Search";
import LoadingPage from "../components/LoadingPage";

const searchSchema = z.object({
    query: z.string().optional(),
});

export const Route = createFileRoute("/my-events")({
    component: RouteComponent,
    validateSearch: searchSchema,
});

function RouteComponent() {
    const { query } = Route.useSearch();

    const [queryString, setQueryString] = useState(query ?? "");

    const queryClient = useQueryClient();

    const router = useRouter();

    const { data: queriedEvents, isLoading } = useQuery({
        queryKey: ["user-events"],
        queryFn: async () => {
            if (queryString.length === 0) {
                return await axiosBase("/user-events?limit=4").then((res) => res.data);
            }

            return await axiosBase(`/user-events?query=${queryString}`).then((res) => res.data);
        },
    });

    async function handleSubmitSearchForm(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        if (queryString) {
            router.navigate({ to: "/my-events", search: { query: queryString } });
            await queryClient.invalidateQueries({ queryKey: ["user-events"] });
            return;
        }

        await queryClient.invalidateQueries({ queryKey: ["user-events"] });
        router.navigate({ to: "/my-events" });
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
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, mt: 4 }}>
                        <Typography variant="h5" color="primary.dark">
                            Your events:
                        </Typography>
                        {queriedEvents && queriedEvents.length > 0 && <EventsList events={queriedEvents} />}
                        {queriedEvents && queriedEvents.length === 0 && <Typography>Your search returned no results.</Typography>}
                    </Box>
                </Box>
            </BaseContainer>
        </PageBase>
    );
}
