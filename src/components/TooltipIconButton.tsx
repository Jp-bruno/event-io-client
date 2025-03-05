import { IconButton, SxProps, Tooltip } from "@mui/material";
import { ReactElement } from "react";

export default function TooltipIconButton({ text, cb, icon, sx }: { text: string; cb: (a?: any) => void; icon: ReactElement; sx?: SxProps }) {
    if (sx) {
        return (
            <Tooltip title={text}>
                <IconButton size="small" onClick={cb} color="primary" sx={sx}>
                    {icon}
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <Tooltip title={text}>
            <IconButton size="small" onClick={cb} color="primary">
                {icon}
            </IconButton>
        </Tooltip>
    );
}
