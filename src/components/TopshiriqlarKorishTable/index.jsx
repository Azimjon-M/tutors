import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TopshiriqlarKorishTable = ({ data, handleDel }) => {
    const [isOpenModal, setIsOpenModal] = useState(null);

    const formik = useFormik({
        initialValues: {
            max_baxo: "",
            tugash_vaqti: "",
        },
        validationSchema: Yup.object({
            tugash_vaqti: Yup.date().required("Tugash sanasini kiriting!"),
            max_baxo: Yup.number().min(1).required("Kiritilishi shart!"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const onDelete = (id) => {
        const confrim = window.confirm("O'chirishni istaysizmi ?");
        if (confrim) {
            handleDel(id)
        }
    };

    const onEdit = (data) => {
        setIsOpenModal(data);
        formik.setValues({
            max_baxo: data.max_baxo,
            tugash_vaqti: data.tugash_vaqti,
        });
    };

    const onCloseModal = () => {
        setIsOpenModal(null);
        formik.resetForm();
    };
    return (
        <div className="relative z-10">
            <div
                className={`${
                    isOpenModal
                        ? "opacity-100 visible z-50"
                        : "opacity-0 invisible -z-20"
                } w-full h-[calc(100vh-54px)] absolute right-0 bg-[#00000093] transition-all ease-linear duration-150`}
            >
                <div className="flex justify-end pl-4 pt-4 pr-4">
                    <button
                        onClick={() => onCloseModal()}
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
                        <div className="flex">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label
                                        htmlFor="tugash_vaqti"
                                        className="label"
                                    >
                                        <span className="label-text">
                                            Tugash sanasi
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        id="tugash_vaqti"
                                        name="tugash_vaqti"
                                        className="input input-bordered"
                                        {...formik.getFieldProps(
                                            "tugash_vaqti"
                                        )}
                                    />
                                    {formik.touched.tugash_vaqti &&
                                    formik.errors.tugash_vaqti ? (
                                        <span className="text-red-500 text-sm">
                                            {formik.errors.tugash_vaqti}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="form-control mb-4">
                                <label htmlFor="max_baxo" className="label">
                                    <span className="label-text">Max ball</span>
                                </label>
                                <input
                                    type="number"
                                    id="max_baxo"
                                    min={`0`}
                                    name="max_baxo"
                                    className="input input-bordered w-[100px]"
                                    {...formik.getFieldProps("max_baxo")}
                                />
                                {formik.touched.max_baxo &&
                                formik.errors.max_baxo ? (
                                    <span className="text-red-500 text-sm">
                                        {formik.errors.max_baxo}
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
            <div className="p-4">
                <div className="rounded-lg shadow-lg overflow-hidden">
                    <table className="table w-full text-center select-none rounded-lg ">
                        <thead className="bg-base-200 sticky top-0 z-10 border-b-2">
                            <tr className="text-sm bg-gray-100">
                                <th className="">№</th>
                                <th className="">Turi</th>
                                <th className="">Boshlanish</th>
                                <th className="">Tugash</th>
                                <th className="">Tahrirlash</th>
                                <th className="">O'chirish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#ececec] border-b-[1px] border-gray-200"
                                >
                                    <td className=" text-center">
                                        {index + 1}
                                    </td>
                                    <td className=" text-center">
                                        {item.majburiy_topshiriq_turi
                                            .replace(/\b\w/g, (char) =>
                                                char.toUpperCase()
                                            )
                                            .replace(/_/g, " ")}
                                    </td>
                                    <td className=" text-center">
                                        {item.boshlanish_vaqti}
                                    </td>
                                    <td className=" text-center">
                                        {item.tugash_vaqti}
                                    </td>
                                    <td className=" text-center">
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => onEdit(item)}
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

export default TopshiriqlarKorishTable;
