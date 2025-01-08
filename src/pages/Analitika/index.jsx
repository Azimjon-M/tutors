import React from "react";
import CryptoJS from "crypto-js";
import { Navigate } from "react-router-dom";
import SuperAdminStatistika from "../SuperAdminStatistika";
import AdminStatistika from "../AdminStatistika";
import TutorStatistika from "../TutorStatistika";

const Analitika = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const decryptedRole = CryptoJS.AES.decrypt(
        data?.role,
        process.env.REACT_APP_SHIFRED_ROLE
    )
        .toString(CryptoJS.enc.Utf8)
        .trim()
        .replace(/^"|"$/g, "");

    return (
        <>
            {decryptedRole === `superadmin` ? (
                <SuperAdminStatistika />
            ) : decryptedRole === `admin` ? (
                <AdminStatistika />
            ) : decryptedRole === `tutor` ? (
                <TutorStatistika />
            ) : (
                <Navigate to="/not-authorized" />
            )}
        </>
    );
};

export default Analitika;
