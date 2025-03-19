import { createFileRoute, useRouter } from "@tanstack/react-router";
import PageBase from "../components/PageBase";
import BaseContainer from "../components/BaseContainer";
import { Box, Button, Grid2, Paper, styled, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosBase from "../axios/axiosBase";
import LoadingPage from "../components/LoadingPage";
import UpdateUserDataModa from "../components/UpdateUserDataModal";
import { useState } from "react";
import UserImage from "../components/UserImage";
import { useActionConfirmModalContext } from "../contexts/ActionConfirmModalContext";
import { useAuthContext } from "../contexts/AuthContext";

export const Route = createFileRoute("/profile")({
    component: RouteComponent,
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
    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return await axiosBase("/user").then((res) => res.data);
        },
    });

    const router = useRouter();

    const { openConfirmActionModal } = useActionConfirmModalContext();
    const { handleDeleteAccount } = useAuthContext();

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

    function handleOnEndActionCallback() {
        router.navigate({ to: "/" });
    }

    function hadleDeleteAccount() {
        openConfirmActionModal({
            title: "Delete account",
            message: "Are you sure you want to delete your account?",
            action: handleDeleteAccount,
            secondaryMessage: "Warning: This will also delete any event that you're hosting",
            confirmButtonText: "Yes, delete",
            callbackOnEndAction: handleOnEndActionCallback,
        });
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
                            <Button variant="contained" size="small" color="error" sx={{ mt: 2 }} onClick={hadleDeleteAccount}>
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
