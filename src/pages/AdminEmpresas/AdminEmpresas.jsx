import PanelBase from "../Dashboard/PanelBase";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { toast, Toaster } from "sonner";
import DataGridEmpresas from "./DataGridEmpresas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllOwners } from "../../redux/actions";

export default function AdminEmpresas() {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(getAllOwners());
  }, []);

  return (
    <PanelBase>
      <Toaster />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        width={"80vw"}
        padding={2}
        // border={1}
      >
        <Typography variant="h4" paddingBottom={2}>
          Mis Empresas
        </Typography>

        <DataGridEmpresas />
      </Box>
    </PanelBase>
  );
}
