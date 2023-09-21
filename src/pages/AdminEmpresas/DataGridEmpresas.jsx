import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../redux/actions";
import axios from "axios";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "NOMBRE", width: 150, editable: false },
  {
    field: "password",
    headerName: "CLAVE",
    width: 130,
    editable: true,
  },
  { field: "plan", headerName: "PLAN", width: 80, editable: false },
  { field: "logoOwner", headerName: "LOGOTIPO", width: 130, editable: false },
  { field: "sloganOwner", headerName: "SLOGAN", width: 250, editable: false },
  { field: "cardType", headerName: "TARJETA", width: 100, editable: false },
  { field: "llegado", headerName: "DIAS LLEGADO", width: 100, editable: false },
];

//=====================COMPONENT=========================

export default function DataGridEmpresas() {
  const dispatch = useDispatch();

  const owners = useSelector(state=>state.owners)

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{ ml: "3vw" }}
        showColumnVerticalBorder={true}
        showCellVerticalBorder={true}
        rows={owners}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        // onCellEditStop={(element,newData) => {console.log(element), console.log(newData.target.value)} }
        pageSizeOptions={[5, 10]}
        // onCellEditStop={(prod, newData)=>handleCellChange(prod, newData)}
        // checkboxSelection
      />
    </div>
  );
}
