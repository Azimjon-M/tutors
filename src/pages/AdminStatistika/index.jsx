import React from "react";
import StatistikBox from "../../components/StatistikBox";
import StatistikBoxGuruhSardor from "../../components/StatistikBoxGuruhSardor";
import Bachalor from "../../assets/icons/icons8-bachelor-64.png";
import Team from "../../assets/icons/icons8-users-100.png";
import Person from "../../assets/icons/person.png";
import User from "../../assets/icons/user.svg"

const AdminStatistika = () => {
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
    // {
    //     id: 1,
    //     name: "Adminlar",
    //     numbers: 7,
    //     color: "#80808080",
    //     icon: AdminImg,
    //     unit: "ta",
    // },
    {
      id: 2,
      name: "Tyutorlar",
      numbers: 6,
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

  const dataStatistikaGuruhSardor = [
    {
      id: 3,
      group: "01-21",
      last_name: "Abdupattoyev",
      first_name: "Jasur",
      number: "+998901234567",
      icon: User,
    },
    {
      id: 4,
      group: "02-22",
      last_name: "Ikromov",
      first_name: "Bobur",
      number: "+998958526341",
      icon: User,
    },
    {
      id: 5,
      group: "03-23",
      last_name: "Abdurashidov",
      first_name: "Akrom",
      number: "+998936984521",
      icon: User,
    },
    {
      id: 6,
      group: "01-21",
      last_name: "Abdupattoyev",
      first_name: "Jasur",
      number: "+998901234567",
      icon: User,
    },
    {
      id: 7,
      group: "02-22",
      last_name: "Ikromov",
      first_name: "Bobur",
      number: "+998958526341",
      icon: User,
    },
    {
      id: 8,
      group: "03-23",
      last_name: "Abdurashidov",
      first_name: "Akrom",
      number: "+998936984521",
      icon: User,
    },
    {
      id: 9,
      group: "01-21",
      last_name: "Abdupattoyev",
      first_name: "Jasur",
      number: "+998901234567",
      icon: User,
    },
    {
      id: 10,
      group: "02-22",
      last_name: "Ikromov",
      first_name: "Bobur",
      number: "+998958526341",
      icon: User,
    },
    {
      id: 11,
      group: "03-23",
      last_name: "Abdurashidov",
      first_name: "Akrom",
      number: "+998936984521",
      icon: User,
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
      <h1 className="my-4 text-2xl font-medium">Guruh sardorlari</h1>
      <div className="flex flex-wrap justify-start gap-3">
        {dataStatistikaGuruhSardor?.map((item) => (
          <div key={item.id}>
            <StatistikBoxGuruhSardor data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStatistika;
