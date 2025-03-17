import React, { useState, useCallback, useEffect } from "react";
import APIUsers from "../../services/users";
import { useFormik } from "formik";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import CryptoJS from "crypto-js";

const TutorStatistikaQoshish = () => {
  const [openModal, setOpenModal] = useState(false);
  // const [students, setStudents] = useState({});
  // const [groupName, setGroupName] = useState("");
  // const [selectedGroup, setSelectedGroup] = useState("");
  // const [studentName, setStudentName] = useState("");
  // const [gender, setGender] = useState("o'g'il");
  // const [orphanStatus, setOrphanStatus] = useState("oddiy");
  // const [studyType, setStudyType] = useState("kontrakt");
  const [dataUser, setDataUser] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  // const [isError, setIsError] = useState(false);
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
    }
  }, [data]);

  // Get User
  const getUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const response = await APIUsers.getbyId(userId);
      setDataUser(response.data);
    } catch (error) {
      console.error("Fakultetlarni yuklashda xatolik:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUsers();
    }
  }, [userId, getUsers]);

  // Post and patch data
  const formik = useFormik({
    initialValues: {
      guruh: [],
    },
    // validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // PATCH request to APIUsers
        // await APIUsers.patch(userId, {
        //   guruh: selectedGroups,
        // });
        alert("Talaba muvaffaqiyatli qo'shildi!");
        getUsers();
        resetForm();
        closeModal();
      } catch (error) {
        console.error("Ma'lumotni saqlashda xatolik:", error);
      }
    },
  });

  // Tahrirlash
  const handleEdit = () => {
    setOpenModal(true);
  };

  // O'chirish
  const handleDelete = () => {
    setOpenModal(true);
  };

  // Open modal
  const handleOpenModal = (id) => {
    setOpenModal(true);
  };

  // Close modal
  const closeModal = () => {
    setOpenModal(false);
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
          {dataUser?.guruh?.map((item) => (
            <div
              className="collapse bg-base-100 border border-base-300 mb-3"
              key={item.id}
            >
              <input type="radio" name="my-accordion-1" defaultChecked />
              <div className="collapse-title p-4 font-semibold flex items-center justify-between">
                <div>
                  {item?.kurs?.yonalish?.name}
                  <div className="text-sm font-normal">
                    {item?.kurs?.name}-kurs {item?.name}
                  </div>
                </div>
                <button
                  onClick={handleOpenModal}
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
                      <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>
                        <td>Canada</td>
                        <td>12/16/2020</td>
                        <td className="flex space-x-2 justify-center">
                          <button
                            type="button"
                            className="p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                            onClick={() => handleEdit()}
                          >
                            <RiPencilFill />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-lg text-white border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-100 active:border-red-600 active:text-red-600"
                            onClick={() => handleDelete()}
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Zemlak, Daniel and Leannon</td>
                        <td>United States</td>
                        <td>12/5/2020</td>
                        <td>12/5/2020</td>
                        <td className="flex space-x-2 justify-center">
                          <button
                            type="button"
                            className="p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                            onClick={() => handleEdit()}
                          >
                            <RiPencilFill />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-lg text-white border border-red-500 bg-red-500 hover:bg-red-600 active:bg-red-100 active:border-red-600 active:text-red-600"
                            onClick={() => handleDelete()}
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
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
          <div>
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
          </div>
          <div className="p-4 border rounded-lg shadow">
            <div className="space-y-4">
              <div className="border-b border-gray-900/10 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Ism
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="input input-info input-sm block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Familiya
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="input input-info input-sm block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-4">
                {/* Jinsi */}
                <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">
                    Jinsi
                  </legend>
                  <div className="mt-6 flex items-center space-x-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        defaultChecked
                        id="ogil"
                        name="jins"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="ogil"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        O'g'il
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="qiz"
                        name="jins"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="qiz"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Qiz
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="border-b border-gray-900/10 pb-4">
                {/* Tolov */}
                <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">
                    To'lov statusi
                  </legend>
                  <div className="mt-6 flex items-center space-x-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        defaultChecked
                        id="grand"
                        name="tolov"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="grand"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Grand
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="kontrakt"
                        name="tolov"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor="kontrakt"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Kontrakt
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* Ijtimoiy himoya */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Ijtimoiy himoya
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="select select-info select-sm col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  >
                    <option>-- Ijtimoiy himoya --</option>
                    <option>Yoshlar daftari</option>
                    <option>Ayollar daftari</option>
                    <option>Temir daftar</option>
                  </select>
                </div>
              </div>
              {/* Ijtimoiy daraja */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Ijtimoiy daraja
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="select select-info select-sm col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  >
                    <option>-- Ijtimoiy daraja --</option>
                    <option>Nogiron</option>
                    <option>Chin yetim</option>
                    <option>Yetim</option>
                  </select>
                </div>
              </div>
              {/* Iqtidorli talaba */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="talaba"
                  className="block text-sm font-medium text-gray-900"
                >
                  Iqtidorli talaba
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="talaba"
                    name="talaba"
                    className="select select-info select-sm w-full appearance-none rounded-md bg-white py-1 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:text-sm"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="">-- Iqtidorli talaba --</option>
                    <option value="Stipendiant">Stipendiant</option>
                    <option value="Sportchi">Sportchi</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>

                {selectedOption === "Boshqa" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Iltimos, izoh kiriting..."
                      className="input input-info input-sm w-full border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className={`w-full mt-4 py-2 px-4 rounded-md text-white font-semibold transition-all ${
                // edit
                // ? "border border-teal-500 bg-teal-500 hover:bg-teal-600 focus:ring focus:ring-teal-300"
                "border border-blue-500 bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300"
              }`}
            >
              Yuborish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorStatistikaQoshish;
