import React, { useEffect, useState } from "react";
import APIUsers from "../../services/users";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGeolocated } from "react-geolocated";
import * as Yup from "yup";

const TutorModalFormTTJIjara = ({ isOpen, onClose, info, roleUser }) => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [location, setLocation] = useState("");

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  const initialValues = {
    title: "",
    first_name: "",
    last_name: "",
    role: roleUser,
    fakultet: "",
    password: "",
    is_active: true,
    location: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Sarlavha majburiy"),
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

  useEffect(() => {
    if (coords) {
      setLocation(`${coords.latitude}, ${coords.longitude}`);
    }
  }, [coords]);

  useEffect(() => {
    if (info) {
      setEdit(true);
      setId(info.id);
    }
  }, [info]);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, key === "is_active" ? String(value) : value);
      }
    });

    try {
      edit ? await APIUsers.patch(id, formData) : await APIUsers.post(formData);
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
          initialValues={info || initialValues}
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
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tavsif
                </label>
                <Field
                  as="textarea"
                  id="last_name"
                  name="last_name"
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="rasm1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rasm 1
                  </label>
                  <input
                    type="file"
                    id="rasm1"
                    accept="image/*"
                    capture="environment"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && file.type.startsWith("image/")) {
                        setFieldValue("rasm1", file);
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
                    htmlFor="rasm2"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rasm 2
                  </label>
                  <input
                    type="file"
                    id="rasm2"
                    accept="image/*"
                    capture="environment"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && file.type.startsWith("image/")) {
                        setFieldValue("rasm2", file);
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
