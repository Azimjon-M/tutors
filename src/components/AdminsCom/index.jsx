import React, { useState } from "react";
import APIUsers from "../../services/users";
import APIFakultet from "../../services/fakultet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { useQuery, useMutation } from "@tanstack/react-query";

const AdminsCom = () => {
    // TanStack Query to fetch users
    const fetchUsers = async () => {
        const response = await APIUsers.getRole("admin");
        return response.data;
    };

    // TanStack Query to fetch faculties
    const fetchFaculties = async () => {
        const resFakultet = await APIFakultet.get();
        return resFakultet.data;
    };
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);
    const [initialValues, setInitialValues] = useState({
        username: "",
        first_name: "",
        last_name: "",
        role: "admin",
        fakultet: "",
        password: "",
        is_active: true,
    });

    // Use TanStack Query hooks to fetch data
    const {
        data: datas,
        isLoading: isLoadingUsers,
        error: usersError,
        refetch: refetchUsers,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const {
        data: dataFakultet = [],
        isLoading: isLoadingFaculties,
        error: facultiesError,
        refetch: refetchFaculties,
    } = useQuery({
        queryKey: ["faculties"],
        queryFn: fetchFaculties,
    });

    // Mutation for delete action
    const { mutateAsync: deleteUser, isLoading: isDeleting } = useMutation({
        mutationFn: id => APIUsers.del(id),
        onSuccess: () => {
            refetchUsers();
        },
        onError: error => {
            console.error("Delete Error:", error);
        },
    });

    // Mutation for adding/editing user
    const { mutateAsync: createOrUpdateUser, isLoading: isSubmitting } =
        useMutation({
            mutationFn: formData => {
                if (edit) {
                    return APIUsers.patch(id, formData);
                } else {
                    return APIUsers.post(formData);
                }
            },
            onSuccess: () => {
                refetchUsers();
                setEdit(false);
                setId(null);
            },
            onError: error => {
                console.error("Submit Error:", error);
            },
        });

    const fakultetName = id => {
        const data = dataFakultet.find(item => item.id === id);
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

    const handleEdit = data => {
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

    const handleDelete = async id => {
        await deleteUser(id);
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
                                {/* Form fields here */}
                                {/* Facultet, first_name, last_name, username, password, is_active */}
                                <button
                                    type="submit"
                                    className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                                        edit ? "bg-teal-500" : "bg-blue-500"
                                    }`}
                                    disabled={isSubmitting}
                                >
                                    {edit ? "Saqlash" : "Yuborish"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {isLoadingUsers && (
                        <p className="text-blue-500 font-bold text-center">
                            Yuklanmoqda...
                        </p>
                    )}
                    {usersError && (
                        <p className="text-red-500 font-bold text-center">
                            {usersError.message}
                        </p>
                    )}
                    {datas &&
                        datas.map(data => (
                            <div
                                key={data.id}
                                className="collapse collapse-arrow border rounded-lg shadow-md hover:shadow-lg"
                            >
                                <input type="checkbox" name="my-accordion-2" />
                                <div className="collapse-title flex justify-between items-center">
                                    <p className="text-sky-700 font-medium">
                                        {data.first_name} {data.last_name}
                                    </p>
                                    <div className="flex space-x-2 z-10">
                                        <button
                                            type="button"
                                            className="p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600"
                                            onClick={() => handleEdit(data)}
                                        >
                                            <RiPencilFill />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-2 rounded-lg text-white border border-red-500 bg-red-500 hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(data.id)
                                            }
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    <p className="text-sky-700 font-medium">
                                        Fakultitet:{" "}
                                        {fakultetName(data.fakultet)}
                                    </p>
                                    <p className="text-sky-700 font-medium">
                                        Foydalanuvchi nomi: {data.username}
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
