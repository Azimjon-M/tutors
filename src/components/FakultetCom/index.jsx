import React, { useState } from "react";
import APIFakultet from "../../services/fakultet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FakultetCom = () => {
    const queryClient = useQueryClient();
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(50, "Maksimal uzunlik 50 ta belgi bo'lishi kerak")
            .required("Fakultet nomi maydoni majburiy"),
    });

    const {
        data: datas = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["fakultetList"], // query id si
        queryFn: async () => {
            const response = await APIFakultet.get();
            return response.data;
        }, // fetchData funksiyasi
    });

    const deleteMutation = useMutation({
        mutationFn: id => APIFakultet.del(id), // delete funksiyasi
        onSuccess: () => {
            queryClient.invalidateQueries(["fakultetList"]);
        },
    });

    const saveMutation = useMutation({
        mutationFn: ({ id, formData }) => {
            if (id) return APIFakultet.patch(id, formData);
            else return APIFakultet.post(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["fakultetList"]);
        },
    });

    const handleEdit = data => {
        setEdit(true);
        setId(data.id);
    };

    const handleDelete = id => {
        deleteMutation.mutate(id);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }

        saveMutation.mutate({ id, formData });
        setEdit(false);
        setId(null);
        resetForm();
    };

    return (
        <div className="max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
                Fakultetlar
            </h1>
            <div className="max-w-7xl px-5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">
                        {edit
                            ? "Fakultetni tahrirlash"
                            : "Yangi fakultet qo'shish"}
                    </h2>
                    <Formik
                        initialValues={{ name: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values }) => (
                            <Form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Fakultet nomi
                                    </label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                                        edit
                                            ? "border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                                            : "border border-blue-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-100 active:border-blue-600 active:text-blue-600"
                                    }`}
                                >
                                    {edit ? "Saqlash" : "Yuborish"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                {isLoading ? (
                    <div className="font-bold text-sky-500 text-center">
                        Yuklanmoqda...
                    </div>
                ) : isError ? (
                    <div className="font-bold text-red-500 text-center">
                        Yuklashda Xatolik
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {datas.map(data => (
                            <div
                                key={data.id}
                                className="flex justify-between items-center px-3 py-2 border rounded-lg shadow-md hover:shadow-lg"
                            >
                                <p className="text-sky-700 font-medium line-clamp-1">
                                    {data.name}
                                </p>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        className="p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                                        onClick={() => handleEdit(data)}
                                    >
                                        <RiPencilFill />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 rounded-lg text-white border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-100 active:border-red-600 active:text-red-600"
                                        onClick={() => handleDelete(data.id)}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FakultetCom;
