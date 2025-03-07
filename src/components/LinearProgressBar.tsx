import { Box, LinearProgress, Typography } from "@mui/material";

export default function LinearProgressBar({ progress, showPercentage }: { progress: number; showPercentage?: boolean }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            {showPercentage && (
                <Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>{`${Math.round(progress)}%`}</Typography>
                </Box>
            )}
        </Box>
    );
}
