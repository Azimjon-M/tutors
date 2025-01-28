import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const MajTopQoshish = () => {
    const kategory = [
        { id: 0, name: "Kategoryani tanlang!", disabled: true, },
        { id: 1, name: "Ijaraga tashrif" },
        { id: 2, name: "TTJda tadbir" },
        { id: 3, name: "Davra suhbati" },
        { id: 4, name: "Tadbirlar" },
        { id: 5, name: "Tutorlik soati" },
        { id: 6, name: "Iqtidorli talabar" },
        { id: 7, name: "Ota-onaga xat" },
        { id: 8, name: "Test" },
        { id: 9, name: "To'garak" },
        // { id: , name: "" },
    ];

    const formik = useFormik({
        initialValues: {
            // title: "",
            // details: "",
            category: 0,
            numberValue: "",
            // file1: null,
            // file2: null,
            // file3: null,
            // file4: null,
            startDate: "",
            endDate: "",
        },
        validationSchema: Yup.object({
            category: Yup.string().required("Kiritilishi shart!"),
            numberValue: Yup.number().required("Kiritilishi shart!"),
            startDate: Yup.date().required("Kiritilishi shart!"),
            endDate: Yup.date().required("Kiritilishi shart!"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
            <h1 className="text-lg font-bold">Topshiriq yuborish:</h1>

            <form onSubmit={formik.handleSubmit}>
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
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-info w-full">
                        Yuborish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MajTopQoshish;
