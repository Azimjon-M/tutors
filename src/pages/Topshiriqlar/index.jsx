import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TaskForm = () => {
    const formik = useFormik({
        initialValues: {
            title: "",
            details: "",
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
            file1: Yup.mixed().required("Birinchi faylni jo‘natish majburiy!"),
            startDate: Yup.date().required("Boshlanish sanasini kiriting!"),
            endDate: Yup.date()
                .required("Tugash sanasini kiriting!")
                .min(
                    Yup.ref("startDate"),
                    "Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak!"
                ),
        }),
        onSubmit: (values) => {
            console.log(values);
            alert("Topshiriq yuborildi!");
        },
    });

    return (
        <div className="p-6 bg-base-200 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Yangi Topshiriq
            </h2>
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

                {/* File Inputs in 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {["file1", "file2", "file3", "file4"].map((file, index) => (
                        <div key={file} className="form-control">
                            <label htmlFor={file} className="label">
                                <span className="label-text">
                                    Fayl {index + 1}
                                    {index === 0 ? " (Majburiy)" : ""}
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

export default TaskForm;
