import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Topshiriqlar = () => {
    const tutors = useMemo(
        () => [
            { id: 1, name: "Abdulla Karimov", fak: "Fiz-Mat" },
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

    const kategory = [
        { id: 1, name: "Kategoryani tanlang!", disabled: true },
        { id: 2, name: "Majburiy" },
        { id: 3, name: "O‘z sohasi" },
        { id: 4, name: "Qo‘shimcha" },
    ];

    const [selectAll, setSelectAll] = useState(false);
    const [selectedTutors, setSelectedTutors] = useState([]);

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

    // ****************

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
            startDate: "",
            endDate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Sarlavha kiritilishi shart!"),
            details: Yup.string().required(
                "Batafsil ma'lumot kiritilishi kerak!"
            ),
            startDate: Yup.date().required("Boshlanish sanasini kiriting!"),
            endDate: Yup.date()
                .required("Tugash sanasini kiriting!")
                .min(
                    Yup.ref("startDate"),
                    "Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak!"
                ),
        }),
        onSubmit: (values) => {
            alert("Topshiriq yuborildi!");
        },
    });

    return (
        <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
            <h1 className="text-lg font-bold mb-4">Kimlarga yuborish:</h1>
            <div className="overflow-x-auto max-h-[30vh] lg:max-h-[40vh] border rounded-lg shadow-md">
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

            <h1 className="text-lg font-bold mt-8">
                Qanday topshiriq yuborish:
            </h1>

            <form onSubmit={formik.handleSubmit}>
                {/* Title */}
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

                {/* Details */}
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
                    {/* Category (Select) */}
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
                            value={formik.values.category} // formik qiymatini ulash
                            onChange={formik.handleChange} // qiymatni boshqarish
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

                        {formik.touched.category && formik.errors.category ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.category}
                            </span>
                        ) : null}
                    </div>

                    {/* Number Input */}
                    <div className="form-control mb-4">
                        <label htmlFor="numberValue" className="label">
                            <span className="label-text">
                                Qiymatni kiriting
                            </span>
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

                {/* File Inputs in 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {["file1", "file2", "file3", "file4"].map((file, index) => (
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
                    ))}
                </div>

                {/* Start and End Date */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="form-control">
                        <label htmlFor="startDate" className="label">
                            <span className="label-text">
                                Boshlanish sanasi
                            </span>
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="input input-bordered"
                            {...formik.getFieldProps("startDate")}
                        />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.startDate}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-control">
                        <label htmlFor="endDate" className="label">
                            <span className="label-text">Tugash sanasi</span>
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="input input-bordered"
                            {...formik.getFieldProps("endDate")}
                        />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.endDate}
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-info w-full">
                        Yuborish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Topshiriqlar;
