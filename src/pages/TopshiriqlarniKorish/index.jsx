import React, { useState } from "react";

const TopshiriqlarniKorish = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const formatDateToISO = (date) => {
        const [day, month, year] = date.split(".");
        return `${year}-${month}-${day}`;
    };

    const [faceData, setFaceData] = useState([
        {
            id: 1,
            title: "Matematika Darslari IJIOJ ijiojoi IJIJIJ iji",
            info: "Geometriya haqida qo'shimcha ma'lumotlarv kjsika ajsikjdioa ijio ihduiah sdhauisdhuia sdhuiahsduihauid hu",
            kategorya: "Majburiy",
            maxBal: "10",
            start: formatDateToISO("01.02.2024"),
            finish: formatDateToISO("02.02.2024"),
        },
        {
            id: 2,
            title: "Ingliz Tili",
            info: "Grammar topshiriqlari",
            kategorya: "O'z tashabbusi",
            maxBal: "6",
            start: formatDateToISO("03.02.2024"),
            finish: formatDateToISO("04.02.2024"),
        },
        {
            id: 3,
            title: "Fizika",
            info: "Mexanika bo'yicha masalalar",
            kategorya: "Qo'shimcha",
            maxBal: "3",
            start: formatDateToISO("05.02.2024"),
            finish: formatDateToISO("06.02.2024"),
        },
    ]);

    return (
        <div className="">
            <h1 className="text-2xl font-bold text-center my-6">
                Topshiriqlarni Ko'rish
            </h1>
            <div className="p-4">
                <div className="rounded-lg shadow-lg overflow-hidden">
                    <table className="table w-full text-center select-none rounded-lg ">
                        <thead className="bg-base-200 sticky top-0 z-10 border-b-2">
                            <tr className="text-sm bg-gray-100">
                                <th className="">№</th>
                                <th className="">Nomi</th>
                                <th className="">Batafsil</th>
                                <th className="">Kategorya</th>
                                <th className="">Max bal</th>
                                <th className="">Boshlanish</th>
                                <th className="">Tugash</th>
                                <th className="">Tahrirlash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faceData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#ececec] border-b-[1px] border-gray-200"
                                >
                                    <td className=" text-center">
                                        {index + 1}
                                    </td>
                                    <td className="max-w-[200px]">
                                        <div className="w-full px-4 line-clamp-1">
                                            {item.title}
                                        </div>
                                    </td>
                                    <td className="max-w-[300px]">
                                        <div className="w-full px-4 line-clamp-1">
                                            {item.info}
                                        </div>
                                    </td>
                                    <td className=" text-center">
                                        {item.kategorya}
                                    </td>
                                    <td className=" text-center">
                                        {item.maxBal}
                                    </td>
                                    <td className=" text-center">
                                        {item.start}
                                    </td>
                                    <td className=" text-center">
                                        {item.finish}
                                    </td>
                                    <td className=" text-center">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() =>
                                                setIsOpenModal(!isOpenModal)
                                            }
                                        >
                                            Tahrirlash
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopshiriqlarniKorish;
