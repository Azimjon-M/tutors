import React from "react";
import StatistikBox from "../../components/StatistikBox";
import AdminImg from "../../assets/icons/icons8-police-100.png";
import Bachalor from "../../assets/icons/icons8-bachelor-64.png";
import Team from "../../assets/icons/icons8-users-100.png";
import Person from "../../assets/icons/person.png"

const SuperAdminStatistika = () => {
    const talabalarType = [
        "Jami",
        "O'g'il",
        "Qiz",
        "Grant",
        "Kantrakt",
        "Iqtidorli",
        "Stipendiant",
        "Chempion",
        "Yoshlar daftari",
        "Temir daftai",
        "Ayyollar daftari",
        "Ijtimoiy himoyaga muhtoj",
        "Chinyetim",
        "Yetim",
    ];

    const uploadData = [];

    for (let i = 0; i < talabalarType.length; i++) {
        uploadData.push({
            id: i + 1,
            name: talabalarType[i],
            numbers: 231,
            icon: Bachalor,
        });
    }

    const dataStatistikaUser = [
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
            icon: Person,
            unit: "ta",
        },
    ];

    const dataStatistikaTutor = [
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

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-medium">Foydalanuvchilar:</h1>
            <div className="flex flex-wrap justify-start items-center gap-3">
                {dataStatistikaUser.map((data) => (
                    <StatistikBox key={data.id} data={data} />
                ))}
            </div>
            <h1 className="my-4 text-2xl font-medium">Tyutorlar:</h1>
            <div className="flex flex-wrap justify-start items-center gap-3">
                {dataStatistikaTutor.map((data) => (
                    <StatistikBox key={data.id} data={data} />
                ))}
            </div>
            <h1 className="my-4 text-2xl font-medium">Talaba</h1>
            <div className="flex flex-wrap justify-start gap-3">
                {uploadData?.map((item) => (
                    <div key={item.id}>
                        <StatistikBox data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuperAdminStatistika;
