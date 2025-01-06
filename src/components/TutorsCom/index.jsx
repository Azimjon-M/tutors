import React, { useEffect, useState } from "react";
import APIUsers from "../../services/users";
import APIFakultet from "../../services/fakultet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";


import userImage from "../../assets/fon/user2.png";

const TutorsCom = () => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const [dataFakultet, setDataFakultet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    role: "tutor",
    fakultet: "",
    password: "",
    is_active: true,
  });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const resFakultet = await APIFakultet.get();
      const response = await APIUsers.getRole("tutor");
      setDataFakultet(resFakultet.data);
      setDatas(response.data);
    } catch (error) {
      setError("Ma'lumotni olishda xatolik yuz berdi!");
      console.error("Xatolik yuz berdi!", error);
    } finally {
      setLoading(false);
    }
  };

  const fakultetName = (id) => {
    const data = dataFakultet.find((item) => item.id === id);
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
      .oneOf(["superadmin", "admin", "tutor"], "Noto'g'ri rol tanlangan")
      .required("Rol majburiy"),
    is_active: Yup.boolean(),
  });

  const handleEdit = (data) => {
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

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      await APIUsers.del(id);
      fetchData();
    } catch (error) {
      setError("Ma'lumotni o'chirishda xatolik yuz berdi!");
      console.error("Xatolik yuz berdi!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setError("");
    const formData = new FormData();
    for (let key in values) {
      if (key === "is_active") {
        formData.append(key, values[key] ? "true" : "false");
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      if (!edit) {
        await APIUsers.post(formData);
      } else {
        await APIUsers.patch(id, formData);
        setEdit(false);
        setId(null);
      }
      fetchData();
      resetForm();
    } catch (error) {
      setError("Ma'lumotni yuborishda xatolik yuz berdi!");
      console.error("Xatolik sodir bo'ldi!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Tyutorlar
      </h1>
      <div className="max-w-7xl px-5 mx-auto grid gap-4">
        {/* <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {edit ? "Tyutorni tahrirlash" : "Yangi tyutor qo'shish"}
          </h2>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                Fakultet
                <div className="mb-4">
                  <label
                    htmlFor="fakultet"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tyutor
                  </label>
                  <Field
                    component="select"
                    id="fakultet"
                    name="fakultet"
                    className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300"
                  >
                    <option value="" disabled>
                      Tyutorni kiriting
                    </option>
                    {dataFakultet.map((data) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="fakultet"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                First Name
                <div className="mb-4">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ismi
                  </label>
                  <Field
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                Last name
                <div className="mb-4">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Familiyasi
                  </label>
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                Username
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Foydalanuvchi nomi
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                Password
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Parol
                  </label>
                  <Field
                    type="text"
                    id="password"
                    name="password"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                is active btn
                <div className="mb-4">
                  <div role="group" aria-labelledby="my-radio-group">
                    <p className="block text-sm font-medium text-gray-700">
                      Foydalanuvchi faolligi
                    </p>
                    <label className="mr-3">
                      <Field
                        type="checkbox"
                        name="is_active"
                        className="mr-1"
                      />
                      {values.is_active ? "faol" : "faol emas"}
                    </label>
                  </div>
                  <ErrorMessage
                    name="is_active"
                    component="div"
                    className="text-red-500 text-sm mt-1"
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
              </Form>
            )}
          </Formik>
        </div> */}

        <div class="rounded-md shadow-md">
          <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
            <h3 className="text-xl font-medium">Tyutorlar ro'yxati</h3>
            <button className="bg-purple-200 text-purple-500 rounded-xl border border-purple-500 text-base font-semibold px-4 py-1 active:scale-95 text-center">
              Tyutor qo'shing
            </button>
          </div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Ism
                </th>
                <th scope="col" class="px-6 py-3">
                  Foydalanuvchi nomi
                </th>
                <th scope="col" class="px-6 py-3">
                  Foydalanuvchi paroli
                </th>
                <th scope="col" class="px-6 py-3">
                  Holati
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Harakatlar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span className="w-9 h-9 bg-indigo-200 text-indigo-500 rounded-full text-center leading-9 text-base font-medium">
                    BA
                  </span>
                  <div class="ps-3">
                    <div class="text-base font-semibold">Botir Anvarov</div>
                    <div class="font-normal text-gray-500">+998905863595</div>
                  </div>
                </th>
                <td class="px-6 py-2">Userjon</td>
                <td class="px-6 py-2">
                  User123
                  {/* <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                    </div> */}
                </td>
                <td class="px-6 py-2">
                  <span className="font-medium rounded bg-green-200 text-green-600 px-3 py-[2px]">
                    faol
                  </span>
                </td>
                <td class="px-6 py-2 space-x-2 text-center">
                  <button
                    type="button"
                    className="px-2 py-2 text-xl hover:bg-slate-200 active:bg-slate-400 active:text-slate-100 rounded-full"
                    // onClick={() => handleEdit(data)}
                  >
                    <FaPenToSquare />
                    {/* <RiPencilFill /> */}
                  </button>
                  <button
                    type="button"
                    className="px-2 py-2 text-xl hover:bg-slate-200 active:bg-slate-400 active:text-slate-100 rounded-full"
                    // onClick={() => handleDelete(data.id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto overscroll-y-auto">
          {loading && (
            <p className="text-blue-500 font-bold text-center">
              Yuklanmoqda...
            </p>
          )}
          {error && (
            <p className="text-red-500 font-bold text-center">{error}</p>
          )}
          {datas.map((data) => (
            <div
              key={data.id}
              className="collapse collapse-arrow border rounded-lg shadow-md hover:shadow-lg"
            >
              <input type="checkbox" name="my-accordion-2" />
              <div className="collapse-title flex justify-between items-center">
                <p className="text-sky-700 font-medium line-clamp-1">
                  <span className="text-sky-800 font-bold">Tyutor:</span>{" "}
                  {data.first_name} {data.last_name}
                </p>
                <div className="flex space-x-2 z-10">
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
              <div className="collapse-content space-y-2">
                <p className="text-sky-700 font-medium">
                  <span className="text-sky-800 font-bold">
                    Fakultitet nomi:
                  </span>{" "}
                  {fakultetName(data.fakultet)}
                </p>
                <p className="text-sky-700 font-medium">
                  <span className="text-sky-800 font-bold">
                    Foydalanuvchi nomi:
                  </span>{" "}
                  {data.username}
                </p>
                <p className="text-sky-700 font-medium">
                  <span className="text-sky-800 font-bold">
                    Foydalanuvchi paroli:
                  </span>{" "}
                  {data.parol}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsCom;
