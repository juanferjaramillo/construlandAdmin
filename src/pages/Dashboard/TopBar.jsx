import {
  AppBar,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function TopBar (props) {

    return (
        <AppBar
        sx={{
          // ml: "30vw",
          // width: "82vw",
          width: { md: `calc(100% - 180px)` },
          ml: { md: `100px` },
          height: "64px",
          backgroundColor: "red",
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexGrow: 1,
          zIndex: 2,
          padding: 2,
        }}
      >
        <IconButton
          onClick={props.handleDrawerToggle}
          sx={{
            display: { xs: "flex", sm: "none" },
            height: "50px",
            width: "50px",
            justifyContent: "center",
            marginLeft: "12px",
          }}
        >
          <MenuIcon />
        </IconButton>

        <Grid item>
          <Typography
            component="div"
            sx={{ fontSize: { xs: "100%", md: "130%", md: "160%" } }}
          >
            {"Construye tu mundo"}
          </Typography>
        </Grid>
        
        <Grid>
          <Button
          variant="outlined"
          onClick={props.handleLogout}
          sx={{color: "white",fontSize: { xs: "80%", md: "90%", md: "100%" }}}
          >
            Salir
          </Button>
        </Grid>
      </AppBar>
    )
}