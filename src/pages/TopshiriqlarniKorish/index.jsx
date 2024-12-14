import React, { useEffect, useMemo, useState } from "react";

const TopshiriqlarniKorish = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTutors, setSelectedTutors] = useState([]);
    const [faceData, setFaceData] = useState([
        {
            id: 1,
            title: "Matematika Darslari asdjkbj asuhdiauhsdi uuhas iduhaius",
            info: "Geometriya haqida qo'shimcha ma'lumotlar aosihdio ioajsodiaj io0sjj oiasjdio joijosidsjadidosja iojoiasjjdio",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "01.02.2024",
            finish: "02.02.2024",
        },
        {
            id: 2,
            title: "Ingliz Tili",
            info: "Grammar topshiriqlari",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "03.02.2024",
            finish: "04.02.2024",
        },
        {
            id: 3,
            title: "asdas fs Tili",
            info: "s dgghfg g topshiriqlari",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "03.02.2024",
            finish: "04.02.2024",
        },
        {
            id: 4,
            title: "sdf sghsdfdhdd  Tili",
            info: "Gramsdg dfamar topshiriqlari",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "03.02.2024",
            finish: "04.02.2024",
        },
        {
            id: 5,
            title: "sdf sghsdfdhdd  Tili",
            info: "Gramsdg dfamar topshiriqlari",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "03.02.2024",
            finish: "04.02.2024",
        },
        {
            id: 6,
            title: "sdf sghsdfdhdd  Tili",
            info: "Gramsdg dfamar topshiriqlari",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "03.02.2024",
            finish: "04.02.2024",
        },
        {
            id: 7,
            title: "sdf sghsdfdhdd  Tili",
            info: "Gramsdg dfamar topshiriqlari",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "03.02.2024",
            finish: "04.02.2024",
        },
        {
            id: 8,
            title: "sdf sghsdfdhdd  Tili",
            info: "Gramsdg dfamar topshiriqlari",
            file1: {},
            file2: {},
            file3: {},
            file4: {},
            start: "03.02.2024",
            finish: "04.02.2024",
        },
    ]);
    const tutors = useMemo(
        () => [
            { id: 1, name: "Abdulla Karimov", fak: "Fiz-Mat " },
            { id: 2, name: "Muhammad Aliyev", fak: "Fiz-Mat" },
            { id: 3, name: "Saida Rasulova", fak: "Fiz-Mat" },
            { id: 4, name: "Abdulla Karimov", fak: "Fiz-Mat" },
            { id: 5, name: "Muhammad Aliyev", fak: "Fiz-Mat" },
            { id: 6, name: "Saida Rasulova", fak: "Fiz-Mat" },
            { id: 7, name: "Abdulla Karimov", fak: "Fiz-Mat" },
            { id: 8, name: "Muhammad Aliyev", fak: "Fiz-Mat" },
            { id: 9, name: "Saida Rasulova", fak: "Fiz-Mat" },
        ],
        []
    );
    // `tutors` ni barqaror qilish uchun useMemo
    const stableTutors = useMemo(() => tutors, [tutors]);
    // "Hammaga yuborish" checkbox holatini tekshirish
    useEffect(() => {
        if (selectedTutors.length === stableTutors.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedTutors, stableTutors]);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedTutors(stableTutors.map((tutor) => tutor.id)); // Hammasini tanlash
        } else {
            setSelectedTutors([]); // Hammasini bekor qilish
        }
    };

    const handleTutorSelect = (tutorId, checked) => {
        if (checked) {
            setSelectedTutors([...selectedTutors, tutorId]);
        } else {
            setSelectedTutors(selectedTutors.filter((id) => id !== tutorId));
        }
    };

    // const onEdit = (id) => {
    //     console.log(`Tahrirlanayotgan topshiriq IDsi: ${id}`);
    //     // Tahrirlash jarayoniga o'tish logikasini shu yerda yozing.
    // };

    const onSave = (id, updatedData) => {
        setFaceData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, ...updatedData } : item
            )
        );
    };

    const [editingRow, setEditingRow] = useState(null); // Hozirda tahrirlanayotgan qator
    const [editedData, setEditedData] = useState({}); // Tahrirlanayotgan ma'lumotlar

    const handleEditClick = (item) => {
        setEditingRow(item.id); // Tahrirlanayotgan qatorni aniqlash
        setEditedData({ ...item }); // Tahrir uchun ma'lumotlarni yuklash
    };

    const handleInputChange = (field, value) => {
        setEditedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = () => {
        onSave(editingRow, editedData); // O‘zgartirishlarni saqlash
        setEditingRow(null); // Tahrirlash rejimini o‘chirish
    };

    return (
        <div className="w-full flex flex-col 2xl:flex-row justify-center items-start gap-1 sm:p-2 lg:p-4">
            <div className="w-full 2xl:w-[60%] overflow-x-auto max-h-[300px] sm:max-h-[400px] 2xl:max-h-full">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Nomi</th>
                            <th className="hidden lg:table-cell">Batafsil</th>
                            <th className="hidden md:table-cell">Boshlanish</th>
                            <th>Tugash</th>
                            <th>Tahrirlash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faceData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {editingRow === item.id ? (
                                        <input
                                            type="text"
                                            value={editedData.title || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="input input-bordered input-sm w-full"
                                        />
                                    ) : (
                                        <h1 className="line-clamp-1 max-w-[200px]">
                                            {item.title}
                                        </h1>
                                    )}
                                </td>
                                <td className="hidden lg:table-cell">
                                    {editingRow === item.id ? (
                                        <input
                                            type="text"
                                            value={editedData.info || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "info",
                                                    e.target.value
                                                )
                                            }
                                            className="input input-bordered input-sm w-full"
                                        />
                                    ) : (
                                        <h1 className="line-clamp-1 max-w-[200px]">
                                            {item.info}
                                        </h1>
                                    )}
                                </td>
                                <td className="hidden md:table-cell">{item.start}</td>
                                <td>
                                    {editingRow === item.id ? (
                                        <input
                                            type="date"
                                            value={editedData.finish || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "finish",
                                                    e.target.value
                                                )
                                            }
                                            className="input input-bordered input-sm w-full"
                                        />
                                    ) : (
                                        item.finish
                                    )}
                                </td>
                                <td>
                                    {editingRow === item.id ? (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={handleSaveClick}
                                        >
                                            Saqlash
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() =>
                                                handleEditClick(item)
                                            }
                                        >
                                            Tahrirlash
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="w-full 2xl:w-[40%] overflow-x-auto max-h-[300px] sm:max-h-[400px] 2xl:max-h-full border rounded-lg shadow-md">
                <table className="table table-zebra w-full text-center select-none">
                    <thead className="bg-base-200 sticky top-0 z-10">
                        <tr className="">
                            <th className="py-2">№</th>
                            <th className="py-2">Isim Familya</th>
                            <th className="py-2">Fakultelti</th>
                            <th className="py-2 ">
                                <label className="cursor-pointer flex items-center justify-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        checked={selectAll}
                                        onChange={(e) =>
                                            handleSelectAll(e.target.checked)
                                        }
                                    />
                                    Hammaga yuborish
                                </label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map((tutor, index) => (
                            <tr key={tutor.id} className="hover">
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">{tutor.name}</td>
                                <td className="py-2">{tutor.fak}</td>
                                <td className="py-2">
                                    <label className="cursor-pointer flex items-center justify-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-info"
                                            checked={selectedTutors.includes(
                                                tutor.id
                                            )}
                                            onChange={(e) =>
                                                handleTutorSelect(
                                                    tutor.id,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        Shu tutorga yuborish
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopshiriqlarniKorish;
