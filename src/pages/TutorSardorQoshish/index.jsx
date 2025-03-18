import React, { useState, useCallback, useEffect } from "react";
import APIUsers from "../../services/users";
import { useFormik } from "formik";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import CryptoJS from "crypto-js";

const TutorSardorQoshish = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [userId, setUserId] = useState(null);
  const data = JSON.parse(localStorage.getItem("data"));
  const [phone, setPhone] = useState("");

  // Phone number
  const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 2)
      cleaned = cleaned.slice(0, 2) + " " + cleaned.slice(2);
    if (cleaned.length > 6)
      cleaned = cleaned.slice(0, 6) + " " + cleaned.slice(6);
    if (cleaned.length > 9)
      cleaned = cleaned.slice(0, 9) + " " + cleaned.slice(9);
    return cleaned;
  };
  const handleChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

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
    setPhone("")
    formik.resetForm();
  };

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Guruh sardorlari
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
                        <th>Ism</th>
                        <th>Familiya</th>
                        <th>Telefon nomer</th>
                        <th className="text-center">Amallar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
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
                      htmlFor="ism"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Ism
                    </label>
                    <div className="mt-2">
                      <input
                        id="ism"
                        name="ism"
                        type="text"
                        autoComplete="given-name"
                        className="input input-info input-sm block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="familya"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Familiya
                    </label>
                    <div className="mt-2">
                      <input
                        id="familya"
                        name="familya"
                        type="text"
                        autoComplete="family-name"
                        className="input input-info input-sm block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <label
                htmlFor="input-group-1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Telefon
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-gray-500">
                  +998
                </div>
                <input
                  type="text"
                  id="input-group-1"
                  className="input input-info input-sm border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="00 000 00 00"
                  maxLength="12"
                  inputMode="numeric"
                  value={phone}
                  onChange={handleChange}
                />
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

export default TutorSardorQoshish;
