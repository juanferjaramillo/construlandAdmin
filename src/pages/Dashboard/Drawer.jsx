import React, { useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessIcon from '@mui/icons-material/Business';
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import axios from "axios";

//======================Component===========================
function DrawerContent() {
  const [imagen, setImagen] = useState("");
  const navigate = useNavigate();
  const logoOwner = "https://res.cloudinary.com/sthemma/construland/Logo_Construland.jpg";
  // const logoOwner = useSelector((state) => state.authUser.logoOwner);
  const ownerId = useSelector((state) => state.authUser.id);
  const fileinput = useRef();

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    const uploadEndpoint =
      "https://api.cloudinary.com/v1_1/sthemma/image/upload/";
    for (let key in files) {

      if (typeof files[key] === "object") {
        formData.set("file", files[key]);
        formData.set("upload_preset", "sthemma_img_preset");
        formData.set("folder", `calixto/imgProductos/${ownerId}`);
        // console.log("formData", formData);
        const response = await axios.post(uploadEndpoint, formData);
        // console.log("response", response);
      }
    }
    // console.log("image uploaded");
    event.target.value = null;
  };

  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "sthemma_img_preset");
  //   formData.append("folder", "calixto/imgProductos" )
  //   const uploadEndpoint =
  //     "https://api.cloudinary.com/v1_1/sthemma/image/upload/";

  //   const response = await axios.post(uploadEndpoint, formData,);
  //   console.log("response", response);
  //   console.log("image uploaded");
  //   event.target.value = null;
  // };

  const handleDrop = (files) => {
    // Push all the axios request promise (into a single array
    const uploaders = files.map(async (file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "pvhilzh7"); // Replace the preset name with your own
      formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/codeinfuse/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          // console.log(data);
        });
    });
  };

  //------------------render---------------------------
  return (
    <Box>
      <input
        type="file"
        accept=".jpg"
        multiple={true}
        ref={fileinput}
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="jpg-input"
        fileinput={null}
      />

      {/* <Dropzone 
  onDrop={handleDrop} 
  multiple={true}
  accept="image/*" 
  style={styles.dropzone}>
  <p>Drop your files or click here to upload</p>
</Dropzone> */}

      <Grid item>
        <img
          height="55vh"
          width="180vh"
          alt="Logo Cliente"
          src={logoOwner}
          onClick={() => navigate("/dashboard")}
          style={{ objectFit: "contain", cursor: "pointer" }}
        />
      </Grid>
      <Divider />
      {ownerId !== 0 ? (
        <List>
          <ListItem key={"miEmpresa"} disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <BusinessIcon />
              <ListItemText sx={{ marginLeft: 1 }} primary="Mi Empresa" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Productos"} disablePadding>
            <ListItemButton onClick={() => navigate("/adminProductos")}>
              <LocalGroceryStoreIcon />
              <ListItemText sx={{ marginLeft: 1 }} primary="Productos" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}
      {/* <Divider />
      <List>
      <ListItem key={"Portfolios"} disablePadding>
        <ListItemButton
        onClick={()=>navigate('/adminPortafolios')}
        >
          <FolderCopyIcon />
          <ListItemText sx={{ marginLeft: 1 }} primary="Portfolios" />
        </ListItemButton>
      </ListItem>
    </List> */}
      {/* {ownerId !== 0 ? (
        <>
          <Divider />
          <List>
            <ListItem key={"Vendedores"} disablePadding>
              <ListItemButton onClick={() => navigate("/adminVendedores")}>
                <PeopleIcon />
                <ListItemText sx={{ marginLeft: 1 }} primary="Vendedores" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : null} */}

      {ownerId !== 0 ? (
        <>
          <Divider />
          <List>
            <ListItem key={"Configuración"} disablePadding>
              <ListItemButton onClick={() => navigate("/adminConfiguracion")}>
                <SettingsIcon />
                <ListItemText sx={{ marginLeft: 1 }} primary="Configuración" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : null}

      {/* <Divider />
      <List>
      <ListItem key={"Estadísticas"} disablePadding>
        <ListItemButton
        onClick={()=>navigate('/adminEstadisticas')}
        >
          <BarChartIcon />

          <ListItemText sx={{ marginLeft: 1 }} primary="Estadísticas" />
        </ListItemButton>
      </ListItem>

    </List> */}
      {ownerId === 0 ? (
        <>
          <Divider />
          <List>
            <ListItem key={"Empresas"} disablePadding>
              <ListItemButton onClick={() => navigate("/adminEmpresas")}>
                <FactoryIcon />
                <ListItemText sx={{ marginLeft: 1 }} primary="Factory" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : null}

      {ownerId === 0 ? (
        <>
          <List>
            <ListItem key={"Imagen"} disablePadding>
              <ListItemButton
                onClick={(e) =>
                  fileinput.current ? fileinput.current.click() : null
                }
              >
                <FactoryIcon />
                <ListItemText sx={{ marginLeft: 1 }} primary="Imagen" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : null}
    </Box>
  );
}

export default DrawerContent;
