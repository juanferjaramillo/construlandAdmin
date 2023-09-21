import PanelBase from "../Dashboard/PanelBase";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataGridVends from "./DataGridVends";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

//================COMPONENT======================
export default function AdminVendedores() {
  const dispatch = useDispatch();
  const ownerId = useSelector((state) => state.authUser.id);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers(ownerId));
  }, []);

  const crearVendedorHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCrear = () => {
    setOpen(false);
    //LOGICA PARA CREAR EL NUEVO VENDEDOR EN LA BD
  }

  const modal = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Nuevo Vendedor</DialogTitle>
      <DialogContent
      >
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        <TextField
          autoFocus
          margin="normal"
          id="id"
          label="Identificación"
          type="text"
          fullWidth
          variant="filled"
        />
        <Divider />
        <TextField
          // autoFocus
          margin="normal"
          id="name"
          label="Nombre"
          type="text"
          // fullWidth
          variant="outlined"
        />
        <TextField
          // autoFocus
          margin="normal"
          id="psw"
          label="Contraseña"
          type="text"          
          // fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCrear}>Crear</Button>
      </DialogActions>
    </Dialog>
  );

  //-------------------RENDER------------------
  return (
    <PanelBase>
      {modal}
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        width={"80vw"}
        padding={2}
        // border={1}
      >
        <Typography variant="h4" paddingBottom={2}>
          Mis Vendedores
        </Typography>
        <DataGridVends />
        <Box display={"flex"} flexDirection={"row"}>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={crearVendedorHandler}
          >
            Crear Vendedor
          </Button>
        </Box>
      </Box>
    </PanelBase>
  );
}
