import { Box, SxProps, Typography } from "@mui/material";
import { ReactNode } from "@tanstack/react-router";

export default function PageBase({ children, sx }: { children: ReactNode; sx?: SxProps }) {
    if (sx) {
        return (
            <Box
                sx={{
                    backgroundImage: `url('/home_waves2.svg')`,
                    backgroundSize: { xs: "100%", md: "70%" },
                    backgroundPositionX: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#F2A90040",
                    minHeight: "100vh",
                    ...sx,
                }}
            >
                {children}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                backgroundImage: `url('/home_waves2.svg')`,
                backgroundSize: { xs: "100%", md: "70%" },
                backgroundPositionX: "100%",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#F2A90040",
                minHeight: "100vh",
            }}
        >
            {children}
        </Box>
    );
}
