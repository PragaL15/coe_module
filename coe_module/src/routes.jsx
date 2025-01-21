// RoutesComponent.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Faculty/Home";
import RequestForm from "./pages/Faculty/request"
import StatusPage from "./pages/Faculty/StatusTable"
const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path="/FacHome" element={<Home />} />
        <Route path="/FacRequest" element={<RequestForm />} />
        <Route path="/FacRequestStatus" element={<StatusPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;