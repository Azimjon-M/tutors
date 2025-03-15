import React, { useState, useCallback, useEffect } from "react";
import { RiPencilFill } from "react-icons/ri";
import APIFakultet from "../../services/fakultet";
import APIUsers from "../../services/users";
import { useFormik } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

const GuruhBiriktirish = () => {
  const [dataKurslar, setDataKurslar] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [kursId, setKursId] = useState(null);
  const [dataUsers, setDataUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
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
    setIsLoadingUsers(true);
    setIsError(false);
    try {
      const res = await APIFakultet.getbyFakId(fakId);
      setDataKurslar(res?.data[0]?.yonalishlar || []);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
      setIsError(true);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [fakId]);

  useEffect(() => {
    if (fakId) {
      getYonalishByFakId();
    }
  }, [fakId, getYonalishByFakId]);

  // Get tutors
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await APIUsers.getFakTutors(fakId);
        setDataUsers(response.data);
        setIsLoadingUsers(false);
      } catch (error) {
        console.error("Fakultetlarni yuklashda xatolik:", error);
      }
    };
    getUsers();
  }, [fakId]);

  const validationSchema = Yup.object().shape({
    guruh: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      guruh: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Tanlangan guruhlar:", values.guruh);
        await APIUsers.patch(values.id, values.guruh);
        getYonalishByFakId();
        resetForm();
        setOpenModal(false);
        setEdit(false);
      } catch (error) {
        console.error("Ma'lumotni saqlashda xatolik:", error);
      }
    },
  });

  const handleEdit = (guruh) => {
    formik.setValues({
      id: guruh.id,
      guruh: kursId,
    });
    setEdit(true);
    setOpenModal(true);
    setKursId(kursId);
  };

  const handleModal = (id) => {
    setOpenModal(true);
    setKursId(id);
    formik.setFieldValue("kurs", id);
  };

  const closeModal = () => {
    setOpenModal(false);
    formik.resetForm();
    setEdit(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Guruh biriktirish
      </h1>
      <div className="max-w-7xl px-5 mx-auto">
        {isLoadingUsers ? (
          <div className="font-bold text-sky-500 text-center">
            Yuklanmoqda...
          </div>
        ) : isError ? (
          <div className="font-bold text-red-500 text-center">
            Yuklashda Xatolik
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              {dataUsers?.map((user) => (
                <div
                  key={user.id}
                  className="items-center px-3 py-2 border rounded-lg shadow-md hover:shadow-lg mb-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sky-700 font-medium line-clamp-1 mr-5">
                      {user.last_name} {user.first_name}
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleModal(user.id)}
                        className="w-full py-2 px-4 rounded-md text-white font-semibold border border-blue-500 bg-blue-500 hover:bg-blue-600 active:bg-blue-100 active:border-blue-600 active:text-blue-600"
                      >
                        Biriktirish
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {user.guruhlar?.map((guruh) => (
                      <div
                        className="flex items-center px-3 py-1 border rounded-md bg-white gap-3"
                        key={guruh.id}
                      >
                        {guruh.name}
                        <button
                          type="button"
                          className="p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                          onClick={() => handleEdit(guruh, user.id)}
                        >
                          <RiPencilFill />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        <div
          className={`w-[325px] fixed top-[20%] bg-white rounded-lg ${
            !openModal && "hidden"
          }`}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="p-4 border rounded-lg shadow">
              {/* Table */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-600">
                    {edit ? "Tyutorni tahrirlash" : "Tyutor biriktirish"}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-red-500 transition-all rotate-0 hover:rotate-180 text-xs"
                  >
                    ✖️
                  </button>
                </div>
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Yo'nalish</th>
                      <th>Kurs</th>
                      <th>Guruh</th>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                formik.setFieldValue(
                                  "guruh",
                                  dataKurslar.flatMap((yonalish) =>
                                    yonalish.kurslar.flatMap((kurs) =>
                                      kurs.guruhlar?.map((guruh) => guruh.id)
                                    )
                                  )
                                );
                              } else {
                                formik.setFieldValue("guruh", []);
                              }
                            }}
                            checked={
                              formik.values.guruh?.length ===
                              dataKurslar.flatMap((yonalish) =>
                                yonalish.kurslar.flatMap((kurs) =>
                                  kurs.guruhlar.map((guruh) => guruh.id)
                                )
                              ).length
                            }
                          />
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataKurslar?.map((yonalish) =>
                      yonalish.kurslar?.map((kurs) =>
                        kurs.guruhlar?.map((guruh) => (
                          <tr key={guruh.id}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="font-bold">
                                    {yonalish?.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{kurs?.name}</td>
                            <td>{guruh?.name}</td>
                            <th>
                              <label>
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  name="guruh"
                                  value={guruh.id}
                                  onChange={formik.handleChange}
                                  checked={formik.values.guruh?.includes(
                                    guruh.id
                                  )}
                                />
                              </label>
                            </th>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {/* End table */}
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

export default GuruhBiriktirish;
