import React from "react";
import StatistikBox from "../../components/StatistikBox";
import AdminImg from "../../assets/icons/icons8-police-100.png";
import Bachalor from "../../assets/icons/icons8-bachelor-64.png";
import Team from "../../assets/icons/icons8-users-100.png";

const Analitika = () => {
    
    // const testLink =
    //     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2Fillustrations%2Fperson-head-icon&psig=AOvVaw3X7J-elGum3xuv9j78fyJj&ust=1736228025140000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCID-wsev4IoDFQAAAAAdAAAAABAT";

    // ***** Statistika
    // const statistika = {
    //     fakultet: 2,
    //     guruh_soni: 2,
    //     jami_talaba: 213,
    //     ogl_talaba: 135,
    //     qiz_talaba: 178,
    //     grand_talaba: 21,
    //     kantrakt_talaba: 219,
    //     chinyetim: 9,
    //     yarimyetim: 14,
    //     noguron: 43,
    //     yoshlar_daftari: 23,
    //     temir_daftari: 23,
    //     ayollar_daftari: 23,
    //     ijimoiy_him_muh_talaba: 23,
    //     iqtidorli_talaba: 89,
    //     stipendiant_talaba: 54,
    //     chempion_talaba: 12,
    //     // Users
    //     users: {
    //         admins: 7,
    //         tutors: 11,
    //     },
    // };
    
    // const rytingTutor = {
    //     top: [
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //     ],
    //     middle: 12,
    //     lower: [
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //         {
    //             image: testLink,
    //             first_name: "Azimjon",
    //             last_name: "Meliboev",
    //         },
    //     ],
    // };



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

export default Analitika;
