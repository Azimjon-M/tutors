import React, { useEffect, useState } from "react";
import APITopshiriq from "../../services/adminQoshimchaTopshiriq.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TutorModalOilagaXat = ({ isOpen, onClose, info, roleUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [initialValues, setInitialValues] = useState({
    category: "",
    description: "",
    is_active: true,
  });

  const validationSchema = Yup.object({
    category: Yup.string().required("Kategoriya tanlash majburiy"),
    description: Yup.string().required("Tavsif majburiy"),
    is_active: Yup.boolean(),
  });

  const handleEdit = (data) => {
    setId(data.id);
    setInitialValues({
      category: data.category,
      description: data.description,
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
    if (info) {
      setEdit(true);
      handleEdit(info);
    }
  }, [info]);

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
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {edit ? `Xatni tahrirlash` : `Yangi xat yaratish`}
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
              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kategoriya
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300"
                >
                  <option value="" label="Kategoriya tanlang" />
                  <option value="category1" label="Bildirgi" />
                  <option value="category2" label="Ogohlantirish xati" />
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tavsif
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                />
                <ErrorMessage
                  name="description"
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
                {edit ? "Saqlash" : "Shakllantirish"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TutorModalOilagaXat;
