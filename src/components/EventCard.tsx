import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid2, Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import EventIcon from "@mui/icons-material/Event";
import { useRouter } from "@tanstack/react-router";

export default function EventCard({ id, title, description, resume, thumbnail, banner, location, date, slug }: EventType) {
    const router = useRouter();

    function handleClick() {
        router.navigate({ to: `/events/${slug}`, resetScroll: true });
    }

    return (
        <Card
            sx={{
                flexBasis: { xs: "100%", sm: "100%", md: "calc(50% - 8px)", lg: "calc(25% - 12px)" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" alt="event" height="140" image={thumbnail ?? "/cover.png"} />

                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        paddingBottom: "0px !important",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {resume ?? "No resume yet"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-end", alignItems: "flex-start" }}>
                        <Typography sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                            <PlaceIcon />
                            {location ? location : "No location yet."}
                        </Typography>
                        <Typography sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                            <EventIcon />
                            {date ? `${new Date(date).toLocaleDateString("en-US")} - ${new Date(date).toLocaleTimeString("en-US")}` : "No date yet."}
                        </Typography>
                    </Box>
                </CardContent>
            </Box>

            <CardActions sx={{ paddingTop: 2 }}>
                <Button fullWidth variant="contained" size="medium" color={"primary"} onClick={handleClick}>
                    See details
                </Button>
            </CardActions>
        </Card>
    );
}
