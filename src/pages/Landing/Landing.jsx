import React, { useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import Login from "../../components/Login/Login.jsx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";

const styles = {
  principal: {
    display: "flex",
    justifyContent: "center",
    aligntItems: "center",
    fontWeight: "bold",
    //border: "1px solid",
    width: "100vw",
    height: "100vh",
  },
  secondary: {
    display: "flex",
    justifyContent: "center",
    aligntItems: "center",
    fontWeight: "bold",
    //border: "1px solid",
    width: "100vw",
    height: "100vh",
  },
};

//===================Component==========================

export default function Landing() {
  const navigate = useNavigate();

  const handleInitLoad = async () => {
    try {
      await axios.get("/initLoad");
      toast("Datos iniciales cargados! 👍");
    } catch (err) {
      alert(err);
    }
  };
  
  return (
    <Box> 
      <Toaster />
      <Grid container sx={styles.principal}>
        <Grid
          item
          xs={10}
          md={4}
          order={{ xs: 2, md: 1 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item width={"90%"} sx={{ boxShadow: 10 }}>
            <img
              src="https://res.cloudinary.com/sthemma/construland/Logo_Construland.jpg"
              style={{ objectFit: "contain" }}
              width={"100%"}
              sx={{ boxShadow: "15" }}
            ></img>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 1, md: 2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Login />
        </Grid>
      </Grid>
      <Button onClick={handleInitLoad}>Init Load</Button>
    </Box>
  );
}
