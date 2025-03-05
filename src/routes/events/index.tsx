import { Box, FormControl, Grid2, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BaseContainer from "../../components/BaseContainer";
import EventsList from "../../components/EventsList";
import { z } from "zod";
import axiosBase from "../../axios/axiosBase";
import LoadingPage from "../../components/LoadingPage";
import PageBase from "../../components/PageBase";

const searchSchema = z.object({
    query: z.string().optional(),
});

export const Route = createFileRoute("/events/")({
    component: RouteComponent,
    validateSearch: searchSchema,
});

function RouteComponent() {
    const { query } = Route.useSearch();

    const [queryString, setQueryString] = useState(query ?? "");

    const queryClient = useQueryClient();

    const router = useRouter();

    const { data: queriedEvents, isLoading } = useQuery({
        queryKey: ["query-events"],
        queryFn: async () => {
            if (queryString.length === 0) {
                return await axiosBase("/event?limit=4").then((res) => res.data);
            }

            return await axiosBase(`/event?query=${queryString}`).then((res) => res.data);
        },
    });

    async function handleSubmitSearchForm(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        if (queryString) {
            router.navigate({ to: "/events", search: { query: queryString } });
            await queryClient.invalidateQueries({ queryKey: ["query-events"] });
            return;
        }

        await queryClient.invalidateQueries({ queryKey: ["query-events"] });
        router.navigate({ to: "/events" });
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
                                placeholder="Search"
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
                            See what's happening now:
                        </Typography>
                        {queriedEvents && queriedEvents.length > 0 && <EventsList events={queriedEvents} />}
                        {queriedEvents && queriedEvents.length === 0 && <Typography>Your search returned no results.</Typography>}
                    </Box>
                </Box>
            </BaseContainer>
        </PageBase>
    );
}
