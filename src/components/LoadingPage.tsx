import { Box, Typography } from "@mui/material";

export default function LoadingPage() {
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
            <Typography>Loading page...</Typography>
        </Box>
    );
}
