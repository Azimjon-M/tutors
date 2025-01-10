import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";

const BahMajburiyTTJTashrif = () => {
    const status = { green: "green", yellow: "yellow", red: "red" };

    const data = [
        {
            id: 1,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Shirin Asqarova",
            fakultet: "Fiz-Mat",
            taskCompleted: 0,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.red,
            isRated: status.yellow,
            score: 10,
        },
        {
            id: 2,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Shirin Asqarova",
            fakultet: "Fiz-Mat",
            taskCompleted: 0,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.red,
            isRated: status.green,
            score: 10,
        },
        {
            id: 3,
            rasm: "https://cdn.worldvectorlogo.com/logos/4x4-1.svg",
            name: "Azimjon Shukur",
            fakultet: "Fiz-Mat",
            taskCompleted: 1,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.yellow,
            isRated: status.yellow,
            score: 10,
        },
        {
            id: 4,
            rasm: "",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 1,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.yellow,
            isRated: status.green,
            score: 10,
        },
        {
            id: 5,
            rasm: "https://cdn.worldvectorlogo.com/logos/4x4-1.svg",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 2,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.green,
            isRated: status.yellow,
            score: 10,
        },
        {
            id: 6,
            rasm: "",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 2,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.green,
            isRated: status.green,
            score: 10,
        },
        {
            id: 7,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 0,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.red,
            isRated: status.red,
            score: 0,
        },
        {
            id: 8,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 1,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.yellow,
            isRated: status.red,
            score: 0,
        },
        {
            id: 9,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 2,
            taskTotal: 2,
            deadline: "1 hafta",
            status: status.green,
            isRated: status.red,
            score: 0,
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "green":
                return "bg-green-500 text-white";
            case "yellow":
                return "bg-yellow-500 text-white";
            case "red":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-300 text-black";
        }
    };

    return (
        <div>
            <h3 className="text-center text-lg font-bold text-gray-900 dark:text-white mb-2">
                TTJga tashrif
            </h3>
            <div className="overflow-x-auto p-4">
                <table className="text-center table w-full border border-gray-300">
                    <thead className="bg-gray-200 border-b border-gray-300">
                        <tr>
                            <th className="py-2 px-4 border-r border-gray-300">
                                №
                            </th>
                            <th className="py-2 px-4 border-r border-gray-300">
                                Isim Familya
                            </th>
                            <th className="py-2 px-4 border-r border-gray-300">
                                Fakulteti
                            </th>
                            <th className="py-2 px-4 border-r border-gray-300">
                                Topshiriq / Bajargani
                            </th>
                            <th className="py-2 px-4 border-r border-gray-300">
                                Muddati
                            </th>
                            <th className="py-2 px-4 border-r border-gray-300">
                                Baholangani
                            </th>
                            <th className="py-2 px-4 border-r border-gray-300">
                                Baholash
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-100 border-b border-gray-300"
                            >
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300 relative">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-[30px] h-[30px] border rounded-full flex items-center justify-center overflow-hidden">
                                            {item.rasm ? (
                                                <img
                                                    src={item.rasm}
                                                    alt="person"
                                                />
                                            ) : (
                                                <FaUserAlt className="text-sm" />
                                            )}
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {item.fakultet}
                                </td>
                                <td className="border-r border-gray-300">
                                    <div
                                        className={`rounded-lg text-center p-1 ${getStatusColor(
                                            item.status
                                        )}`}
                                    >
                                        {item.taskTotal}/{item.taskCompleted}
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {item.deadline}
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {item.isRated === "green" ? (
                                        <div>
                                            <MdCheckCircle className="text-green-500 text-lg mx-auto" />
                                            <span>Baholandi</span>
                                        </div>
                                    ) : item.isRated === "yellow" ? (
                                        <div>
                                            <MdErrorOutline className="text-yellow-500 text-lg mx-auto" />
                                            <span>Jarayonda</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <MdErrorOutline className="text-red-500 text-lg mx-auto" />
                                            <span>Baholanmagan!</span>
                                        </div>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {item.isRated === "yellow" ? (
                                        <button
                                            disabled={
                                                item.isRated === "green" && true
                                            }
                                            className={`btn btn-sm bg-green-500 hover:bg-green-600 active:bg-green-500  text-white rounded-lg`}
                                        >
                                            Baholash
                                        </button>
                                    ) : (
                                        <div>
                                            <strong>Bahosi: </strong>
                                            {item.score}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BahMajburiyTTJTashrif;
