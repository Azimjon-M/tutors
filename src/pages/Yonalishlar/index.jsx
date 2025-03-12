import React, { useEffect, useCallback, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import APIYonalish from "../../services/yonalish";
import APIFakultet from "../../services/fakultet";
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

const Yonalish = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [fakId, setFakId] = useState(null);
  const [dataYonalishByFakId, setDataYonalishByFakId] = useState([]);
  const [isLoadingYonalish, setIsLoadingYonalish] = useState(false);
  const [isError, setIsError] = useState(false);

  const unShifredTxt = (key, content) => {
    const res = CryptoJS.AES.decrypt(content, key)
      .toString(CryptoJS.enc.Utf8)
      .trim()
      .replace(/^"|"$/g, "");
    return res;
  };

  useEffect(() => {
    if (data) {
      setFakId(
        unShifredTxt(process.env.REACT_APP_SHIFRED_FAKULTET, data?.fakultet)
      );
    }
  }, [data]);

  const getYonalishByFakId = useCallback(async () => {
    setIsLoadingYonalish(true);
    setIsError(false);
    try {
      const res = await APIFakultet.getbyFakId(fakId);
      setDataYonalishByFakId(res?.data[0]?.yonalishlar || []);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
      setIsError(true);
    } finally {
      setIsLoadingYonalish(false);
    }
  }, [fakId]); // fakId o'zgarganda funksiya yangilanadi
  
  useEffect(() => {
    if (fakId) {
      getYonalishByFakId();
    }
  }, [fakId, getYonalishByFakId]);  

  const handleEdit = (data) => {
    setEdit(true);
    setId(data.id);
    formik.setValues({
      name: data.name,
      fakultet: fakId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await APIYonalish.del(id);
      getYonalishByFakId();
    } catch (error) {
      console.error("O‘chirishda xatolik:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      fakultet: fakId,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("fakultet", fakId);
        formData.append("name", values.name);

        if (edit) {
          await APIYonalish.patch(id, formData);
        } else {
          await APIYonalish.post(formData);
        }

        getYonalishByFakId();
        formik.resetForm();
        setEdit(false);
        setId(null);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    },
  });

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Yo'nalish
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
                className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300"
                type="text"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600"
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
            {dataYonalishByFakId.map((data) => (
              <div
                key={data.id}
                className="flex justify-between items-center px-3 py-2 border rounded-lg shadow-md"
              >
                <p className="text-sky-700 font-medium">{data.name}</p>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(data)}>
                    <RiPencilFill />
                  </button>
                  <button onClick={() => handleDelete(data.id)}>
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
