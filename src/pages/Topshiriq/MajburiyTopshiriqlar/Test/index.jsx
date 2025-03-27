import React, {useCallback, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Calendar from "../../../../components/Calendar";

import APIGetTutor from "../../../../services/getUser";
import APISuperadminMajTop from "../../../../services/superadminMajTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading";

const Test = () => {

    const [tutorsUID, setTutorsUID] = useState([]);
    const [dataTop, setDataTop] = useState([]);
    const pageKey = "ttjga_tashrif";

    const getTutor = async () => {
        try {
            const res = await APIGetTutor.getTutor();
            if (res?.data) {
                const newRes = res.data.map((item) => `${item.id}`);
                setTutorsUID(newRes);
                return newRes;
            } else {
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    };


    const getMajTop = useCallback(async (yearOrContext, month) => {
        let year = yearOrContext;
        if (typeof yearOrContext === "object" && yearOrContext.queryKey) {
            const currentDate = new Date();
            year = currentDate.getFullYear();
            month = currentDate.getMonth();
        }
        try {
            const startTime = `${year}-${String(month + 1).padStart(
                2,
                "0"
            )}-01`;
            const lastDay = new Date(year, month + 1, 0).getDate();
            const endTime = `${year}-${String(month + 1).padStart(
                2,
                "0"
            )}-${lastDay}`;
            const res = await APISuperadminMajTop.getByMonth(
                pageKey,
                startTime,
                endTime
            );
            if (res?.data) {
                const newRes = res.data.filter(
                    (item) => item.majburiy_topshiriq_turi === pageKey
                );
                setDataTop(newRes);
                return newRes;
            }
            return [];
        } catch (err) {
            console.log(err);
            return [];
        }
    }, []);

    // GetTutor
    const { isLoading: loadingTutor, isError: errorTutor } = useQuery({
        queryKey: ["getTutorsUID"],
        queryFn: getTutor,
    });

    // GetMajTop
    const {
        isLoading: loadingMajTop,
        isError: errorMajTop,
        refetch: refetchMajTop,
    } = useQuery({
        queryKey: ["getMajTop"],
        queryFn: () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            return getMajTop(year, month);
        },
    });

    const postMajTop = useMutation({
        mutationFn: async (values) => {
            if (tutorsUID?.length > 0) {
                const data = {
                    majburiy_topshiriq_turi: pageKey,
                    topshiriq_users: tutorsUID,
                    ...values,
                };
                try {
                    await APISuperadminMajTop.post(data);
                    refetchMajTop();
                } catch (err) {
                    console.log(err);
                }
            } else {
                window.location.reload();
            }
        },
    });

    const formik = useFormik({
        initialValues: {
            max_baxo: "",
            topshiriq_soni: "",
            boshlanish_vaqti: "",
            tugash_vaqti: "",
            file: null, // Fayl
            berilgan_min: "", // Test uchun berilgan minut
        },
        validationSchema: Yup.object({
            max_baxo: Yup.number().required("Kiritilishi shart!"),
            berilgan_min: Yup.number().required("Kiritilishi shart!"),
            topshiriq_soni: Yup.number().required("Kiritilishi shart!"),
            boshlanish_vaqti: Yup.date().required("Kiritilishi shart!"),
            tugash_vaqti: Yup.date().required("Kiritilishi shart!"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                postMajTop.mutate(values);
                resetForm();
            } catch (err) {
                console.log(err);
            }
        },
    });


    // const formik = useFormik({
    //     initialValues: {
    //         muddat: "", // Muddati
    //         topshiriq_soni: "", // Testlar soni
    //         maxBal: "", // Max ball
    //         file: null, // Fayl
    //         berilgan_min: "", // Test uchun berilgan minut
    //         boshlanish_vaqti: "", // Boshlanish sanasi
    //         tugash_vaqti: "", // Tugash sanasi
    //     },
    //     validationSchema: Yup.object({
    //         muddat: Yup.string().required("Muddati kiritilishi shart!"), // Muddati majburiy
    //         topshiriq_soni: Yup.number()
    //             .required("Testlar soni kiritilishi shart!")
    //             .min(1, "Testlar soni kamida 1 bo'lishi kerak!"), // Testlar soni majburiy va kamida 1
    //         maxBal: Yup.number()
    //             .required("Max ball kiritilishi shart!")
    //             .min(0, "Max ball manfiy bo'lishi mumkin emas!"), // Max ball majburiy va manfiy bo'lmasligi kerak
    //         file: Yup.mixed()
    //             .required("Fayl yuklash majburiy!"),
    //         berilgan_min: Yup.number()
    //             .required("Test uchun berilgan minut kiritilishi shart!")
    //             .min(1, "Minut kamida 1 bo'lishi kerak!"), // Berilgan minut majburiy va kamida 1
    //         boshlanish_vaqti: Yup.date().required(
    //             "Boshlanish sanasi kiritilishi shart!"
    //         ),
    //         // .min(
    //         //     new Date(),
    //         //     "Boshlanish sanasi bugungi sanadan oldin bo'lishi mumkin emas!"
    //         // ), // Boshlanish sanasi majburiy va bugungi sanadan oldin bo'lmasligi kerak
    //         tugash_vaqti: Yup.date()
    //             .required("Tugash sanasi kiritilishi shart!")
    //             .min(
    //                 Yup.ref("boshlanish_vaqti"),
    //                 "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak!"
    //             ), // Tugash sanasi majburiy va boshlanish sanasidan keyin bo'lishi kerak
    //     }),
    //     onSubmit: (values) => {
    //         console.log(values); // Forma ma'lumotlarini konsolga chiqarish
    //     },
    // });

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
                    {/* Testlar soni */}
                    <div className="form-control">
                        <label htmlFor="topshiriq_soni" className="label">
                            <span className="label-text">Test soni</span>
                        </label>
                        <input
                            type="number"
                            id="topshiriq_soni"
                            name="topshiriq_soni"
                            className="input input-bordered"
                            placeholder="Testlar sonini kiriting"
                            {...formik.getFieldProps("topshiriq_soni")}
                        />
                        {formik.touched.topshiriq_soni && formik.errors.topshiriq_soni ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.topshiriq_soni}
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
                        <label htmlFor="berilgan_min" className="label">
                            <span className="label-text">
                                Test uchun berilgan minut
                            </span>
                        </label>
                        <input
                            type="number"
                            id="berilgan_min"
                            name="berilgan_min"
                            className="input input-bordered"
                            placeholder="Minutni kiriting"
                            {...formik.getFieldProps("berilgan_min")}
                        />
                        {formik.touched.berilgan_min &&
                        formik.errors.berilgan_min ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.berilgan_min}
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Boshlanish va tugash sanalari */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-control">
                        <label htmlFor="boshlanish_vaqti" className="label">
                            <span className="label-text">
                                Boshlanish sanasi
                            </span>
                        </label>
                        <input
                            type="date"
                            id="boshlanish_vaqti"
                            name="boshlanish_vaqti"
                            className="input input-bordered"
                            {...formik.getFieldProps("boshlanish_vaqti")}
                        />
                        {formik.touched.boshlanish_vaqti && formik.errors.boshlanish_vaqti ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.boshlanish_vaqti}
                            </span>
                        ) : null}
                    </div>

                    <div className="form-control">
                        <label htmlFor="tugash_vaqti" className="label">
                            <span className="label-text">Tugash sanasi</span>
                        </label>
                        <input
                            type="date"
                            id="tugash_vaqti"
                            name="tugash_vaqti"
                            className="input input-bordered"
                            {...formik.getFieldProps("tugash_vaqti")}
                        />
                        {formik.touched.tugash_vaqti && formik.errors.tugash_vaqti ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.tugash_vaqti}
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
                <Calendar holidays={dataTop} onMonthChange={getMajTop} />
            </div>
        </div>
    );
};

export default Test;
