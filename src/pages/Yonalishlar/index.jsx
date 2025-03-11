import React, { useState } from "react";
// import { RiPencilFill } from "react-icons/ri";
// import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIYonalish from "../../services/yonalish";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIFakultet from "../../services/fakultet";

const Yonalish = () => {
    const queryClient = useQueryClient();
    const [isEdit, setIsEdit] = useState(null);
    const [noSelected, setNoSelected] = useState(false);

    const {
        data: dataFakultet = [],
        isLoadingFakultet,
        isErrorFak,
    } = useQuery({
        queryKey: ["fakultetList"], // query id si
        queryFn: async () => {
            let response = await APIFakultet.get();
            return response.data;
        }, // fetchData funksiyasi
    });
    const {
        data: dataYonalish = [],
        isLoadingYonalish,
        isError,
    } = useQuery({
        queryKey: ["getYonalish"], // query id si
        queryFn: async () => {
            const response = await APIYonalish.get();
            return response.data;
        },
    });

    // const delYonalish = useMutation({
    //     mutationFn: (id) => APIYonalish.del(id), // delete funksiyasi
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(["getYonalish"]);
    //     },
    // });

    const postDataYonalish = useMutation({
        mutationFn: (data) => {
            return APIYonalish.post(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["getYonalish"]);
        },
    });

    const editYonalish = useMutation({
        mutationFn: ({ id, name }) => {
            if (id) return APIYonalish.patch(id, { name });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["getYonalish"]);
        },
    });

    // const handleDelete = (id) => {
    //     delYonalish.mutate(id);
    // };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        fakultet: Yup.string().required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            fakultet: "1",
        },
        validationSchema,
        validateOnChange: () => {},
        onSubmit: (values, { resetForm }) => {
            if (isEdit) {
                editYonalish.mutate({ id: isEdit.id, name: values.name });
                setIsEdit(null);
                resetForm();
            } else {
                if (values.fakultet !== "1") {
                    const neData = {
                        name: values.name,
                        fakultet: values.fakultet,
                    };
                    postDataYonalish.mutate(neData);
                    resetForm();
                } else {
                    setNoSelected(true);
                    setTimeout(() => {
                        setNoSelected(false);
                    }, 2000);
                }
            }
        },
    });

    const handleEdit = (data) => {
        setIsEdit(data);
        formik.values.name = data.name;
    };

    return (
        <div className="mx-auto">
            <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
                Yo'nalish
            </h1>
            <div className="flex justify-center items-center gap-4 px-4">
                {isLoadingYonalish || isLoadingFakultet ? (
                    <div className="font-bold text-sky-500 text-center">
                        Yuklanmoqda...
                    </div>
                ) : isError || isErrorFak ? (
                    <div className="font-bold text-red-500 text-center">
                        Yuklashda Xatolik
                    </div>
                ) : (
                    <div className="space-y-3 w-[60%] h-[calc(100vh-250px)] overflow-y-auto border rounded-lg shadow">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nomi</th>
                                        <th>Fakultet Nomi</th>
                                        <th>Tahrirlash</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataYonalish?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                {item.fakultet.name}{" "}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    Tahrirlash
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className="w-[40%]">
                    <div className="p-4 border rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-600 mb-4">
                            {isEdit
                                ? "Yo'nalishni tahrirlash"
                                : "Yangi yo'nalish qo'shish"}
                        </h2>
                        <div className="mb-4">
                            <label
                                htmlFor="fakultet"
                                className={`${
                                    isEdit && "hidden"
                                } block text-sm font-medium text-gray-700`}
                            >
                                Fakultetni tanlang!
                                <select
                                    id="fakultet"
                                    name="fakultet"
                                    className={`${
                                        noSelected &&
                                        "border-red-500 focus:outline-red-600"
                                    } block select select-bordered mt-1`}
                                    value={formik.values.fakultet}
                                    onChange={formik.handleChange}
                                >
                                    <option value="1" disabled>
                                        Fakultetni Tanlang!
                                    </option>
                                    {dataFakultet?.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                            disabled={item.disabled}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className="w-100 h-[10px]" />
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Yo'nalish nomi
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                                type="text"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                                isEdit
                                    ? "border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                                    : "border border-blue-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-100 active:border-blue-600 active:text-blue-600"
                            }`}
                        >
                            {isEdit ? "Saqlash" : "Yuborish"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Yonalish;
