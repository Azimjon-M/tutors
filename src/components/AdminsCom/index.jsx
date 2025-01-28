import React, { useEffect, useState } from "react";
import APIUsers from "../../services/users";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdDeleteForever } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import UsersFormCom from "../UsersFormCom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const AdminsCom = () => {
    const queryClient = useQueryClient();
    const [editData, setEditData] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const {
        data: datas = [],
        isLoading: loading,
        isError: error,
        refetch,
    } = useQuery({
        queryKey: ["adminList"],
        queryFn: async () => {
            const response = await APIUsers.getRole("admin");
            return response.data;
        },
    });

    const editModalOpen = (data) => {
        setEditData(data);
        handleOpenModal();
    };

    const deleteModalOpen = (aaa, id) => {
        setIsDeleteModal(aaa);
        setDeleteId(id);
    };

    const deleteMutation = useMutation({
        mutationFn: (id) => APIUsers.del(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["adminList"]);
        },
    });

    const handleDelete = async () => {
        deleteMutation.mutate(deleteId);
        deleteModalOpen(false);
    };

    useEffect(() => {
        if (!isModalOpen) {
            setTimeout(() => {
                refetch();
            }, 1000);
        }
    }, [isModalOpen, refetch]);

    return (
        <div className="max-w-[1600px] mx-auto">
            <h1 className="text-xl md:text-3xl font-medium text-gray-700 text-center my-5">
                Adminlar
            </h1>
            <div className="max-w-7xl px-5 mx-auto grid gap-4">
                <div className="rounded-md shadow-md  overflow-x-auto">
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
                        <h3 className="text-base md:text-xl font-medium">
                            Adminlar ro'yxati
                        </h3>
                        <button
                            className="text-sm md:text-base font-semibold text-center bg-purple-200 text-purple-500 rounded-xl border border-purple-500 px-4 py-1 active:scale-95"
                            onClick={handleOpenModal}
                        >
                            + Yangi admin qo'shish
                        </button>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Ism
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Foydalanuvchi nomi
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Foydalanuvchi paroli
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Holati
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center"
                                >
                                    Harakatlar
                                </th>
                            </tr>
                        </thead>
                        {datas.map((data) => (
                            <tbody key={data.id}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <span className="w-9 h-9 bg-indigo-200 text-indigo-500 rounded-full text-center leading-9 text-base font-medium uppercase">
                                            {data.first_name.charAt(0)}
                                            {data.last_name.charAt(0)}
                                        </span>
                                        <div className="ps-3">
                                            <div className="text-base font-semibold capitalize">
                                                {data.first_name}{" "}
                                                {data.last_name}
                                            </div>
                                            <div className="font-normal text-gray-500">
                                                +998905863595
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-2">
                                        {data.username}
                                    </td>
                                    <td className="px-6 py-2">{data.parol}</td>
                                    <td className="px-6 py-2">
                                        <span
                                            className={`font-medium rounded px-3 py-[2px] ${
                                                data.is_active
                                                    ? "bg-green-200 text-green-600"
                                                    : "bg-red-200 text-red-600"
                                            }`}
                                        >
                                            {data.is_active
                                                ? "faol"
                                                : "faol emas"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-2 text-center">
                                        <button
                                            type="button"
                                            className="px-2 py-2 text-xl hover:bg-slate-200 active:bg-slate-400 active:text-slate-100 rounded-full"
                                            onClick={() => editModalOpen(data)}
                                        >
                                            <FaPenToSquare />
                                        </button>
                                        <button
                                            type="button"
                                            className="px-2 py-2 ml-1 text-xl hover:bg-slate-200 active:bg-slate-400 active:text-slate-100 rounded-full"
                                            onClick={() =>
                                                deleteModalOpen(true, data.id)
                                            }
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    {loading && (
                        <p className="text-blue-500 font-bold text-center">
                            Yuklanmoqda...
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 font-bold text-center">
                            Xatolik yuz berdi!
                        </p>
                    )}
                </div>
            </div>
            <div
                className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-5 ${
                    isDeleteModal ? "" : "hidden"
                }`}
            >
                <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
                    <div className="flex items-center justify-center">
                        <BsExclamationCircle className="text-5xl text-red-500" />
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-600 text-center mt-4">
                        Ishonchingiz komilmi?
                    </h1>
                    <p className="text-center mt-4">
                        Siz haqiqatan ham ushbu foydalanuvchini
                        o'chirmoqchimisiz? Bu ma'lumotni ortga qaytarib
                        bo'lmaydi!
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <button
                            className="px-4 py-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 active:scale-95"
                            onClick={() => deleteModalOpen(false)}
                        >
                            Bekor qilish
                        </button>
                        <button
                            className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 active:scale-95"
                            onClick={() => handleDelete()}
                        >
                            Ha, o'chirish
                        </button>
                    </div>
                </div>
            </div>
            <UsersFormCom
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                info={editData}
                roleUser={"admin"}
            />
        </div>
    );
};

export default AdminsCom;
