import React, { useEffect, useState } from "react";
// import APIInstitutHaqida from "../../services/institutHaqida";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const AdminsCom = () => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([{}]);

  const fetchData = async () => {
    // try {
    //   const response = await APIInstitutHaqida.getInstitutHaqida();
    //   setDatas(response.data);
    // } catch (error) {
    //   console.error("Xatolik yuz berdi!", error);
    // }
  };

  const validationSchema = Yup.object({
    fakultet_name: Yup.string()
      .max(50, "Maksimal uzunlik 50 ta belgi bo'lishi kerak")
      .required("Fakultet nomi maydoni majburiy"),
  });

  const handleEdit = (data) => {
    setEdit(true);
    setId(data.id);
  };

  const handleDelete = async (id) => {
    // try {
    //   await APIInstitutHaqida.delInstitutHaqida(id);
    //   fetchData();
    // } catch (error) {
    //   console.error("Xatolik yuz berdi!", error);
    // }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    // try {
    //   if (!edit) {
    //     await APIInstitutHaqida.postInstitutHaqida(formData);
    //   } else {
    //     await APIInstitutHaqida.patchInstitutHaqida(id, formData);
    //     setEdit(false);
    //     setId(null);
    //   }
    //   resetForm();
    //   fetchData();
    // } catch (error) {
    //   console.error("Xatolik sodir bo'ldi!", error);
    //   resetForm();
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Zamdekanlar
      </h1>
      <div className="max-w-7xl px-5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            {edit ? "Zamdekanni tahrirlash" : "Yangi zamdekan qo'shish"}
          </h2>
          <Formik
            initialValues={{ 
                username: "",
                first_name: "",
                last_name: "",
                superadmin: "",
                admin: "",
                tyutr: "",
                fakultet: "",
                password: "",
                parol: "",
                is_active: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="fakultet_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Foydalanuvchi nomi
                  </label>
                  <Field
                    type="text"
                    id="fakultet_name"
                    name="fakultet_name"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  />
                  <ErrorMessage
                    name="fakultet_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="fakultet_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zamdekan nomi
                  </label>
                  <Field
                    type="text"
                    id="fakultet_name"
                    name="fakultet_name"
                    className={`w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:shadow-md focus:border-blue-300`}
                  />
                  <ErrorMessage
                    name="fakultet_name"
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

        <div className="space-y-4">
          {datas.map((data) => (
            <div
              key={data.id}
              className="flex justify-between items-center px-3 py-2 border rounded-lg shadow-md hover:shadow-lg"
            >
              <p className="truncate w-2/3 text-gray-700 font-medium">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
              <div className="flex space-x-2">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminsCom;