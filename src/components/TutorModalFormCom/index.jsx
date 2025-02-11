import React, { useEffect, useState } from "react";
import APITopshiriq from "../../services/qoshimchaTopshiriqTutor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TutorModalFormCom = ({ isOpen, onClose, task }) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    body: "",
    file1: "",
    file2: "",
    file3: "",
    is_active: true,
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Sarlavha nomi majburiy"),
    body: Yup.string().required("Tavsif majburiy"),
    file1: Yup.string().required("Rasm majburiy"),
    file2: Yup.string().required("Rasm majburiy"),
    is_active: Yup.boolean(),
  });

  const handleEdit = (data) => {
    setId(data.id);
    setInitialValues({
      title: task.title,
      body: "",
      file1: "",
      file2: "",
      file3: "",
    });
  };

  const handleClose = () => {
    onClose();
    setEdit(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    // FormData uchun to'g'ri qo'shish
    formData.append("user", values.title);
    formData.append("topshiriq", task?.id);
    formData.append("title", values.title);
    formData.append("body", values.body);
    if (values.file1) formData.append("file1", values.file1);
    if (values.file2) formData.append("file2", values.file2);
    if (values.file3) formData.append("file3", values.file3);
    formData.append("is_active", values.is_active ? "true" : "false");

    try {
      if (!edit) {
        await APITopshiriq.post(formData);
      } else {
        await APITopshiriq.patch(id, formData);
        setId(null);
      }
      resetForm();
      setEdit(false);
    } catch (error) {
      console.error("Xatolik sodir bo'ldi!", error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (task) {
      setEdit(true);
      handleEdit(task);
    }
  }, [task]);

  useEffect(() => {
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
        className={`bg-white rounded-lg shadow-lg p-6 w-[450px] md:w-[600px] transform transition-transform duration-700 ease-out relative ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        <button
          className="w-8 h-8 bg-white absolute -top-2 -right-2 hover:-translate-x-1 hover:translate-y-1 font-medium shadow-md rounded transition-all focus:bg-slate-100"
          onClick={handleClose}
        >
          X
        </button>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sarlavha
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  disabled
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Body */}
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tavsif
                </label>
                <Field
                  as="textarea"
                  id="body"
                  name="body"
                  rows="4"
                  className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                />
                <ErrorMessage
                  name="body"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="file1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rasm 1
                  </label>
                  <Field
                    type="file"
                    id="file1"
                    name="file1"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  />
                  <ErrorMessage
                    name="file1"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="file2"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rasm 2
                  </label>
                  <Field
                    type="file"
                    id="file2"
                    name="file2"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  />
                  <ErrorMessage
                    name="file2"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Qo'shimcha xujjat */}
              <div className="mb-4">
                <label
                  htmlFor="file3"
                  className="block text-sm font-medium text-gray-700"
                >
                  Qo'shiimcha xujjat
                </label>
                <Field
                  type="file"
                  id="file3"
                  name="file3"
                  className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                />
                <ErrorMessage
                  name="file3"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                onClick={onClose}
                className={`w-full mt-4 py-2 px-4 rounded-md text-white font-semibold ${
                  edit
                    ? "border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                    : "border border-indigo-500 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-200 active:border-indigo-600 active:text-indigo-600"
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

export default TutorModalFormCom;
