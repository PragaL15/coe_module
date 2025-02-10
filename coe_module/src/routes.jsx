// RoutesComponent.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Faculty/Home";
import RequestForm from "./pages/Faculty/request"
import StatusPage from "./pages/Faculty/StatusTable"
import BoardHome from "./pages/BoardChairman/Home";
import BoardApproval from './pages/BoardChairman/approval_page'
import BoardAllocate from './pages/BoardChairman/alloacate'
import DisplayAllocation from './pages/Faculty/allocationPage'
import AdminAccess from './pages/admin/Adding_stuffs'
import DailyUpdates from './pages/Faculty/DailyPage'
import Price from './pages/Faculty/Price'
const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Faculty routes */}
        <Route path="/" element={<Login />} />
        <Route path="/FacHome" element={<Home />} />
        <Route path="/FacRequest" element={<RequestForm />} />
        <Route path="/FacRequestStatus" element={<StatusPage />} />
        <Route path="/DisplayAllocation" element={<DisplayAllocation />} />
        <Route path="/DailyUpdates" element={<DailyUpdates />} />
        <Route path="/FacultyPrice" element={<Price />} />
        {/* Board allocation */}
        <Route path="/BoardHome" element={<BoardHome />} />
        <Route path="/BoardApproval" element={<BoardApproval />} />
        <Route path="/BoardAllocation" element={<BoardAllocate />} />
        {/* Admin routes */}
        <Route path="/AdminAccess" element={<AdminAccess />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;