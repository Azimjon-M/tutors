import React from "react";
import { Navigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
        return <Navigate to="/not-authorized" />;
    }

    const decryptedRole = CryptoJS.AES.decrypt(
        data?.role,
        process.env.REACT_APP_SHIFRED_ROLE
    )
        .toString(CryptoJS.enc.Utf8)
        .trim();

    if (!allowedRoles.includes(decryptedRole)) {
        return <Navigate to="/not-authorized" />;
    }

    return children;
};

export default ProtectedRoute;
