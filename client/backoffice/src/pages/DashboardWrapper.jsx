import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import PrestataireDashboard from "./prestataire/PrestataireDashboard";

export const DashboardWrapper = ({ role }) => {
  return (
    <>{role === "ROLE_ADMIN" ? <AdminDashboard /> : <PrestataireDashboard />}</>
  );
};
