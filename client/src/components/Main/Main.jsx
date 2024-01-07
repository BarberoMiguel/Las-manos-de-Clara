import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Coleccion from "./Coleccion/Coleccion";
import Detalle from "./Detalle/Detalle";

const Main = () => {
  return (
    <main>
    <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/coleccion/:id" element={<Coleccion/>} />
        <Route path="/detalle/:id" element={<Detalle/>} />
        {/* <Route path="/create" element={<Create/>} /> */}
        <Route path="/*" element={<Navigate to={"/home"} />} />
      </Routes>
    </main>
  )
};

export default Main;
