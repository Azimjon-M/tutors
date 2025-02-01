import React, { useEffect, useState } from "react";
import APIUsers from "../../services/users";
import APIFakultet from "../../services/fakultet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UsersFormCom = ({ isOpen, onClose, info, roleUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [dataFakultet, setDataFakultet] = useState([]);
  const [initialValues, setInitialValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    role: roleUser,
    fakultet: "",
    password: "",
    is_active: true,
  });

  const fetchData = async () => {
    try {
      const resFakultet = await APIFakultet.get();
      setDataFakultet(resFakultet.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    } finally {
    }
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
    setId(data.id);
    setInitialValues({
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role,
      fakultet: data.fakultet ? data.fakultet.name : data.fakultet,
      password: data.parol,
      is_active: data.is_active,
    });
  };

  const handleClose = () => {
    onClose();
    setEdit(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
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
        setId(null);
      }
      resetForm();
      fetchData();
      setEdit(false);
    } catch (error) {
      console.error("Xatolik sodir bo'ldi!", error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (info) {
      setEdit(true);
      handleEdit(info);
    }
  }, [info]);

  useEffect(() => {
    fetchData();
    if (isOpen) {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(true), 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-5 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-[450px] transform transition-transform duration-700 ease-out relative ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        <button
          className="w-8 h-8 bg-white absolute -top-2 -right-2 hover:-translate-x-1 hover:translate-y-1 font-medium shadow-md rounded transition-all focus:bg-slate-100"
          onClick={handleClose}
        >
          X
        </button>
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {edit ? `${roleUser}ni tahrirlash` : `Yangi ${roleUser} qo'shish`}
          </h2>
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
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {roleUser}
                </label>
                <Field
                  component="select"
                  id="fakultet"
                  name="fakultet"
                  className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300"
                >
                  <option value="" disabled selected>
                    Fakultetni kiriting
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
                onClick={onClose}
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
