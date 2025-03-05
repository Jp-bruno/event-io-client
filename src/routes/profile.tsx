import { createFileRoute } from "@tanstack/react-router";
import PageBase from "../components/PageBase";
import BaseContainer from "../components/BaseContainer";
import { Box, Button, Grid2, Paper, styled, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosBase from "../axios/axiosBase";
import LoadingPage from "../components/LoadingPage";
import UpdateUserDataModa from "../components/UpdateUserDataModal";
import { useState } from "react";
import UserImage from "../components/UserImage";

export const Route = createFileRoute("/profile")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return await axiosBase("/user").then((res) => res.data);
        },
    });

    const [updateUserDataModalState, setUpdateUserDataModalState] = useState(false);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!profile) {
        return (
            <PageBase>
                <BaseContainer sx={{ py: "100px" }}>
                    <Typography>User not found</Typography>
                </BaseContainer>
            </PageBase>
        );
    }

    return (
        <PageBase>
            <BaseContainer sx={{ py: "100px" }}>
                <Paper sx={{ p: 2 }}>
                    <Grid2 container>
                        <Grid2 size={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <UserImage image={profile.image} />
                            <Typography>{profile.name}</Typography>
                            <Typography>{profile.email}</Typography>

                            <Button variant="outlined" size="small" onClick={() => setUpdateUserDataModalState(true)} sx={{ mt: 2 }}>
                                Update your data
                            </Button>
                            <Button variant="outlined" size="small" color="error" sx={{ mt: 2 }}>
                                Delete my account
                            </Button>
                        </Grid2>
                    </Grid2>
                </Paper>
                <UpdateUserDataModa
                    isOpen={updateUserDataModalState}
                    close={() => setUpdateUserDataModalState(false)}
                    user={{ name: profile.name, email: profile.email }}
                />
            </BaseContainer>
        </PageBase>
    );
}
