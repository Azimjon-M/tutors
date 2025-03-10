import React, { useState, useEffect, useRef } from "react";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIYonalish from "../../services/yonalish";
import APIFakultet from "../../services/fakultet";
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

const Yonalish = () => {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const [yonalishId, setYonalishId] = useState(null);
  const [fakId, setFakId] = useState(null);

  //   Fakultet name va IDsini olish
  const [fakName, setFakName] = useState(null);
  const dataFakultet = JSON.parse(localStorage.getItem("data"));

  const unShifredTxt = (key, content) => {
    const res = CryptoJS.AES.decrypt(content, key)
      .toString(CryptoJS.enc.Utf8)
      .trim()
      .replace(/^"|"$/g, "");
    return res;
  };

  const removeLoopGetTutor = useRef(false);

  useEffect(() => {
    if (!removeLoopGetTutor.current) {
      removeLoopGetTutor.current = true;

      const fakultetId = unShifredTxt(
        process.env.REACT_APP_SHIFRED_FAKULTET,
        dataFakultet?.fakultet
      );
      setFakId(fakultetId);

      const fetchFakultet = async () => {
        try {
          const response = await APIFakultet.getbyId(fakultetId);
          setFakName(response?.data);
          console.log(fakName);
        } catch (error) {
          console.error("Failed to fetch fakultet", error);
        }
      };

      fetchFakultet();
    }
  }, [dataFakultet, fakName]);

  const {
    data: dataYonalish = [],
    isLoadingYonalish,
    isError,
  } = useQuery({
    queryKey: ["getYobnalish"], // query id si
    queryFn: async () => {
      const response = await APIYonalish.get();
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => APIYonalish.del(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getYobnalish"]);
    },
  });

  const handleEdit = (data) => {
    setEdit(true);
    setYonalishId(data.id);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    fakName: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      fakId: fakId || "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Yangi yo‘nalish:", values.name);
      setEdit(false);
      setYonalishId(null);
      resetForm();
    },
  });

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        {fakName} yo'nalishlari
      </h1>
      <div className="max-w-7xl px-5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">
              {edit ? "Yo'nalishni tahrirlash" : "Yangi yo'nalish qo'shish"}
            </h2>
            <div className="mb-4">
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
                edit
                  ? "border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                  : "border border-blue-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-100 active:border-blue-600 active:text-blue-600"
              }`}
            >
              {edit ? "Saqlash" : "Yuborish"}
            </button>
          </div>
        </form>

        {isLoadingYonalish ? (
          <div className="font-bold text-sky-500 text-center">
            Yuklanmoqda...
          </div>
        ) : isError ? (
          <div className="font-bold text-red-500 text-center">
            Yuklashda Xatolik
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {dataYonalish.map((data) => (
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

export default Yonalish;
