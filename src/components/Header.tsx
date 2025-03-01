import { Box, Menu, MenuItem } from "@mui/material";
import { Link } from "@tanstack/react-router";
import TooltipIconButton from "./TooltipIconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { MouseEvent, useState } from "react";
import BaseContainer from "./BaseContainer";
import { useAuthContext } from "../contexts/AuthContext";
import { useLoginModalContext } from "../contexts/LoginModalContext";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { isAuth, handleLogout } = useAuthContext();

    const { openModal } = useLoginModalContext();

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function openLogin() {
        handleClose();
        openModal();
    }

    function logout() {
        handleLogout();
        handleClose();
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
                    <TooltipIconButton text="Perfil" icon={<AccountCircleOutlinedIcon sx={{ color: "#EB4C00" }} />} cb={handleClick} />
                    {isAuth ? (
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ left: -40 }}>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My Events</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    ) : (
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ left: -40 }}>
                            <MenuItem onClick={openLogin}>Login</MenuItem>
                        </Menu>
                    )}
                </Box>
            </BaseContainer>
        </Box>
    );
}
