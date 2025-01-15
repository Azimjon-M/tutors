import { useFormik } from "formik";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";
import * as Yup from "yup";

const BahMajburiyTTJTashrif = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    // const status = { green: "green", yellow: "yellow", red: "red" };

    const stat = { succes: "succes", process: "process", unrated: "unrated" };

    const kategory = [
        { id: 1, name: "Kategoryani tanlang!", disabled: true },
        { id: 3, name: "O‘z sohasi" },
        { id: 4, name: "Qo‘shimcha" },
    ];
    const data = [
        {
            id: 1,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Shirin Asqarova",
            fakultet: "Fiz-Mat",
            taskCompleted: 0,
            taskTotal: 2,
            deadline: "1 hafta",
            status: true,
            isRated: true,
            maxScore: 10,
        },
        {
            id: 2,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Shirin Asqarova",
            fakultet: "Fiz-Mat",
            taskCompleted: 0,
            taskTotal: 2,
            deadline: "1 hafta",
            status: false,
            isRated: false,
            maxScore: 10,
        },
        {
            id: 3,
            rasm: "https://cdn.worldvectorlogo.com/logos/4x4-1.svg",
            name: "Azimjon Shukur",
            fakultet: "Fiz-Mat",
            taskCompleted: 1,
            taskTotal: 2,
            deadline: "1 hafta",
            status: true,
            isRated: true,
            maxScore: 10,
        },
        {
            id: 4,
            rasm: "",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 1,
            taskTotal: 2,
            deadline: "1 hafta",
            status: true,
            isRated: false,
            maxScore: 10,
        },
        {
            id: 5,
            rasm: "https://cdn.worldvectorlogo.com/logos/4x4-1.svg",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 2,
            taskTotal: 2,
            deadline: "1 hafta",
            status: true,
            isRated: true,
            maxScore: 10,
        },
        {
            id: 6,
            rasm: "",
            name: "Dilshod Raxmatov",
            fakultet: "Fiz-Mat",
            taskCompleted: 2,
            taskTotal: 2,
            deadline: "1 hafta",
            status: true,
            isRated: false,
            maxScore: 10,
        },
        {
            id: 7,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 0,
            taskTotal: 2,
            deadline: "1 hafta",
            status: false,
            isRated: true,
            maxScore: 0,
        },
        {
            id: 8,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 1,
            taskTotal: 2,
            deadline: "1 hafta",
            status: false,
            isRated: true,
            maxScore: 0,
        },
        {
            id: 9,
            rasm: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9llpRZyBsTqxGX7JSr3rw65FcUWdmVLVtiw&s",
            name: "Axtamov Ravshan",
            fakultet: "Ona-tili",
            taskCompleted: 2,
            taskTotal: 2,
            deadline: "1 hafta",
            status: false,
            isRated: true,
            maxScore: 0,
        },
    ];

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
                <div>
                    <MdCheckCircle className="text-green-500 text-lg mx-auto" />
                    <span>Baholandi</span>
                </div>
            );
        } else if (isRated && !status) {
            return (
                <div>
                    <MdErrorOutline className="text-red-500 text-lg mx-auto" />
                    <span>Baholanmagan!</span>
                </div>
            );
        } else if (!isRated) {
            return (
                <div>
                    <MdErrorOutline className="text-yellow-500 text-lg mx-auto" />
                    <span>Jarayonda</span>
                </div>
            );
        }
    };

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

    return (
        <div className="relative z-0">
            <div
                className={`${
                    isOpenModal ? "z-20 opacity-100" : "-z-10 opacity-0"
                } w-[calc(100%+205px)] h-[calc(100vh-54px)] absolute top-[-2rem] right-[-2rem] bg-[#00000093] transition-[opacity] ease-linear duration-150`}
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
                                            item.taskTotal,
                                            item.taskCompleted
                                        )}`}
                                    >
                                        {item.taskTotal}/{item.taskCompleted}
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {item.deadline}
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {getStatus(item.isRated, item.status)}
                                </td>
                                <td className="py-2 px-4 border-r border-gray-300">
                                    {item.isRated && item.status ? (
                                        <div>
                                            <strong>Bahosi: </strong>
                                            {item.maxScore}
                                        </div>
                                    ) : !item.isRated ? (
                                        <button
                                            onClick={() => setIsOpenModal(true)}
                                            className={`btn btn-sm bg-green-500 hover:bg-green-600 active:bg-green-500  text-white rounded-lg`}
                                        >
                                            Baholash
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className={`btn btn-sm rounded-lg`}
                                        >
                                            Baholash
                                        </button>
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
