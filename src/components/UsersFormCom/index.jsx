import React, { useEffect, useState } from "react";
import APIUsers from "../../services/users";
import APIFakultet from "../../services/fakultet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdDeleteForever } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";

const UsersFormCom = ({ isOpen, onClose }) => {
  // if(!isOpen) return null;
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 transition-transform">
      <div className="bg-white rounded-lg p-6 w-[450px]">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {edit ? "Tyutorni tahrirlash" : "Yangi tyutor qo'shish"}
          </h2>
          <button onClick={onClose}>x</button>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {/* Fakultet */}
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
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="fakultet"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* First Name */}
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

              {/* Last name */}
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

              {/* Username */}
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

              {/* Password */}
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

              {/* is active btn */}
              <div className="mb-4">
                <div role="group" aria-labelledby="my-radio-group">
                  <p className="block text-sm font-medium text-gray-700">
                    Foydalanuvchi faolligi
                  </p>
                  <label className="mr-3">
                    <Field type="checkbox" name="is_active" className="mr-1" />
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
      </div>
    </div>
  );
};

export default UsersFormCom;
