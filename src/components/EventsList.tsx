import { Box } from "@mui/material";
import EventCard from "./EventCard";
import { EventType } from "../types";

export default function EventsList({
    events,
}: {
    events: EventType[];
}) {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: { xs: 350, md: 750, lg: "100%" } }}>
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    id={event.id}
                    slug={event.slug}
                    title={event.title}
                    description={event.description}
                    resume={event.resume}
                    thumbnail={event.thumbnail}
                    banner={event.banner}
                    location={event.location}
                    date={event.date}
                />
            ))}
        </Box>
    );
}
