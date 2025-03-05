import { Box, Button, Menu, MenuItem } from "@mui/material";
import { FileRoutesByPath, Link, NavigateOptions, useRouter } from "@tanstack/react-router";
import TooltipIconButton from "./TooltipIconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { MouseEvent, useState } from "react";
import BaseContainer from "./BaseContainer";
import { useAuthContext } from "../contexts/AuthContext";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { FileRoutesByTo, FileRouteTypes } from "../routeTree.gen";

export default function Header() {
    const { isAuth, handleLogout } = useAuthContext();

    const { openModal } = useLoginModalContext();

    const router = useRouter();

    function openLogin() {
        openModal();
    }

    function logout() {
        handleLogout();
    }

    function handleNavigate(route: string) {
        router.navigate({ to: route });
    }

    if (isAuth) {
        return (
            <Box
                sx={{
                    py: 2,
                    boxShadow: "0px 9px 93px 0px rgba(0,0,0,0.75)",
                    position: "fixed",
                    width: "100vw",
                    backgroundColor: "rgb(252, 233, 191)",
                    zIndex: 10,
                }}
            >
                <BaseContainer sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link to="/">
                        <img src={"/default-monochrome.svg"} alt="Event-io" width={200} />
                    </Link>

                    <Box sx={{ display: "flex", columnGap: 1 }}>
                        <Button variant="outlined" size="small" onClick={() => handleNavigate("/my-events")}>
                            My events
                        </Button>
                        <Button variant="outlined" size="small" onClick={() => handleNavigate("/profile")}>
                            Profile
                        </Button>
                        <TooltipIconButton text="Logout" icon={<LogoutIcon />} cb={logout} sx={{ marginLeft: 5 }} />
                    </Box>
                </BaseContainer>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                py: 2,
                boxShadow: "0px 9px 93px 0px rgba(0,0,0,0.75)",
                position: "fixed",
                width: "100vw",
                backgroundColor: "rgb(252, 233, 191)",
                zIndex: 10,
            }}
        >
            <BaseContainer sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link to="/">
                    <img src={"/default-monochrome.svg"} alt="Event-io" width={200} />
                </Link>

                <Box>
                    <Button variant="outlined" size="small" onClick={openLogin}>
                        Login
                    </Button>
                </Box>
            </BaseContainer>
        </Box>
    );
}
