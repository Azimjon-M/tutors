import React, { useState } from "react";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";
import Pagination from "../../../components/Pagination";

const BahMajburiyTadbirlar = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    // Pagination
    const [paginationData, setPaginationData] = useState({
        totalPages: 10,
        currentPage: 10,
    });

    const handlePageChange = (page) => {
        setPaginationData((prev) => ({ ...prev, currentPage: page }));
        console.log(`Page changed to: ${page}`);
    };
    // /Pagination

    const data = [
        {
            id: 1,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Shirin Asqarova",
            fakultet: "Fiz-Mat",
            taskCompleted: 0,
            taskTotal: 1,
            deadline: "1 oy",
            status: true,
            isRated: true,
            maxScore: 10,
            gradingTime: true,
        },
        {
            id: 2,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Shirin Asqarova",
            fakultet: "Fiz-Mat",
            taskCompleted: 0,
            taskTotal: 1,
            deadline: "1 oy",
            status: false,
            isRated: false,
            maxScore: 10,
            gradingTime: false,
        },
        {
            id: 3,
            rasm: "https://cdn.worldvectorlogo.com/logos/4x4-1.svg",
            name: "Azimjon Shukur",
            fakultet: "Fiz-Mat",
            taskCompleted: 1,
            taskTotal: 1,
            deadline: "1 oy",
            status: true,
            isRated: true,
            maxScore: 10,
            gradingTime: true,
        },
        {
            id: 4,
            rasm: "",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 1,
            taskTotal: 1,
            deadline: "1 oy",
            status: true,
            isRated: false,
            maxScore: 10,
            gradingTime: true,
        },
        {
            id: 5,
            rasm: "https://cdn.worldvectorlogo.com/logos/4x4-1.svg",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 2,
            taskTotal: 1,
            deadline: "1 oy",
            status: true,
            isRated: true,
            maxScore: 10,
            gradingTime: true,
        },
        {
            id: 6,
            rasm: "",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 2,
            taskTotal: 1,
            deadline: "1 oy",
            status: true,
            isRated: false,
            maxScore: 10,
            gradingTime: true,
        },
        {
            id: 7,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 0,
            taskTotal: 1,
            deadline: "1 oy",
            status: false,
            isRated: true,
            maxScore: 0,
            gradingTime: true,
        },
        {
            id: 8,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 1,
            taskTotal: 1,
            deadline: "1 oy",
            status: false,
            isRated: true,
            maxScore: 0,
            gradingTime: true,
        },
        {
            id: 9,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 2,
            taskTotal: 1,
            deadline: "1 oy",
            status: false,
            isRated: true,
            maxScore: 0,
            gradingTime: true,
        },
        {
            id: 10,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 2,
            taskTotal: 1,
            deadline: "1 oy",
            status: false,
            isRated: true,
            maxScore: 0,
            gradingTime: true,
        },
        {
            id: 11,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 2,
            taskTotal: 1,
            deadline: "1 oy",
            status: false,
            isRated: true,
            maxScore: 0,
            gradingTime: true,
        },
        {
            id: 12,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 2,
            taskTotal: 1,
            deadline: "1 oy",
            status: false,
            isRated: true,
            maxScore: 0,
            gradingTime: true,
        },
    ];

    const getByIdData = [
        {
            tasks: [
                {
                    id: 1,
                    title: "Afkksd akkmdoikjasidodj ijsio sapioj",
                    batafsil:
                        "OKOKoaskoa okasoadkdpaokdp idjjsf iniusda iaus diauhsdiuiuh hjuhauihdsuiahsuih iasoida a;lihjjkj",
                    file_1: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                    file_2: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                    file_3: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                    file_4: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                },
                {
                    id: 2,
                    title: "Afkksd akkmdoikjasidodj ijsio sapioj",
                    batafsil:
                        "OKOKoaskoa okasoadkdpaokdp idjjsf iniusda iaus diauhsdiuiuh hjuhauihdsuiahsuih iasoida",
                    file_1: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                    file_2: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                    file_3: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                    file_4: "https://image.shutterstock.com/image-photo/anime-artistic-image-cute-animae-600w-2428976759.jpg",
                },
            ],
            startTime: "01-01-2025",
            endTime: "06-01-2025",
            maxBal: 16,
            grade: 6,
        },
    ];

    const getMaxGreade = () => {
        return getByIdData[0]?.maxBal;
    };

    const handleChangeMaxBal = (e) => {
        const btn = document.getElementById("numberValue");
        let value = e.target.value;

        if (value > getMaxGreade()) {
            btn.value = getMaxGreade();
        }
    };

    const handleDownload = async (fileUrl) => {
        try {
            // Fetch yordamida faylni olish
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error("Faylni olishda xatolik yuz berdi");
            }

            // Faylni Blob formatida olish
            const blob = await response.blob();

            // Fayl uchun URL yaratish
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileUrl.split("/").pop(); // Fayl nomini URL'dan olish
            document.body.appendChild(link);

            // Linkni bosish
            link.click();

            // Linkni sahifadan olib tashlash
            document.body.removeChild(link);
        } catch (error) {
            console.error("Faylni yuklab olishda xatolik:", error);
        }
    };

    const getStatusColor = (taskTotal, taskCompleted) => {
        if (taskTotal === taskCompleted) {
            return "bg-green-500 text-white";
        } else if (taskCompleted === 0) {
            return "bg-red-500 text-white";
        } else {
            return "bg-yellow-500 text-white";
        }
    };

    const getStatus = (isRated, status) => {
        if (isRated && status) {
            return (
                <div className="text-green-500">
                    <MdCheckCircle className="mx-auto" />
                    <span>Baholandi</span>
                </div>
            );
        } else if (isRated && !status) {
            return (
                <div className="text-red-500">
                    <MdErrorOutline className="mx-auto" />
                    <span>Baholanmagan!</span>
                </div>
            );
        } else if (!isRated) {
            return (
                <div className="text-yellow-500">
                    <MdErrorOutline className="mx-auto" />
                    <span>Jarayonda</span>
                </div>
            );
        }
    };

    return (
        <div className="relative z-0">
            {data && data.length ? (
                <>
                    <div
                        className={`${
                            isOpenModal ? "z-20 opacity-100" : "-z-20 opacity-0"
                        } w-full h-full absolute top-[-0.5rem] right-0 bg-[#00000093] transition-[opacity] ease-linear duration-200`}
                    >
                        <div className="flex justify-end pl-4 pt-4 pr-4">
                            <button
                                onClick={() => setIsOpenModal(false)}
                                className="btn btn-sm btn-error text-xl text-white"
                            >
                                ✖
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-wrap items-center p-6 bg-white rounded-lg shadow-lg gap-8">
                                <div className="max-h-[700px] overflow-auto flex-1 space-y-6">
                                    {getByIdData[0]?.tasks?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                                        >
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Batafsil: {item.batafsil}
                                            </p>
                                            <table className="table-auto border-collapse mt-4 text-sm">
                                                <tbody>
                                                    {[
                                                        item.file_1,
                                                        item.file_2,
                                                        item.file_3,
                                                        item.file_4,
                                                    ].map(
                                                        (file, index) =>
                                                            file && (
                                                                <tr
                                                                    key={index}
                                                                    className="hover:bg-gray-50"
                                                                >
                                                                    <td className="px-2 py-1 text-center">
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td className="px-2 py-1">
                                                                        <a
                                                                            href={
                                                                                file
                                                                            }
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-600 hover:text-blue-800 underline"
                                                                        >
                                                                            Faylni
                                                                            ko'rish
                                                                        </a>
                                                                    </td>
                                                                    <td className="px-2 py-1 text-center">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDownload(
                                                                                    file
                                                                                )
                                                                            }
                                                                            className="px-2 py-1 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
                                                                        >
                                                                            Yuklab
                                                                            olish
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-[40%] bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                                        Baholash
                                    </h2>
                                    <div className="text-sm text-gray-600 mb-4">
                                        <p>
                                            <strong>Boshlangan vaqti:</strong>{" "}
                                            {getByIdData[0].startTime}
                                        </p>
                                        <p>
                                            <strong>Tugagan vaqti:</strong>{" "}
                                            {getByIdData[0].endTime}
                                        </p>
                                    </div>
                                    <form className="space-y-4">
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="numberValue"
                                                className="text-gray-700 font-medium"
                                            >
                                                <div className="flex justify-between">
                                                    <div>Baholash:</div>
                                                    <div>
                                                        Max bal:{" "}
                                                        {getMaxGreade()}
                                                    </div>
                                                </div>
                                            </label>
                                            <input
                                                type="number"
                                                id="numberValue"
                                                name="numberValue"
                                                min="0"
                                                onChange={handleChangeMaxBal}
                                                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-150"
                                        >
                                            Yuborish
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full bg-white shadow-md rounded-lg">
                        <div className="overflow-y-auto max-h-[800px]">
                            {/* Thead */}
                            <div className="sticky top-0 bg-gray-100 grid grid-cols-12 text-center shadow-[0_6px_6px_-2px_rgba(0,0,0,0.1)]">
                                <div className="py-3 px-4 text-sm font-medium text-gray-600 border-b">
                                    №
                                </div>
                                <div className="col-span-3 py-3 px-4 text-sm font-medium text-gray-600 border-b">
                                    Isim Familya
                                </div>
                                <div className=" col-span-2 py-3 px-4 text-sm font-medium text-gray-600 border-b">
                                    Fakulteti
                                </div>
                                <div className="py-3 px-4 text-sm font-medium text-gray-600 border-b">
                                    Top./Baj.
                                </div>
                                <div className="py-3 px-4 text-sm font-medium text-gray-600 border-b">
                                    Muddati
                                </div>
                                <div className="py-3 px-4 text-sm font-medium text-gray-600 border-b col-span-2">
                                    Baholangani
                                </div>
                                <div className="py-3 px-4 text-sm font-medium text-gray-600 border-b col-span-2">
                                    Baholash
                                </div>
                            </div>

                            {/* Tbody */}
                            <div>
                                {data.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-12 text-center hover:bg-gray-50 border-b"
                                    >
                                        <div className="py-3 px-4">
                                            {index + 1}
                                        </div>
                                        <div className="col-span-3 py-3 px-4 flex flex-grow items-center gap-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                                {item.rasm ? (
                                                    <img
                                                        src={item.rasm}
                                                        alt="person"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                        👤
                                                    </div>
                                                )}
                                            </div>
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="py-3 px-4 col-span-2 ">
                                            {item.fakultet}
                                        </div>
                                        <div className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 rounded text-sm ${getStatusColor(
                                                    item.taskTotal,
                                                    item.taskCompleted
                                                )}`}
                                            >
                                                {item.taskTotal}/
                                                {item.taskCompleted}
                                            </span>
                                        </div>
                                        <div className="py-3 px-4">
                                            {item.deadline}
                                        </div>
                                        <div className="py-3 px-4 col-span-2">
                                            {getStatus(
                                                item.isRated,
                                                item.status
                                            )}
                                        </div>
                                        <div className="py-3 px-4 col-span-2">
                                            {item.isRated && item.status ? (
                                                <span className="font-bold text-green-600">
                                                    Bahosi: {item.maxScore}
                                                </span>
                                            ) : !item.isRated &&
                                              item.gradingTime ? (
                                                <button
                                                    onClick={() =>
                                                        setIsOpenModal(true)
                                                    }
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                >
                                                    Baholash
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg"
                                                >
                                                    Baholash
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Pagination */}
                    <div className="py-4">
                        <Pagination
                            currentPage={paginationData.currentPage}
                            totalPages={paginationData.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            ) : (
                <div className="w-full py-4 border border-[red]">
                    <h1 className="text-center font-medium text-[red]">
                        Ma'lumot yo'q yohud olishda hatolik!
                    </h1>
                </div>
            )}
        </div>
    );
};

export default BahMajburiyTadbirlar;
