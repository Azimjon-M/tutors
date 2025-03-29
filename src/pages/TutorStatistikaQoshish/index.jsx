import React, { useState, useCallback, useEffect } from "react";
// import APIUsers from "../../services/users";
import APITalaba from "../../services/talaba";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import CryptoJS from "crypto-js";
import APIFakultet from "../../services/fakultet";

const TutorStatistikaQoshish = () => {
  const [dataKurslar, setDataKurslar] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fakId, setFakId] = useState("");
  const [guruhId, setGuruhId] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [userId, setUserId] = useState(null);
  const data = JSON.parse(localStorage.getItem("data"));

  // Unshifred id
  const unShifredTxt = (key, content) => {
    const res = CryptoJS.AES.decrypt(content, key)
      .toString(CryptoJS.enc.Utf8)
      .trim()
      .replace(/^"|"$/g, "");
    return res;
  };
  useEffect(() => {
    if (data) {
      setUserId(unShifredTxt(process.env.REACT_APP_SHIFRED_ID, data?.id));
      setFakId(
        unShifredTxt(process.env.REACT_APP_SHIFRED_FAKULTET, data?.fakultet)
      );
    }
  }, [data]);

  const getYonalishByFakId = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const res = await APIFakultet.getbyFakId(fakId);
      setDataKurslar(res?.data[0] || []);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [fakId]);

  useEffect(() => {
    if (userId) {
      getYonalishByFakId();
    }
  }, [userId, getYonalishByFakId]);

  const validationSchema = Yup.object({
    ism: Yup.string().required("Ism kiritilishi shart"),
    familya: Yup.string().required("Familiya kiritilishi shart"),
    jins: Yup.string().oneOf(["o`g`il", "qiz"], "Noto‘g‘ri jins"),
    tolov_status: Yup.string().required("To'lov statusini tanlang"),
  });

  const formik = useFormik({
    initialValues: {
      ism: "",
      familya: "",
      jins: "",
      tolov_status: "",
      ijtimoiy_ximoya: "",
      ijtimoiy_daraja: "",
      iqdidorli_talaba: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await APITalaba.post({
          guruh: guruhId,
          tyutor: userId,
          ism: values.ism,
          familya: values.familya,
          jins: values.jins,
          tolov_status: values.tolov_status,
          ijtimoiy_ximoya: values.ijtimoiy_ximoya,
          ijtimoiy_daraja: values.ijtimoiy_daraja,
          iqdidorli_talaba: values.iqdidorli_talaba,
        });
        alert("Talaba muvaffaqiyatli qo'shildi!");
        getYonalishByFakId();
        resetForm();
        closeModal();
      } catch (error) {
        console.error("Ma'lumotni saqlashda xatolik:", error);
      }
    },
  });

  // Tahrirlash
  const handleEdit = (talaba) => {
    setOpenModal(true);
    getYonalishByFakId();
  };

  // O'chirish
  const handleDelete = async (id) => {
    alert("Chindan ham talabani o'chirmoqchimisiz?");
    await APITalaba.del(id);
    getYonalishByFakId();
  };

  // Open modal
  const handleAddTalaba = (yonalish, kurs, guruh) => {
    setGuruhId(guruh.id);
    setOpenModal(true);
  };

  // Close modal
  const closeModal = () => {
    setOpenModal(false);
    setGuruhId("");
    setFakId("");
    setSelectedOption("");
    formik.resetForm();
  };

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Talabalar statistikasi
      </h2>
      {isLoadingUsers ? (
        <div className="font-bold text-sky-500 text-center">Yuklanmoqda...</div>
      ) : (
        <div>
          {dataKurslar?.yonalishlar?.map((yonalish) =>
            yonalish?.kurslar?.map((kurs) =>
              kurs?.guruhlar?.map((guruh) => (
                <div
                  className="collapse bg-base-100 border border-base-300 mb-3"
                  key={guruh.id}
                >
                  <input type="radio" name="my-accordion-1" defaultChecked />
                  <div className="collapse-title p-4 font-semibold flex items-center justify-between">
                    <div>
                      {yonalish?.name}
                      <div className="text-sm font-normal">
                        {kurs?.name}-kurs {guruh?.name}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleAddTalaba(yonalish.id, kurs.id, guruh.id)
                      }
                      className="flex items-center font-semibold rounded-md bg-indigo-500 hover:bg-indigo-600 py-1 px-2 text-white z-10"
                    >
                      <MdOutlinePersonAddAlt className="mr-1" />
                      Qo'shish
                    </button>
                  </div>
                  <div className="collapse-content text-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="table table-xs">
                        <thead>
                          <tr>
                            <th>№</th>
                            <th>F.I.Sh</th>
                            <th>Jins</th>
                            <th>To‘lov statusi</th>
                            <th>Ijtimoiy himoya</th>
                            <th>Ijtimoiy daraja</th>
                            <th>Iqtidorli talaba</th>
                            <th className="text-center">Amallar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guruh?.talabalar?.map((talaba, index) => (
                            <tr key={talaba.id}>
                              <th>{index + 1}</th>
                              <td>
                                {talaba.familya} {talaba.ism}
                              </td>
                              <td>{talaba.jins}</td>
                              <td>{talaba.tolov_status}</td>
                              <td>{talaba.ijtimoiy_ximoya}</td>
                              <td>{talaba.ijtimoiy_daraja}</td>
                              <td>{talaba.iqdidorli_talaba}</td>
                              <td className="flex space-x-2 justify-center">
                                <button
                                  type="button"
                                  className="p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                                  onClick={() => handleEdit(talaba)}
                                >
                                  <RiPencilFill />
                                </button>
                                <button
                                  type="button"
                                  className="p-2 rounded-lg text-white border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-100 active:border-red-600 active:text-red-600"
                                  onClick={() => handleDelete(talaba.id)}
                                >
                                  <MdDeleteForever />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      )}

      {/* Modal */}
      <div
        className={`w-[335px] md:w-[500px] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-lg z-10 ${
          !openModal && "hidden"
        }`}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="p-4 border rounded-lg shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-600">
              Talaba qo'shish
            </h2>
            <button
              type="button"
              onClick={closeModal}
              className="text-red-500 transition-transform transform hover:rotate-180 text-xs"
            >
              ✖️
            </button>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <div className="space-y-4">
              <div className="border-b border-gray-900/10 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  {/* Ism */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ism"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Ism
                    </label>
                    <input
                      id="ism"
                      name="ism"
                      type="text"
                      value={formik.values.ism}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="input input-info input-sm block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                    />
                    {formik.touched.ism && formik.errors.ism && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.ism}
                      </p>
                    )}
                  </div>
                  {/* Familiya */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="familya"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Familiya
                    </label>
                    <input
                      id="familya"
                      name="familya"
                      type="text"
                      value={formik.values.familya}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="input input-info input-sm block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300"
                    />
                    {formik.touched.familya && formik.errors.familya && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.familya}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Jinsi */}
              <div className="border-b border-gray-900/10 pb-3">
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900">
                    Jinsi
                  </legend>
                  <div className="mt-2 flex space-x-6">
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        name="jins"
                        value="o`g`il"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.jins === "o`g`il"}
                      />
                      O'g'il
                    </label>
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        name="jins"
                        value="qiz"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.jins === "qiz"}
                      />
                      Qiz
                    </label>
                  </div>
                  {formik.touched.jins && formik.errors.jins && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.jins}
                    </p>
                  )}
                </fieldset>
              </div>

              {/* To'lov statusi */}
              <div className="border-b border-gray-900/10 pb-3">
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900">
                    To'lov statusi
                  </legend>
                  <div className="mt-2 flex space-x-6">
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        name="tolov_status"
                        value="grand"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.tolov_status === "grand"}
                      />
                      Grand
                    </label>
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        name="tolov_status"
                        value="kontrakt"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.tolov_status === "kontrakt"}
                      />
                      Kontrakt
                    </label>
                  </div>
                  {formik.touched.tolov_status &&
                    formik.errors.tolov_status && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.tolov_status}
                      </p>
                    )}
                </fieldset>
              </div>

              {/* Selectlar */}
              <div className="space-y-4">
                {[
                  {
                    name: "ijtimoiy_ximoya",
                    label: "Ijtimoiy himoya",
                    options: [
                      "Yoshlar daftari",
                      "Ayollar daftari",
                      "Temir daftar",
                    ],
                  },
                  {
                    name: "ijtimoiy_daraja",
                    label: "Ijtimoiy daraja",
                    options: ["Nogiron", "Chin yetim", "Yetim"],
                  },
                  {
                    name: "iqdidorli_talaba",
                    label: "Iqtidorli talaba",
                    options: ["Stipendiant", "Sportchi", "Boshqa"],
                  },
                ].map(({ name, label, options }) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      {label}
                    </label>
                    <select
                      id={name}
                      name={name}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      className="select select-info select-sm w-full rounded-md bg-white px-3 text-gray-900 outline-gray-300"
                    >
                      <option value="">-- {label} --</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {selectedOption === "Boshqa" && (
                  <div className="mt-2">
                    <input
                      id="iqdidorli_talaba"
                      name="iqdidorli_talaba"
                      type="text"
                      placeholder="Iltimos, izoh kiriting..."
                      className="input input-info input-sm w-full border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorStatistikaQoshish;
