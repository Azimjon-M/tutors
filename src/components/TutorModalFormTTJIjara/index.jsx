import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGeolocated } from "react-geolocated";
import * as Yup from "yup";
import APIMajburiyTopshiriq from "../../services/majburiyTopshiriq";

const TutorModalFormTTJIjara = ({ isOpen, onClose, task, roleUser }) => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [location, setLocation] = useState("");

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  const initialValues = {
    title: "",
    body: "",
    file1: "",
    file2: "",
    is_active: true,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Sarlavha majburiy"),
    body: Yup.string().required("Tavsif majburiy"),
    file1: Yup.mixed()
      .required("Rasm majburiy")
      .test(
        "fileType",
        "Faqat JPG, PNG va JPEG formatdagi rasmlarga ruxsat berilgan",
        (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          );
        }
      ),
    file2: Yup.mixed()
      .required("Rasm majburiy")
      .test(
        "fileType",
        "Faqat JPG, PNG va JPEG formatdagi rasmlarga ruxsat berilgan",
        (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          );
        }
      ),
    is_active: Yup.boolean(),
  });

  useEffect(() => {
    if (coords) {
      setLocation(`${coords.latitude}, ${coords.longitude}`);
    }
  }, [coords]);

  useEffect(() => {
    if (task) {
      setEdit(true);
      setId(task.id);
    }
  }, [task]);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, key === "is_active" ? String(value) : value);
      }
    });

    try {
      edit
        ? await APIMajburiyTopshiriq.patch(id, formData)
        : await APIMajburiyTopshiriq.post(formData);
      resetForm();
      setEdit(false);
      onClose();
    } catch (error) {
      console.error("Xatolik sodir bo'ldi!", error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-5 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] md:w-[600px] transform transition-transform duration-700 ease-out relative">
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          {edit ? `${roleUser}ni tahrirlash` : `Yangi ${roleUser} qo'shish`}
        </h2>
        <Formik
          enableReinitialize
          initialValues={task || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
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
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
                <ErrorMessage
                  name="body"
                  component="div"
                  className="text-red-500 text-sm mt-1"
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
                    accept="image/*"
                    capture="environment"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && file.type.startsWith("image/")) {
                        setFieldValue("file1", file);
                      } else {
                        alert("Faqat rasmlar yuklash mumkin!");
                        event.target.value = "";
                      }
                      // Kamera orqali olish shartligini tekshirish
                      if (!event.target.capture) {
                        alert("Iltimos, faqat kameradan rasmga oling!");
                        event.target.value = "";
                        return;
                      }
                    }}
                    className="w-full px-3 py-2 border rounded-lg bg-gray-50"
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
                    accept="image/*"
                    capture="environment"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && file.type.startsWith("image/")) {
                        setFieldValue("file2", file);
                      } else {
                        alert("Faqat rasmlar yuklash mumkin!");
                        event.target.value = "";
                      }
                      // Kamera orqali olish shartligini tekshirish
                      if (!event.target.capture) {
                        alert("Iltimos, faqat kameradan rasmga oling!");
                        event.target.value = "";
                        return;
                      }
                    }}
                    className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              {location && (
                <p className="text-sm text-gray-600 mb-2">
                  Manzil koordinatalari: {location}
                </p>
              )}
              <Field type="hidden" name="location" value={location} />

              <button
                type="submit"
                className={`w-full mt-4 py-2 px-4 rounded-md text-white font-semibold ${
                  edit
                    ? "bg-teal-500 hover:bg-teal-600"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                {edit ? "Tahrirlash" : "Qo'shish"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  ) : null;
};

export default TutorModalFormTTJIjara;
