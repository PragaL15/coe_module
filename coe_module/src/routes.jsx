// RoutesComponent.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Faculty/Home";
import RequestForm from "./pages/Faculty/request"
const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path="/FacHome" element={<Home />} />
        <Route path="/FacRequestForm" element={<RequestForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;