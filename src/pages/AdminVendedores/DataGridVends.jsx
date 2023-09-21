import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { DataGrid } from '@mui/x-data-grid';
import {  useSelector } from "react-redux";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 180 },
  { field: 'password', headerName: 'Contraseña', width: 130 },
  { field: 'enabled', headerName: 'Habilitado', width: 130 },
];

//==============COMPONENT=====================
export default function DataGridVends() {
  const rows = useSelector(state=>state.users);
  
  //----------------RENDER------------------
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}