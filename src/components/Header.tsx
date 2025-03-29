import { Box, Button } from "@mui/material";
import { Link, useRouter } from "@tanstack/react-router";
import TooltipIconButton from "./TooltipIconButton";
import BaseContainer from "./BaseContainer";
import { useAuthContext } from "../contexts/AuthContext";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
    const { isAuth, handleLogout } = useAuthContext();

    const { openModal } = useLoginModalContext();

    const router = useRouter();

    function openLogin() {
        openModal("login");
    }

    function openSignUp() {
        openModal("signup");
    }

    function logout() {
        router.navigate({ to: "/" });
        handleLogout();
    }

    function handleNavigate(route: string) {
        router.navigate({ to: route });
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

                {isAuth ? (
                    <Box sx={{ display: "flex", columnGap: 1 }}>
                        <Button variant="outlined" size="small" onClick={() => handleNavigate("/my-events")}>
                            My events
                        </Button>
                        <Button variant="outlined" size="small" onClick={() => handleNavigate("/profile")}>
                            Profile
                        </Button>
                        <TooltipIconButton text="Sign out" icon={<LogoutIcon />} cb={logout} sx={{ marginLeft: 5 }} />
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", columnGap: 1 }}>
                        <Button variant="contained" size="small" onClick={openSignUp}>
                            Sign up
                        </Button>
                        <Button variant="outlined" size="small" onClick={openLogin}>
                            Sign in
                        </Button>
                    </Box>
                )}
            </BaseContainer>
        </Box>
    );
}
