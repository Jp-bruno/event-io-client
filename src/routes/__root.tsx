import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import { Box } from "@mui/material";
import ActionConfirmModal from "../components/ActionConfirmModal";
import CustomAlert from "../components/CustomAlert";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Header />
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundImage: "url('/home_waves2.svg')",
                    backgroundSize: "70%",
                    backgroundPositionX: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#F2A90040",
                }}
            >
                <Outlet />
            </Box>
            <Footer />
            <LoginModal />
            <ActionConfirmModal />
            <CustomAlert />
        </>
    );
}
