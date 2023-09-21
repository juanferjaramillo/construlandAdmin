import PanelBase from "../Dashboard/PanelBase";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Input from "@mui/material/Input";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { getAuthUser } from "../../redux/actions";

export default function AdminConfiguracion() {
  const dispatch = useDispatch();

  const cp = useSelector((state) => state.authUser.colorPrimario);
  const cs = useSelector((state) => state.authUser.colorSecundario);
  const ct = useSelector((state) => state.authUser.colorTerciario);
  const llegado = useSelector((state) => state.authUser.llegado);
  const id = useSelector((state) => state.authUser.id);

  const refInLlegado = useRef();
  const refCP = useRef();
  const refCS = useRef();
  const refCT = useRef();

  const [colorPrimario, setColorPrimario] = useState(cp);
  const [colorSecundario, setColorSecundario] = useState(cs);
  const [colorTerciario, setColorTerciario] = useState(ct);
  const [limitado, setLimitado] = useState(null);
  const [agotado, setAgotado] = useState(null);
  const [llegadoN, setLlegadoN] = useState(llegado);

  useEffect(() => {
    refInLlegado.current.value = llegado;
    refCP.current.value = cp || "standard";
    refCS.current.value = cs || "standard";
    refCT.current.value = ct || "standard";
  }, []);

  const handleLlegadoChange = (event) => {
    refInLlegado.current.value = event.target.value;
    setLlegadoN(event.target.value);
  };

  const handleColorPrimario = (event) => {
    // refCP.current.value = event.target.value;
    setColorPrimario(event.target.value);
  };

  const handleColorSecundario = (event) => {
    setColorSecundario(event.target.value);
  };

  const handleColorTerciario = (event) => {
    setColorTerciario(event.target.value);
  };

  const handleAgotado = (event) => {
    setAgotado(event.target.value);
  };

  const handleLimitado = (event) => {
    setLimitado(event.target.value);
  };

  const handleGuardarConfig = async () => {
    // console.log("llegadoN", llegadoN);
    const updatedConfig = {
      id,
      colorPrimario,
      colorSecundario,
      colorTerciario,
      llegado: llegadoN,
    };
    let updateProdLimits = { ownerId: id };
    agotado ? (updateProdLimits.agotado = agotado) : null;
    limitado ? (updateProdLimits.limitado = limitado) : null;

    await axios.patch("/updateOwner", updatedConfig);
    await axios.patch(`/updateallproducts/`, updateProdLimits);
    dispatch(getAuthUser(id));
    toast.success("Configuración Guardada ✅");
  };

  //--------------------------------render------------------------------
  return (
    <PanelBase>
      <Toaster />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"80vw"}
        height={"80vh"}
        padding={2}
        // border={1}
      >
        <Typography variant="h4" paddingBottom={2}>
          Mis Configuraciones
        </Typography>
        <Grid
          item
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          width={"90%"}
          height={"50%"}
          sx={{ mt: 1 }}
        >
          <Grid
            item
            display={"flex"}
            flexDirection={"column"}
            width={"35%"}
            padding={1}
            border={1}
          >
            <Typography textAlign={"center"} variant="h7">
              Paleta de Colores
            </Typography>
            <Divider />

            <Grid
              item
              display={"Flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              margin={1}
            >
              <Typography>Primario (hex): #</Typography>
              <Grid item width={"90px"}>
                <Input onChange={handleColorPrimario} inputRef={refCP} />
              </Grid>
              <Grid
                item
                width={"20px"}
                height={"20px"}
                borderRadius={"50%"}
                backgroundColor={"#" + colorPrimario}
              ></Grid>
            </Grid>

            <Grid
              item
              display={"Flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              margin={1}
            >
              <Typography>Secundario (hex): #</Typography>
              <Grid item width={"90px"}>
                <Input onChange={handleColorSecundario} inputRef={refCS} />
              </Grid>
              <Grid
                item
                width={"20px"}
                height={"20px"}
                borderRadius={"50%"}
                backgroundColor={"#" + colorSecundario}
              ></Grid>
            </Grid>

            <Grid
              item
              display={"Flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              margin={1}
            >
              <Typography>Terciario (hex): #</Typography>
              <Grid item width={"90px"}>
                <Input onChange={handleColorTerciario} inputRef={refCT} />
              </Grid>
              <Grid
                item
                width={"20px"}
                height={"20px"}
                borderRadius={"50%"}
                backgroundColor={"#" + colorTerciario}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            display={"flex"}
            flexDirection={"column"}
            width={"35%"}
            padding={1}
            border={1}
          >
            <Typography textAlign={"center"} variant="h7">
              Indicador Global de Disponibilidad de Productos
            </Typography>
            <Divider />

            <Grid
              item
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"nowrap"}
              alignItems={"center"}
              marginBottom={1}
              marginLeft={"10%"}
              width={"80%"}
              marginTop={1}
            >
              <Typography paddingRight={5}>Llegado:</Typography>
              <Input
                inputRef={refInLlegado}
                onChange={handleLlegadoChange}
              ></Input>
              <Typography paddingRight={2}>días</Typography>
            </Grid>

            <Grid
              item
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"nowrap"}
              alignItems={"center"}
              marginLeft={"10%"}
              width={"70%"}
              // marginBottom={1}
            >
              <Typography paddingRight={5}>Limitado:</Typography>
              <Input onChange={handleLimitado}></Input>
              <Typography paddingRight={2}>%</Typography>
            </Grid>

            <Grid
              item
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"nowrap"}
              alignItems={"center"}
              marginLeft={"10%"}
              width={"70%"}
              // marginBottom={1}
            >
              <Typography paddingRight={5}>Agotado:</Typography>
              <Input onChange={handleAgotado}></Input>
              <Typography paddingRight={2}>%</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          alignContent={"center"}
          width={"90%"}
          // height={"40%"}
          marginTop={3}
          marginBottom={3}
          boxShadow={3}
        >
          <Typography textAlign={"center"} variant="h7">
            Estilo Global de Tarjetas de Producto
          </Typography>
          <Divider />
          <Grid
            item
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            // border={1}
          >
            <Grid
              item
              boxShadow={5}
              margin={2}
              marginLeft={3}
              sx={{ cursor: "pointer" }}
            >
              <Badge badgeContent={"✓"} color="primary">
                <img
                  src="https://res.cloudinary.com/sthemma/calixto/Tarjeta1.jpg"
                  style={{ objectFit: "contain" }}
                  height="160px"
                />
              </Badge>
            </Grid>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleGuardarConfig}>
          Guardar
        </Button>
      </Box>
    </PanelBase>
  );
}
