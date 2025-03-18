import React, { useState, useEffect, useRef } from "react";
import APIOzXoshishi from "../../../services/ozXohishBilanTutor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";

const TutorTashabbusi = () => {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tashabbuslar, setTashabbuslar] = useState(null);
  const data = JSON.parse(localStorage.getItem("data"));
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const clearFileInput = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [initialValues] = useState({
    user: "",
    title: "",
    body: "",
    file1: "",
    file2: "",
    file3: "",
  });

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

  // 📌 GET - Barcha topshiriqlarni olish
  const getTasks = async () => {
    try {
      const response = await APIOzXoshishi.get();
      setTashabbuslar(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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
    formData.append("user", userId);
    formData.append("title", values.title);
    formData.append("body", values.body);
    if (values.file1) formData.append("file1", values.file1);
    if (values.file2) formData.append("file2", values.file2);
    if (values.file3) formData.append("file3", file);

    try {
      await APIOzXoshishi.post(formData);
      resetForm();
      clearFileInput();
      getTasks();
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
      <div className="max-w-7xl mx-auto px-5">
        <div className="my-3">
          <h2 className="text-2xl lg:text-3xl font-medium text-center">
            Tashabbuslar
          </h2>
          <div
            className={`text-red-500 text-xl italic text-center my-5 ${
              tashabbuslar?.length && "hidden"
            }`}
          >
            Tashabbuslar mavjud emas.!
          </div>
        </div>
        {/* 📌 Tashabbuslar */}
        <div
          className={`${
            tashabbuslar?.length
              ? "border border-gray-300 space-y-3 rounded-md shadow-md shadow-gray-200 mt-5 p-3 mx-3"
              : "hidden"
          }`}
        >
          {tashabbuslar &&
            tashabbuslar.map((tashabbus) => (
              <div
                className="collapse collapse-arrow rounded-md bg-white"
                key={tashabbus.id}
              >
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title md:text-xl font-medium">
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-600 line-clamp-1">
                      {tashabbus?.title}
                    </h4>
                    <p className="w-7 h-7 rounded-md text-center leading-7 bg-emerald-200 text-emerald-600">
                      7
                    </p>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="bg-slate-100 rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm md:text-base text-slate-600">
                        22.02.2025 yil
                      </p>
                    </div>
                    <div className="px-5 pt-5">
                      <h1 className="text-xl md:text-2xl font-semibold text-slate-600 text-center">
                        {tashabbus?.title}
                      </h1>
                    </div>
                    <div className="grid md:grid-cols-2 items-center gap-5 mt-5 px-5">
                      <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                        <img
                          src={tashabbus?.file1}
                          alt="university events"
                          className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                        />
                      </div>
                      <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                        <img
                          src={tashabbus?.file2}
                          alt="university events"
                          className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="md:text-xl text-slate-600">
                        {tashabbus?.body}
                      </p>
                    </div>
                    <div className="flex items-center pl-5">
                      <a
                        className="inline-flex items-center gap-x-1 text-sm md:text-base text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                        href={tashabbus?.file3}
                      >
                        Qo'shimcha xujjat fayl
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

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
                    ref={fileInputRef}
                    id="file3"
                    name="file3"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                    onChange={handleFileChange}
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
