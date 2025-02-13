import React, { useState } from "react";
import APITopshiriq from "../../../services/qoshimchaTopshiriqTutor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TutorTashabbusi = () => {
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    body: "",
    file1: "",
    file2: "",
    file3: "",
  });

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
    formData.append("title", values.title);
    formData.append("body", values.body);
    if (values.file1) formData.append("file1", values.file1);
    if (values.file2) formData.append("file2", values.file2);
    if (values.file3) formData.append("file3", values.file3);

    try {
      await APITopshiriq.post(formData);
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Xatolik sodir bo'ldi!", error);
    }
  };

  return (
    <div>
      {/* 📌 Hero */}
      <div className="relative bg-blue-50 py-20 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            O‘z g‘oyangizni hayotga tatbiq qiling!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Tashabbusingizni biz bilan bo‘lishing va o‘z ijodingizni namoyish
            eting. Hayotga yangiliklar kiritishga shaymisiz?
          </p>
          <div className="mt-6">
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition cursor-pointer z-50"
              onClick={() => setShowModal(true)}
            >
              O‘z tashabbusingizni qo‘shing
            </button>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-transparent opacity-50 pointer-events-none"></div>
      </div>
      <div className="my-3">
        <h2 className="text-2xl lg:text-3xl font-medium text-center">
          Tashabbuslar
        </h2>
        <div className="text-red-500 text-xl italic text-center my-5">
          Tashabbuslar mavjud emas.!
        </div>
      </div>
      {/* 📌 Tashabbuslar */}
      <div>Tashabbus</div>

      {/* 📌 Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-5 ${
          showModal ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] md:w-[600px] relative">
          <button
            className="w-8 h-8 bg-white absolute -top-2 -right-2 hover:-translate-x-1 hover:translate-y-1 font-medium shadow-md rounded transition-all focus:bg-slate-100"
            onClick={() => setShowModal(false)}
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
    </div>
  );
};

export default TutorTashabbusi;
