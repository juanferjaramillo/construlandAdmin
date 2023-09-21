import React from "react";
import Box from "@mui/material/Box";
import useProducts from "../../hooks/useProducts";
import OwnerProfile from "./OwnerProfile.jsx";

export default function Content({ setModalOpen, modalOpen }) {
  const products = useProducts();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        padding: "10px",
        marginTop: "20px",
        justifyContent: "space-around",
      }}
    >
      
      <OwnerProfile />
    </Box>
  );
}
