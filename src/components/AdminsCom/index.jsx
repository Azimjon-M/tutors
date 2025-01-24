import React, { useState } from "react";
import APIUsers from "../../services/users";
import APIFakultet from "../../services/fakultet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";

const AdminsCom = () => {
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [initialValues, setInitialValues] = useState({
        username: "",
        first_name: "",
        last_name: "",
        role: "admin",
        fakultet: "",
        password: "",
        is_active: true,
    });

    // *** Whith Quary
    // Get Admin FN from userModel
    const fatchUser = async () => {
        setLoading(true);
        const res = await APIUsers.getRole("admin");
        if (res.data) {
            setLoading(false);
        }
        return res.data;
    };
    // Get Fakultets FN
    const fatchFakultet = async () => {
        setLoading(true);
        const res = await APIFakultet.get();
        if (res.data) {
            setLoading(false);
        }
        return res.data;
    };
    // Get Admin
    const {
        data: dataAdmin = [],
        reftech: reftechAdmin,
    } = useQuery({
        queryKey: ["getAdmin"],
        queryFn: fatchUser,
    });
    // Get Fakultet
    const {
        data: dataFakultet = [],
    } = useQuery({
        queryKey: ["getFakultet"],
        queryFn: fatchFakultet,
    });
    // Admin delete
    const { mutateAsync: onDeleteUser } = useMutation({
        mutationFn: (id) => APIUsers.del(id),
        onSuccess: () => reftechAdmin,
        onError: (err) => {
            console.log("UserDeleteError: ", err);
        },
    });
    // Submit Form Post
    const { mutateAsync: createOrUpdateUser } = useMutation({
        mutationFn: (formData) => {
            if (edit) {
                return APIUsers.patch(id, formData);
            } else {
                return APIUsers.post(formData);
            }
        },
        onSuccess: () => {
            reftechAdmin()
            setEdit(false);
            setId(null);
        },
        onError: (err) => {
            console.error("Submit Error:", err);
        },
    });

    // /Whith Quary

    const fakultetName = (id) => {
        const data = dataFakultet.find((item) => item.id === id);
        return data ? data.name : "Fakultet nomi kiritilmagan";
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Foydalanuvchi nomi majburiy"),
        first_name: Yup.string().required("Ism majburiy"),
        last_name: Yup.string().required("Familiya majburiy"),
        password: Yup.string()
            .min(6, "Parol kamida 6 ta belgi bo'lishi kerak")
            .required("Parol majburiy"),
        fakultet: Yup.string().required("Fakultet majburiy"),
        role: Yup.string()
            .oneOf(["superadmin", "admin", "tutor"], "Noto'g'ri ro'l tanlangan")
            .required("Ro'l majburiy"),
        is_active: Yup.boolean(),
    });

    const handleEdit = (data) => {
        setEdit(true);
        setId(data.id);
        setInitialValues({
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
            fakultet: data.fakultet,
            password: data.parol,
            is_active: data.is_active,
        });
    };

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        for (let key in values) {
            if (key === "is_active") {
                formData.append(key, values[key] ? "true" : "false");
            } else {
                formData.append(key, values[key]);
            }
        }


        await createOrUpdateUser(formData);
        console.log("Post bo'ldi", resetForm);
        
        resetForm();
    };

    return (
        <div className="max-w-[1600px] mx-auto">
            <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
                Zamdekanlar
            </h1>
            <div className="max-w-7xl px-5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">
                        {edit
                            ? "Zamdekanni tahrirlash"
                            : "Yangi zamdekan qo'shish"}
                    </h2>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values }) => (
                            <Form>
                                {/* Fakultet */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="fakultet"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Fakultitet
                                    </label>
                                    <Field
                                        component="select"
                                        id="fakultet"
                                        name="fakultet"
                                        className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300"
                                    >
                                        <option value="" disabled>
                                            Fakultitetni kiriting
                                        </option>
                                        {dataFakultet.map((data) => (
                                            <option
                                                key={data.id}
                                                value={data.id}
                                            >
                                                {data.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="fakultet"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* First Name */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="first_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Ismi
                                    </label>
                                    <Field
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300"
                                    />
                                    <ErrorMessage
                                        name="first_name"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Last name */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="last_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Familiyasi
                                    </label>
                                    <Field
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                                    />
                                    <ErrorMessage
                                        name="last_name"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Username */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Foydalanuvchi nomi
                                    </label>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Parol
                                    </label>
                                    <Field
                                        type="text"
                                        id="password"
                                        name="password"
                                        className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                {/* is active btn */}
                                <div className="mb-4">
                                    <div
                                        role="group"
                                        aria-labelledby="my-radio-group"
                                    >
                                        <p className="block text-sm font-medium text-gray-700">
                                            Foydalanuvchi faolligi
                                        </p>
                                        <label className="mr-3">
                                            <Field
                                                type="checkbox"
                                                name="is_active"
                                                className="mr-1"
                                            />
                                            {values.is_active
                                                ? "faol"
                                                : "faol emas"}
                                        </label>
                                    </div>
                                    <ErrorMessage
                                        name="is_active"
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

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {loading && (
                        <p className="text-blue-500 font-bold text-center">
                            Yuklanmoqda...
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 font-bold text-center">
                            {error}
                        </p>
                    )}
                    {dataAdmin.map((data) => (
                        <div
                            key={data.id}
                            className="collapse collapse-arrow border rounded-lg shadow-md hover:shadow-lg"
                        >
                            <input type="checkbox" name="my-accordion-2" />
                            <div className="collapse-title flex justify-between items-center">
                                <p className="text-sky-700 font-medium line-clamp-1">
                                    <span className="text-sky-800 font-bold">
                                        Admin:
                                    </span>{" "}
                                    {data.first_name} {data.last_name}
                                </p>
                                <div className="flex space-x-2 z-10">
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
                                        onClick={() => onDeleteUser(data.id)}
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </div>
                            <div className="collapse-content">
                                <p className="text-sky-700 font-medium">
                                    <span className="text-sky-800 font-bold">
                                        Fakultitet nomi:
                                    </span>{" "}
                                    {fakultetName(data.fakultet)}
                                </p>
                                <p className="text-sky-700 font-medium">
                                    <span className="text-sky-800 font-bold">
                                        Foydalanuvchi nomi:
                                    </span>{" "}
                                    {data.username}
                                </p>
                                <p className="text-sky-700 font-medium">
                                    <span className="text-sky-800 font-bold">
                                        Foydalanuvchi paroli:
                                    </span>{" "}
                                    {data.parol}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminsCom;
