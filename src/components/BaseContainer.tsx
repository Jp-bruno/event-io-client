import { Container, SxProps, Theme } from "@mui/material";
import { ReactNode } from "@tanstack/react-router";

export default function BaseContainer({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) {
    if (sx) {
        return (
            <Container maxWidth="xl" sx={{...sx}}>
                {children}
            </Container>
        );
    }
    return <Container maxWidth="xl">{children}</Container>;
}
