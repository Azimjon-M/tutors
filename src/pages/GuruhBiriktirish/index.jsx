import React, { useState, useCallback, useEffect } from "react";
import APIFakultet from "../../services/fakultet";
import APIUsers from "../../services/users";
import { useFormik } from "formik";
// import * as Yup from "yup";
import CryptoJS from "crypto-js";

const GuruhBiriktirish = () => {
  const [dataKurslar, setDataKurslar] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [fakId, setFakId] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
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

  const getUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const response = await APIUsers.getFakTutors(fakId);
      setDataUsers(response.data);
    } catch (error) {
      console.error("Fakultetlarni yuklashda xatolik:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [fakId]);

  useEffect(() => {
    if (fakId) {
      getYonalishByFakId();
      getUsers();
    }
  }, [fakId, getYonalishByFakId, getUsers]);

  // const validationSchema = Yup.object().shape({
  //   guruh: Yup.string().required("Required"),
  // });

  // Guruh checkboxlarining o'zgarishini boshqarish
  const handleCheckboxChange = (guruhId, isChecked) => {
    setSelectedGroups((prev) =>
      isChecked ? [...prev, guruhId] : prev.filter((id) => id !== guruhId)
    );
    formik.setFieldValue(
      "guruh",
      isChecked
        ? [...formik.values.guruh, guruhId]
        : formik.values.guruh.filter((id) => id !== guruhId)
    );
  };

  const formik = useFormik({
    initialValues: {
      guruh: [],
    },
    // validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // PATCH request to APIUsers
        await APIUsers.patch(userId, {
          guruh: selectedGroups,
        });
        alert("Guruhlar muvaffaqiyatli yangilandi!");
        getUsers();
        resetForm();
        closeModal();
        setSelectedGroups([]);
      } catch (error) {
        console.error("Ma'lumotni saqlashda xatolik:", error);
      }
    },
  });

  const handleModal = (id) => {
    setOpenModal(true);
    setUserId(id);
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
                    {user.guruh?.map((guruhItem) => (
                      <div
                        className="flex items-center px-3 py-1 border rounded-md bg-white gap-3"
                        key={guruhItem.id}
                      >
                        {guruhItem.kurs.yonalish.name} {guruhItem.kurs.name}
                        -kurs {guruhItem.name}
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
          className={`w-[335px] md:w-[500px] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-lg ${
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
                    className="text-red-500 transition-transform transform hover:rotate-180 text-xs"
                  >
                    ✖️
                  </button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                  {/* head */}
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Yo'nalish</th>
                      <th className="border p-2">Kurs</th>
                      <th className="border p-2">Guruh</th>
                      <th className="border p-2">
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "guruh",
                                e.target.checked
                                  ? dataKurslar.flatMap((yonalish) =>
                                      yonalish.kurslar.flatMap((kurs) =>
                                        kurs.guruhlar?.map((guruh) => guruh.id)
                                      )
                                    )
                                  : []
                              );
                            }}
                            checked={
                              formik.values.guruh.length ===
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
                    {dataKurslar.map((yonalish) =>
                      yonalish.kurslar.map((kurs) =>
                        kurs.guruhlar.map((guruh) => (
                          <tr key={guruh.id} className="border">
                            <td className="border p-2">{yonalish.name}</td>
                            <td className="border p-2">{kurs.name}</td>
                            <td className="border p-2">{guruh.name}</td>
                            <td className="border p-2 text-center">
                              <label>
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  name="guruh"
                                  value={guruh.id}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      guruh.id,
                                      e.target.checked
                                    )
                                  }
                                  checked={formik.values.guruh.includes(
                                    guruh.id
                                  )}
                                />
                              </label>
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Tanlangan guruh nomlari */}
              <div className="mt-4 p-2 border rounded-md bg-gray-100">
                <h3 className="font-semibold text-gray-600 mb-2">
                  Tanlangan guruhlar:
                </h3>
                {formik.values.guruh.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {dataKurslar.flatMap((yonalish) =>
                      yonalish.kurslar.flatMap((kurs) =>
                        kurs.guruhlar
                          .filter((guruh) =>
                            formik.values.guruh.includes(guruh.id)
                          )
                          .map((guruh) => <li key={guruh.id}>{guruh.name}</li>)
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500">Hech qanday guruh tanlanmagan</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className={`w-full mt-4 py-2 px-4 rounded-md text-white font-semibold transition-all ${
                  edit
                    ? "border border-teal-500 bg-teal-500 hover:bg-teal-600 focus:ring focus:ring-teal-300"
                    : "border border-blue-500 bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300"
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
