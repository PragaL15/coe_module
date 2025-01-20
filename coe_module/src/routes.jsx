// RoutesComponent.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Faculty/Home";
const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path="/FacHome" element={<Home />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;