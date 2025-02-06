import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Calendar from "../../../../components/Calendar";

const Test = () => {
    const formik = useFormik({
        initialValues: {
            muddat: "", // Muddati
            testSoni: "", // Testlar soni
            maxBal: "", // Max ball
            file: null, // Fayl
            berilganMin: "", // Test uchun berilgan minut
            startDate: "", // Boshlanish sanasi
            endDate: "", // Tugash sanasi
        },
        validationSchema: Yup.object({
            muddat: Yup.string().required("Muddati kiritilishi shart!"), // Muddati majburiy
            testSoni: Yup.number()
                .required("Testlar soni kiritilishi shart!")
                .min(1, "Testlar soni kamida 1 bo'lishi kerak!"), // Testlar soni majburiy va kamida 1
            maxBal: Yup.number()
                .required("Max ball kiritilishi shart!")
                .min(0, "Max ball manfiy bo'lishi mumkin emas!"), // Max ball majburiy va manfiy bo'lmasligi kerak
            file: Yup.mixed()
                .required("Fayl yuklash majburiy!"),
            berilganMin: Yup.number()
                .required("Test uchun berilgan minut kiritilishi shart!")
                .min(1, "Minut kamida 1 bo'lishi kerak!"), // Berilgan minut majburiy va kamida 1
            startDate: Yup.date().required(
                "Boshlanish sanasi kiritilishi shart!"
            ),
            // .min(
            //     new Date(),
            //     "Boshlanish sanasi bugungi sanadan oldin bo'lishi mumkin emas!"
            // ), // Boshlanish sanasi majburiy va bugungi sanadan oldin bo'lmasligi kerak
            endDate: Yup.date()
                .required("Tugash sanasi kiritilishi shart!")
                .min(
                    Yup.ref("startDate"),
                    "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak!"
                ), // Tugash sanasi majburiy va boshlanish sanasidan keyin bo'lishi kerak
        }),
        onSubmit: (values) => {
            console.log(values); // Forma ma'lumotlarini konsolga chiqarish
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {/* Muddati */}
                    <div className="form-control">
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

                    {/* Testlar soni */}
                    <div className="form-control">
                        <label htmlFor="testSoni" className="label">
                            <span className="label-text">Test soni</span>
                        </label>
                        <input
                            type="number"
                            id="testSoni"
                            name="testSoni"
                            className="input input-bordered"
                            placeholder="Testlar sonini kiriting"
                            {...formik.getFieldProps("testSoni")}
                        />
                        {formik.touched.testSoni && formik.errors.testSoni ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.testSoni}
                            </span>
                        ) : null}
                    </div>

                    {/* Max ball */}
                    <div className="form-control">
                        <label htmlFor="maxBal" className="label">
                            <span className="label-text">Max ball</span>
                        </label>
                        <input
                            type="number"
                            id="maxBal"
                            name="maxBal"
                            className="input input-bordered"
                            placeholder="Max ballni kiriting"
                            {...formik.getFieldProps("maxBal")}
                        />
                        {formik.touched.maxBal && formik.errors.maxBal ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.maxBal}
                            </span>
                        ) : null}
                    </div>

                    {/* File */}
                    <div className="form-control">
                        <label htmlFor="file" className="label">
                            <span className="label-text">Fayl</span>
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="file-input file-input-bordered"
                            accept=".xls, .xlsx"
                            onChange={formik.handleChange}
                        />
                        <span className="text-red-500 text-sm">
                            {formik.errors.file}
                        </span>
                    </div>

                    {/* Test uchun berilgan minut */}
                    <div className="form-control">
                        <label htmlFor="berilganMin" className="label">
                            <span className="label-text">
                                Test uchun berilgan minut
                            </span>
                        </label>
                        <input
                            type="number"
                            id="berilganMin"
                            name="berilganMin"
                            className="input input-bordered"
                            placeholder="Minutni kiriting"
                            {...formik.getFieldProps("berilganMin")}
                        />
                        {formik.touched.berilganMin &&
                        formik.errors.berilganMin ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.berilganMin}
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Boshlanish va tugash sanalari */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                {/* Yuborish tugmasi */}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-info w-full">
                        Yuborish
                    </button>
                </div>
            </form>

            <div className="my-10">
                <h1 className="text-lg font-bold">
                    Jo'natilgan ma'lumotlar jadvali
                </h1>
                <Calendar holidays={holidays} />
            </div>
        </div>
    );
};

export default Test;
