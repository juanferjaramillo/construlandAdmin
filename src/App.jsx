import React from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import axios from "axios";
import Landing from './pages/Landing/Landing';
import DataGrid from "./components/DataGrid/DataGrid.jsx"
import AdminProductos from "./pages/AdminProductos/AdminProductos.jsx"
import AdminVendedores from './pages/AdminVendedores/AdminVendedores';
import AdminConfiguracion from './pages/AdminConfiguracion/AdminConfiguracion';
import AdminPortafolios from './pages/AdminPortafolios/AdminPortafolios';
import AdminEstadisticas from './pages/AdminEstadisticas/AdminEstadisticas';
import AdminEmpresas from './pages/AdminEmpresas/AdminEmpresas';


axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />}></Route>
      <Route path={"/dashboard"} element={<Dashboard />}></Route>
      <Route path={"/datagrid"} element={<DataGrid />}></Route>
      <Route path={"/adminProductos"} element={<AdminProductos />}></Route>
      <Route path={"/adminVendedores"} element={<AdminVendedores />}></Route>
      <Route path={"/adminConfiguracion"} element={<AdminConfiguracion />}></Route>
       <Route path={"/adminPortafolios"} element={<AdminPortafolios />}></Route>
      <Route path={"/adminEstadisticas"} element={<AdminEstadisticas />}></Route>
      <Route path={"/adminEmpresas"} element={<AdminEmpresas />}></Route>
    </Routes>
  );
};
export default App;
