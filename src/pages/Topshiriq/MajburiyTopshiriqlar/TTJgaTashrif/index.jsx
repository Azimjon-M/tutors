import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Calendar from "../../../../components/Calendar";
import APIGetTutor from "../../../../services/getUser";
import APISuperadminMajTop from "../../../../services/superadminMajTop";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading";

const TTJgaTashrif = () => {
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
        const res = await APISuperadminMajTop.get();
        console.log(res.data);

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
        },
        validationSchema: Yup.object({
            max_baxo: Yup.number().required("Kiritilishi shart!"),
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

    return (
        <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
            {(loadingTutor || loadingMajTop) && <Loading />}
            <h1 className="text-lg font-bold">Topshiriq yuborish:</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex justify-between gap-2">
                    <div className="w-full form-control mb-4">
                        <label htmlFor="topshiriq_soni" className="label">
                            <span className="label-text">
                                Muddat ichida nechta vazifa yuklashi
                            </span>
                        </label>
                        <input
                            type="number"
                            id="topshiriq_soni"
                            name="topshiriq_soni"
                            className="input input-bordered"
                            placeholder="Sonini kiriting"
                            {...formik.getFieldProps("topshiriq_soni")}
                        />
                        {formik.touched.topshiriq_soni &&
                        formik.errors.topshiriq_soni ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.topshiriq_soni}
                            </span>
                        ) : null}
                    </div>
                    <div className="w-full form-control mb-4">
                        <label htmlFor="max_baxo" className="label">
                            <span className="label-text">Max ball</span>
                        </label>
                        <input
                            type="number"
                            id="max_baxo"
                            name="max_baxo"
                            className="input input-bordered"
                            placeholder="Ballni kiriting"
                            {...formik.getFieldProps("max_baxo")}
                        />
                        {formik.touched.max_baxo && formik.errors.max_baxo ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.max_baxo}
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
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
                        {formik.touched.boshlanish_vaqti &&
                        formik.errors.boshlanish_vaqti ? (
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
                        {formik.touched.tugash_vaqti &&
                        formik.errors.tugash_vaqti ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.tugash_vaqti}
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
                <h1 className="text-lg font-bold">
                    Jo'natilgan ma'lumotlar jadvali
                </h1>
                {!errorMajTop && !errorTutor ? (
                    <Calendar holidays={dataTop} onMonthChange={getMajTop} />
                ) : (
                    <h1 className="text-[red] px-[auto]">
                        Ma'lumot olishda hatolik!
                    </h1>
                )}
            </div>
        </div>
    );
};

export default TTJgaTashrif;
