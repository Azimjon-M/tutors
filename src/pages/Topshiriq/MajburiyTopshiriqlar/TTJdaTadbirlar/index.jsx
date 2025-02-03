import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Calendar from "../../../../components/Calendar";

const TTJdaTadbirlar = () => {
    const formik = useFormik({
        initialValues: {
            muddat: "",
            maxBal: "",
            vazifaSoni: "",
            startDate: "",
            endDate: "",
        },
        validationSchema: Yup.object({
            muddat: Yup.string().required("Kiritilishi shart!"),
            maxBal: Yup.number().required("Kiritilishi shart!"),
            vazifaSoni: Yup.number().required("Kiritilishi shart!"),
            startDate: Yup.date().required("Kiritilishi shart!"),
            endDate: Yup.date().required("Kiritilishi shart!"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const holidays = [
        { startTime: "2025-01-20", endtime: "2025-01-25" },
        { startTime: "2025-01-27", endtime: "2025-02-01" },
        { startTime: "2025-02-03", endtime: "2025-02-08" },
        { startTime: "2025-02-10", endtime: "2025-02-15" },
        { startTime: "2025-02-17", endtime: "2025-02-22" },
    ];

    return (
        <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
            <h1 className="text-lg font-bold">Topshiriq yuborish:</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex justify-between gap-2">
                    <div className="w-full form-control mb-4">
                        <label htmlFor="muddat" className="label">
                            <span className="label-text">Muddati</span>
                        </label>
                        <input
                            type="text"
                            id="muddat"
                            name="muddat"
                            className="input input-bordered"
                            placeholder="Muddati kiriting: 1 hafta, 1 oy, ..."
                            {...formik.getFieldProps("muddat")}
                        />
                        {formik.touched.muddat && formik.errors.muddat ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.muddat}
                            </span>
                        ) : null}
                    </div>
                    <div className="w-full form-control mb-4">
                        <label htmlFor="vazifaSoni" className="label">
                            <span className="label-text">
                                Muddat ichida nechta vazifa yuklashi
                            </span>
                        </label>
                        <input
                            type="number"
                            id="vazifaSoni"
                            name="vazifaSoni"
                            className="input input-bordered"
                            placeholder="Sonini kiriting"
                            {...formik.getFieldProps("vazifaSoni")}
                        />
                        {formik.touched.vazifaSoni &&
                        formik.errors.vazifaSoni ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.vazifaSoni}
                            </span>
                        ) : null}
                    </div>
                    <div className="w-full form-control mb-4">
                        <label htmlFor="maxBal" className="label">
                            <span className="label-text">Max ball</span>
                        </label>
                        <input
                            type="number"
                            id="maxBal"
                            name="maxBal"
                            className="input input-bordered"
                            placeholder="Ballni kiriting"
                            {...formik.getFieldProps("maxBal")}
                        />
                        {formik.touched.maxBal && formik.errors.maxBal ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.maxBal}
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

            <div className="my-10">
                <h1 className="text-lg font-bold">Jo'natilgan ma'lumotlar jadvali</h1>
                <Calendar holidays={holidays} />
            </div>
        </div>
    );
};

export default TTJdaTadbirlar;
