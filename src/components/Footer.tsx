import { Box, Grid2, Typography } from "@mui/material";
import BaseContainer from "./BaseContainer";
import { Link } from "@tanstack/react-router";
import styled from "@emotion/styled";
import { theme } from "../theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const FakeLink = styled.li`
    cursor: pointer;
    text-underline-offset: 3px;
    &:hover {
        text-decoration: underline;
    }
`;

const FakeSocialLink = styled.li`
    cursor: pointer;
    text-underline-offset: 3px;

    &:hover {
        text-decoration: underline;
    }
`;

const social = [<FacebookIcon />, <InstagramIcon />, <LinkedInIcon />, <YouTubeIcon />];

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 10, backgroundColor: theme.palette.secondary.main }}>
            <BaseContainer sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Box component="ul" sx={{ paddingLeft: { xs: 0, md: "40px" } }}>
                    <Link to="/" style={{ marginLeft: -40 }}>
                        <img src={"/default-monochrome.svg"} alt="Event-io" width={150} />
                    </Link>
                    <FakeLink>
                        <Typography color="textSecondary">About us</Typography>
                    </FakeLink>
                    <FakeLink>
                        <Typography color="textSecondary">Contact</Typography>
                    </FakeLink>
                    <FakeLink>
                        <Typography color="textSecondary">Work with us</Typography>
                    </FakeLink>
                </Box>

                <Box component={"ul"} sx={{ display: "flex", columnGap: 2, paddingLeft: { xs: 0, md: "40px" }, marginTop: 2, justifyContent: {xs: "center", md: "flex-start"} }}>
                    <FakeSocialLink>
                        <FacebookIcon color="primary" />
                    </FakeSocialLink>
                    <FakeSocialLink>
                        <InstagramIcon color="primary" />
                    </FakeSocialLink>
                    <FakeSocialLink>
                        <LinkedInIcon color="primary" />
                    </FakeSocialLink>
                    <FakeSocialLink>
                        <YouTubeIcon color="primary" />
                    </FakeSocialLink>
                </Box>
            </BaseContainer>
        </Box>
    );
}
