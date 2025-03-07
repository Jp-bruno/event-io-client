import { Box, styled, Typography } from "@mui/material";
import { useState } from "react";
import UpdateUserImageModal from "./UpdateUserImageModal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const StyledBox = styled(Box)`
    width: 100px;
    height: 100px;
    border-radius: 500px;
    position: relative;
    cursor: pointer;
    background-color: #00000050;

    .no-image,
    .has-image {
        width: 100px;
        height: 100px;
        border-radius: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        inset: 0;
        margin: auto;
        position: absolute;
        color: white;
    }

    .has-image {
        opacity: 0;
        background-color: #00000050;
    }

    &:hover {
        border: 0;

        .has-image {
            opacity: 1;
        }
    }
`;


export default function UserImage({ image }: { image?: string }) {
    const [updateUserImageModalState, setUpdateUserImageModalState] = useState(false);

    if (!image) {
        return (
            <StyledBox>
                <Box className="no-image" onClick={() => setUpdateUserImageModalState(true)}>
                    <AddAPhotoIcon />
                    <Typography>Add photo</Typography>
                </Box>
                <UpdateUserImageModal isOpen={updateUserImageModalState} close={() => setUpdateUserImageModalState(false)} />
            </StyledBox>
        );
    }

    return (
        <StyledBox sx={{ backgroundImage: `url('${image}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <Box className="has-image" onClick={() => setUpdateUserImageModalState(true)}>
                <AddAPhotoIcon />
                <Typography textAlign="center">Update photo</Typography>
            </Box>
            <UpdateUserImageModal isOpen={updateUserImageModalState} close={() => setUpdateUserImageModalState(false)} currentImage={image} />
        </StyledBox>
    );
}
