import React from "react";
import StatistikBox from "../../components/StatistikBox";
import AdminImg from "../../assets/icons/icons8-police-100.png";
import Bachalor from "../../assets/icons/icons8-bachelor-64.png";
import Team from "../../assets/icons/icons8-users-100.png";

const SuperAdminStatistika = () => {

    const dataStatTutor = [
        {
            id: 3,
            name: "Top 5",
            numbers: 18,
            color: "#00FF0080",
            icon: Team,
            unit: "%",
        },
        {
            id: 4,
            name: "O'rta",
            numbers: 68,
            color: "#ffad3180",
            icon: Team,
            unit: "%",
        },
        {
            id: 5,
            name: "Quyi 5",
            numbers: 24,
            color: "#FF000080",
            icon: Team,
            unit: "%",
        },
    ];
    const dataStatUser = [
        {
            id: 1,
            name: "Adminlar",
            numbers: 7,
            color: "#80808080",
            icon: AdminImg,
            unit: "ta",
        },
        {
            id: 2,
            name: "Tyutorlar",
            numbers: 29,
            color: "#80808080",
            icon: Bachalor,
            unit: "ta",
        },
    ];


    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-medium">Foydalanuvchilar:</h1>
            <div className="flex flex-wrap justify-start items-center gap-3">
                {dataStatUser.map((data) => (
                    <StatistikBox key={data.id} data={data} />
                ))}
            </div>
            <h1 className="my-4 text-2xl font-medium">Tyutorlar:</h1>
            <div className="flex flex-wrap justify-start items-center gap-3">
                {dataStatTutor.map((data) => (
                    <StatistikBox key={data.id} data={data} />
                ))}
            </div>
        </div>
    );
};

export default SuperAdminStatistika;
