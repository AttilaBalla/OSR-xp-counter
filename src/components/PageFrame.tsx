import {Box} from "@mui/material";
import {PropsWithChildren} from "react";

export function PageFrame(props: PropsWithChildren) {
  return (
    <Box sx={{maxWidth: '1440px', margin: 'auto', padding: '2rem'}}>
      {props.children}
    </Box>
  )
}