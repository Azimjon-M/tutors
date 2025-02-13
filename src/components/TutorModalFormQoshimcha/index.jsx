import React, { useEffect, useState } from "react";
import APITopshiriq from "../../services/qoshimchaTopshiriqTutor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TutorModalFormQoshimcha = ({ isOpen, onClose, task }) => {
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    body: "",
    file1: "",
    file2: "",
    file3: "",
  });

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (task) {
      setInitialValues({
        title: task.title,
        body: "",
        file1: "",
        file2: "",
        file3: "",
      });
    }
  }, [task]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Sarlavha nomi majburiy"),
    body: Yup.string().required("Tavsif majburiy"),
    file1: Yup.mixed()
      .required("Rasm majburiy")
      .test(
        "fileType",
        "Faqat .jpg, .jpeg, .png formatidagi fayllar",
        (value) => {
          return value && ["image/jpeg", "image/png"].includes(value.type);
        }
      ),
    file2: Yup.mixed()
      .required("Rasm majburiy")
      .test(
        "fileType",
        "Faqat .jpg, .jpeg, .png formatidagi fayllar",
        (value) => {
          return value && ["image/jpeg", "image/png"].includes(value.type);
        }
      ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("topshiriq", task?.id);
    formData.append("title", values.title);
    formData.append("body", values.body);
    if (values.file1) formData.append("file1", values.file1);
    if (values.file2) formData.append("file2", values.file2);
    if (values.file3) formData.append("file3", values.file3);

    try {
      await APITopshiriq.patch(task?.id, formData);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Xatolik sodir bo'ldi!", error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-5">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] md:w-[600px] relative">
        <button
          className="w-8 h-8 bg-white absolute -top-2 -right-2 hover:-translate-x-1 hover:translate-y-1 font-medium shadow-md rounded transition-all focus:bg-slate-100"
          onClick={onClose}
        >
          X
        </button>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Sarlavha
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full border p-2 rounded"
                  disabled
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium">
                  Tavsif
                </label>
                <Field
                  as="textarea"
                  id="body"
                  name="body"
                  rows="4"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="body"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="file1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rasm 1
                  </label>
                  <input
                    type="file"
                    id="file1"
                    name="file1"
                    accept="image/*"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                    onChange={(event) =>
                      setFieldValue("file1", event.target.files[0])
                    }
                  />
                  <ErrorMessage
                    name="file1"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="file2"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rasm 2
                  </label>
                  <input
                    type="file"
                    id="file2"
                    name="file2"
                    accept="image/*"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                    onChange={(event) =>
                      setFieldValue("file2", event.target.files[0])
                    }
                  />
                  <ErrorMessage
                    name="file2"
                    component="div"
                    className="text-red-500 text-sm"
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
                className="w-full mt-4 py-2 px-4 rounded bg-blue-500 text-white"
              >
                Saqlash
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TutorModalFormQoshimcha;
