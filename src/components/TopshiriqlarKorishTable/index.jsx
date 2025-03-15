import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TopshiriqlarKorishTable = (props) => {
    console.log(props);
    
    const [isOpenModal, setIsOpenModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            details: "",
            maxBal: "",
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            endDate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Kiritilishi shart!"),
            details: Yup.string().required("Kiritilishi shart!"),
            endDate: Yup.date().required("Tugash sanasini kiriting!"),
            maxBal: Yup.number().min(1).required("Kiritilishi shart!"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    // const onDelete = (id) => {
    //     const confrim = window.confirm("O'chirishni istaysizmi ?");
    //     if (confrim) {
    //         console.log(id);
    //     }
    // };
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
                        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"> */}

                        {/* </div> */}
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
                        <div className="flex">
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
                            <div className="form-control mb-4">
                                <label htmlFor="maxBal" className="label">
                                    <span className="label-text">Max ball</span>
                                </label>
                                <input
                                    type="number"
                                    id="maxBal"
                                    min={`0`}
                                    name="maxBal"
                                    className="input input-bordered w-[100px]"
                                    {...formik.getFieldProps("maxBal")}
                                />
                                {formik.touched.maxBal &&
                                formik.errors.maxBal ? (
                                    <span className="text-red-500 text-sm">
                                        {formik.errors.maxBal}
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
                                <th className="">Nomi</th>
                                <th className="">Kategorya</th>
                                <th className="">Max bal</th>
                                <th className="">Boshlanish</th>
                                <th className="">Tugash</th>
                                <th className="">Tahrirlash</th>
                                <th className="">O'chirish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data?.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-[#ececec] border-b-[1px] border-gray-200"
                                >
                                    <td className=" text-center">
                                        {index + 1}
                                    </td>
                                    <td className="max-w-[500px]">
                                        <div className="w-full px-4 line-clamp-1">
                                            {item.title}
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
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopshiriqlarKorishTable;
