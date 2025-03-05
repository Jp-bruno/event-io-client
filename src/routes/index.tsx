import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import BaseContainer from "../components/BaseContainer";
import styled from "@emotion/styled";
import EventsList from "../components/EventsList";

export const Route = createFileRoute("/")({
    component: HomeComponent,
});

const StyledT = styled(Typography)`
    color: #361c00;
    font-family: "IBM Plex Serif";
    position: relative;
    margin: 16px 0;
`;

const StyledImg = styled.img`
    width: 50%;
    position: absolute;
    border-radius: 8px;
    opacity: 0;
    top: 0%;
    transition: opacity 1s ease;

    &.img-1 {
        animation-name: fade-in-img1;
        animation-delay: 1.5s;
        left: 40%;
        bottom: -300%;
    }

    &.img-2 {
        animation-name: fade-in-img2;
        bottom: -200%;
        animation-delay: 1s;
    }

    @keyframes fade-in-img1 {
        0% {
            top: -20%;
        }

        100% {
            top: 0%;
            opacity: 1;
        }
    }

    @keyframes fade-in-img2 {
        0% {
            top: -20%;
        }

        100% {
            top: 50%;
            opacity: 1;
        }
    }

    animation-duration: 1s;
    animation-fill-mode: forwards;
`;
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useQuery } from "@tanstack/react-query";
import axiosBase from "../axios/axiosBase";
import { useAuthContext } from "../contexts/AuthContext";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import { theme } from "../theme";
import PageBase from "../components/PageBase";

function HomeComponent() {
    const router = useRouter();

    const { isAuth } = useAuthContext();

    const { openModal } = useLoginModalContext();

    function handleClick(path: string) {
        router.navigate({ to: path });
    }

    const { data: events, isLoading } = useQuery({
        queryKey: ["query-events"],
        queryFn: async () => {
            return await axiosBase("/event?limit=4").then((res) => res.data);
        },
    });

    return (
        <PageBase>
            <BaseContainer>
                <Box sx={{ display: "flex", alignItems: "center", height: "100vh" }}>
                    <Grid2 container sx={{ width: "100%" }} spacing={"auto"}>
                        <Grid2 size={7}>
                            <StyledT variant="h6" sx={{ mb: 2 }}>
                                Your favorite events platform
                            </StyledT>
                            <StyledT variant="h2" fontWeight={600}>
                                Discover and share events
                            </StyledT>
                            <StyledT variant="h4">Explore, engage and join events that bring people together.</StyledT>
                            <Box sx={{ display: "flex", columnGap: 1 }}>
                                <Button variant="contained" size="large" onClick={() => handleClick("/events")}>
                                    Explore now
                                </Button>
                                <Button
                                    variant="contained"
                                    color={"secondary"}
                                    size="large"
                                    onClick={() => (isAuth ? handleClick("/createEvent") : openModal("You need to be logged in to create a event."))}
                                >
                                    Create your event
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", py: 15 }}>
                    <StyledT variant="h3" sx={{ paddingBottom: 3, textAlign: "center" }}>
                        See what's happening now
                    </StyledT>
                    {!isLoading && <EventsList events={events} />}
                </Box>
            </BaseContainer>
        </PageBase>
    );
}
