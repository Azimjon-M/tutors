import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const TopshiriqlarniKorish = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const formatDateToISO = (date) => {
        const [day, month, year] = date.split(".");
        return `${year}-${month}-${day}`;
    };

    const faceData = [
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
    ];

    // ***********************************************************

    const kategory = [
        { id: 1, name: "Kategoryani tanlang!", disabled: true },
        { id: 3, name: "O‘z sohasi" },
        { id: 4, name: "Qo‘shimcha" },
    ];

    const formik = useFormik({
        initialValues: {
            title: "",
            details: "",
            category: 1,
            numberValue: "",
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            endDate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Sarlavha kiritilishi shart!"),
            details: Yup.string().required(
                "Batafsil ma'lumot kiritilishi kerak!"
            ),
            endDate: Yup.date()
                .required("Tugash sanasini kiriting!")
                .min(
                    Yup.ref("startDate"),
                    "Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak!"
                ),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const onDelete = (id) => {
        const confrim = window.confirm("O'chirishni istaysizmi ?");
        if (confrim) {
            console.log(id);
        }
    };

    return (
        <div className="relative z-10">
            <div
                className={`${
                    isOpenModal ? "opacity-100 visible z-50" : "opacity-0 invisible -z-20"
                } w-full h-[calc(100vh-54px)] absolute top-[-24px] right-0 bg-[#00000093] transition-all ease-linear duration-150`}
            >
                <div className="flex justify-end pl-4 pt-4 pr-4">
                    <button
                        onClick={() => setIsOpenModal(false)}
                        className="btn btn-sm btn-error text-xl text-white"
                    >
                        X
                    </button>
                </div>
                <div className="p-4">
                    <form
                        className="bg-white p-4 rounded-lg"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="form-control mb-4">
                            <label htmlFor="title" className="label">
                                <span className="label-text">Sarlavha</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="input input-bordered"
                                placeholder="Sarlavha kiriting"
                                {...formik.getFieldProps("title")}
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.title}
                                </span>
                            ) : null}
                        </div>
                        <div className="form-control mb-4">
                            <label htmlFor="details" className="label">
                                <span className="label-text">Batafsil</span>
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                rows="4"
                                className="textarea textarea-bordered"
                                placeholder="Batafsil ma'lumot kiriting"
                                {...formik.getFieldProps("details")}
                            />
                            {formik.touched.details && formik.errors.details ? (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.details}
                                </span>
                            ) : null}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div className="form-control mb-4">
                                <label htmlFor="category" className="label">
                                    <span className="label-text">
                                        Kategoriyani tanlang
                                    </span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="select select-bordered"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                >
                                    {kategory?.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                            selected={item.selected}
                                            disabled={item.disabled}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                                {formik.touched.category &&
                                formik.errors.category ? (
                                    <span className="text-red-500 text-sm">
                                        {formik.errors.category}
                                    </span>
                                ) : null}
                            </div>
                            <div className="form-control mb-4">
                                <label htmlFor="numberValue" className="label">
                                    <span className="label-text">Max ball</span>
                                </label>
                                <input
                                    type="number"
                                    id="numberValue"
                                    name="numberValue"
                                    className="input input-bordered w-[100px]"
                                    {...formik.getFieldProps("numberValue")}
                                />
                                {formik.touched.numberValue &&
                                formik.errors.numberValue ? (
                                    <span className="text-red-500 text-sm">
                                        {formik.errors.numberValue}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            {["file1", "file2", "file3", "file4"].map(
                                (file, index) => (
                                    <div key={file} className="form-control">
                                        <label htmlFor={file} className="label">
                                            <span className="label-text">
                                                Fayl {index + 1}
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            id={file}
                                            name={file}
                                            className="file-input file-input-bordered"
                                            onChange={(event) =>
                                                formik.setFieldValue(
                                                    file,
                                                    event.target.files[0]
                                                )
                                            }
                                        />
                                        {formik.touched[file] &&
                                        formik.errors[file] &&
                                        index === 0 ? (
                                            <span className="text-red-500 text-sm">
                                                {formik.errors[file]}
                                            </span>
                                        ) : null}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div className="form-control">
                                <label htmlFor="endDate" className="label">
                                    <span className="label-text">
                                        Tugash sanasi
                                    </span>
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    className="input input-bordered"
                                    {...formik.getFieldProps("endDate")}
                                />
                                {formik.touched.endDate &&
                                formik.errors.endDate ? (
                                    <span className="text-red-500 text-sm">
                                        {formik.errors.endDate}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-info w-full"
                            >
                                Yuborish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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
                                <th className="">O'chirish</th>
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
                                            className="btn btn-sm btn-info"
                                            onClick={() => setIsOpenModal(true)}
                                        >
                                            Tahrirlash
                                        </button>
                                    </td>
                                    <td className=" text-center">
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => onDelete(item.id)}
                                        >
                                            O'chirish
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
