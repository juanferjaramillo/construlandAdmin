import {useState} from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import DrawerContent from "./Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import {logout} from "../../redux/actions";
import TopBar from "./TopBar"

//===================component=============
function PanelBase(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  // const nameOwner = useSelector((state) => state.authUser.name);
  const sloganOwner = useSelector((state) => state.authUser.sloganOwner);

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate("/");
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;


    //---------------------------render-----------------------------
  return (
    <Box>
      <TopBar
      handleDrawerToggle={handleDrawerToggle}
      handleLogout={handleLogout}
      sloganOwner={sloganOwner}
      />

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: { sm: "100px" },
            flexShrink: { sm: 0 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "&.MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "100px",
              },
            }}
          >
            <DrawerContent />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "&.MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "100px",
              },
            }}
            open
          >
            <DrawerContent />
            {/* <Button onClick={() => navigate("/datagrid")}>TABLA</Button> */}
          </Drawer>
        </Box>

        <Box sx={{ position: "relative", zIndex: 1, marginTop: "64px" }}>
          {/* <Content /> */}
          {props.children}
        </Box>
      </Box>
      {/* <Modal>
        <EditForm />
      </Modal> */}
    </Box>
  );
}

export default PanelBase;
