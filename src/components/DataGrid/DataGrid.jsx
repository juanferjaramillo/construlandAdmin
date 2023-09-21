import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "codigo", width: 100 },
  { field: "nombre", headerName: "nombre", width: 300 },
  {
    field: "precioBase",
    headerName: "Precio Base",
    width: 130,
    align: "center",
  },
  {
    field: "proveedor",
    headerName: "PROVEEDOR",
    width: 300,
    align: "center",
  },
  { field: "iva", headerName: "IVA", width: 50 },
];

//============================COMPONENT===================
function DataTable() {
  let myProds = useSelector((state) => state.filteredProducts);

  myProds = myProds.map((p, i) => {
    return {
      id: i,
      codigo: p.id,
      nombre: p.nombre,
      precioBase: p.precioBase,
      iva: `${p.tax.tax}%`,
      proveedor: p.provider.name,
    };
  });

  //--------------------Render----------------------
  return (
    <Box>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 10,
          width: "100vw",
          height: "90vh",
        }}
      >
        <Grid item sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Typography variant="h5">INFORMACION DE PRODUCTOS</Typography>
        </Grid>
        <DataGrid
          rows={myProds}
          columns={columns}
          showColumnVerticalBorder={true}
          showCellVerticalBorder={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Grid>
    </Box>
  );
}
export default DataTable;
