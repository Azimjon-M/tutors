import React from "react";
import { Navigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const {role} = JSON.parse(localStorage.getItem("data"))
    
    const decryptedRole = CryptoJS.AES.decrypt(role, "key-one").toString(CryptoJS.enc.Utf8).trim();
    
    if (!allowedRoles.includes(decryptedRole)) {
        return <Navigate to="/not-authorized" />;
    }

    return children;
};

export default ProtectedRoute;
