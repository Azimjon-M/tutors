import React from "react";
import { Navigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const {role} = JSON.parse(localStorage.getItem("data"))
    
    const decryptedRole = CryptoJS.AES.decrypt(role, "key-one").toString(CryptoJS.enc.Utf8).trim();

    console.log("localS role: ", role);
    console.log("decryptedRole: ", decryptedRole);
    console.log("allowedRoles: ", allowedRoles);
    
    if (!allowedRoles.includes(decryptedRole)) {
        return <Navigate to="/not-authorized" />;
    }

    return children;
};

export default ProtectedRoute;
