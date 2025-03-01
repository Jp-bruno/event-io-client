import { IconButton, Tooltip } from "@mui/material";
import { ReactElement } from "react";

export default function TooltipIconButton({ text, cb, icon }: { text: string; cb: (a?: any) => void; icon: ReactElement }) {
    return (
        <Tooltip title={text}>
            <IconButton size="small" onClick={cb}>
                {icon}
            </IconButton>
        </Tooltip>
    );
}
