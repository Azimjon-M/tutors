import React, { useState, useCallback, useEffect } from "react";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import APIFakultet from "../../services/fakultet";
import APIGuruxlar from "../../services/guruxlar";
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

const Guruxlar = () => {
  const [dataKurslar, setDataKurslar] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataGuruhlar, setDataGuruhlar] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isLoadingGuruhlar, setIsLoadingGuruhlar] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fakId, setFakId] = useState(null);
  const data = JSON.parse(localStorage.getItem("data"));

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

  //   Get yonalishlar by fakId
  const getYonalishByFakId = useCallback(async () => {
    setIsLoadingGuruhlar(true);
    setIsError(false);
    try {
      const res = await APIFakultet.getbyFakId(fakId);
      setDataKurslar(res?.data[0]?.yonalishlar || []);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
      setIsError(true);
    } finally {
      setIsLoadingGuruhlar(false);
    }
  }, [fakId]);

  useEffect(() => {
    if (fakId) {
      getYonalishByFakId();
    }
  }, [fakId, getYonalishByFakId]);

  // Get kurslar
  useEffect(() => {
    const getKurslar = async () => {
      try {
        const response = await APIGuruxlar.get();
        setDataGuruhlar(response.data);
        setIsLoadingGuruhlar(false);
      } catch (error) {
        console.error("Fakultetlarni yuklashda xatolik:", error);
      }
    };

    getKurslar();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    kurs: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      kurs: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (edit) {
          await APIGuruxlar.patch(values.id, values);
          getYonalishByFakId();
        } else {
          const response = await APIGuruxlar.post(values);
          setDataGuruhlar([...dataGuruhlar, response.data]);
          getYonalishByFakId();
        }
        resetForm();
        setOpenModal(false);
        setEdit(false);
      } catch (error) {
        console.error("Ma'lumotni saqlashda xatolik:", error);
      }
    },
  });

  const handleEdit = (kurs) => {
    formik.setValues({
      id: kurs.id,
      name: kurs.name,
      yonalish: kurs.yonalish,
    });
    setEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      await APIGuruxlar.del(id);
      setDataGuruhlar((prev) => prev.filter((kurs) => kurs.id !== id));
    } catch (error) {
      console.error("Kursni o‘chirishda xatolik:", error);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Guruhlar
      </h1>
      <div className="max-w-7xl px-5 mx-auto">
        {isLoadingGuruhlar ? (
          <div className="font-bold text-sky-500 text-center">
            Yuklanmoqda...
          </div>
        ) : isError ? (
          <div className="font-bold text-red-500 text-center">
            Yuklashda Xatolik
          </div>
        ) : (
          <div className="space-y-3">
            {dataKurslar?.map((data) => (
              <div
                key={data.id}
                className="px-3 py-2 border rounded-lg shadow-md hover:shadow-lg"
              >
                <p className="text-sky-700 font-medium line-clamp-1 my-3">
                  {data.name}
                </p>
                <div>
                  {data.kurslar.map((kurs) => (
                    <div
                      key={kurs.id}
                      className="items-center px-3 py-2 border rounded-lg shadow-md hover:shadow-lg mb-3"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sky-700 font-medium line-clamp-1 mr-5">
                          {kurs.name}-kurs
                        </p>
                        <div>
                          <button
                            onClick={() => setOpenModal(true)}
                            className="w-full py-2 px-4 rounded-md text-white font-semibold border border-blue-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-100 active:border-blue-600 active:text-blue-600"
                          >
                            Guruh qo'shish
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {kurs.guruhlar.map((guruh) => (
                          <div className="flex items-center px-3 py-1 border rounded-md bg-white gap-3">
                            {guruh.name}
                            <button
                              type="button"
                              className="p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                              onClick={() => handleEdit(kurs)}
                            >
                              <RiPencilFill />
                            </button>
                            <button
                              type="button"
                              className="p-2 rounded-lg text-white border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-100 active:border-red-600 active:text-red-600"
                              onClick={() => handleDelete(kurs.id)}
                            >
                              <MdDeleteForever />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <div
          className={`max-w-xl fixed top-[50%] bg-white rounded-lg ${
            !openModal && "hidden"
          }`}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="p-4 border rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-600 mb-4">
                {edit ? "Guruhni tahrirlash" : "Guruh qo'shish"}
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Guruh nomi
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
        </div>
      </div>
    </div>
  );
};

export default Guruxlar;
