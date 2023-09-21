import PanelBase from "../Dashboard/PanelBase";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AdminPortafolios() {

    return (
        <PanelBase>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width={"80vw"}
          padding={2}
          // border={1}
        >
          <Typography variant="h4" paddingBottom={2}>
            Mis Portafolios
          </Typography>
          </Box>
          </PanelBase>
    )
}