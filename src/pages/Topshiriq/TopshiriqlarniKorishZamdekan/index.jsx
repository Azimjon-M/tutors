import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import APITopshiriq from "../../../services/adminQoshimchaTopshiriq.js";

const TopshiriqlarniKorishZamdekan = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // 📌 GET - Barcha topshiriqlarni olish
  const getTasks = async () => {
    try {
      const response = await APITopshiriq.get();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // 📌 EDIT - Topshiriqni tahrirlash
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      max_baxo: "",
      tugash_vaqti: "",
      file1: null,
      file2: null,
      file3: null,
      file4: null,
    },
    onSubmit: async (values) => {
      if (selectedTask) {
        try {

          // 📁 Fayllarni yuborish
          const formData = new FormData();
          if (values.title) formData.append("title", values.title);
          if (values.body) formData.append("body", values.body);
          if (values.max_baxo) formData.append("max_baxo", values.max_baxo);
          if (values.tugash_vaqti)
            formData.append("tugash_vaqti", values.tugash_vaqti);
          if (values.file1) formData.append("file1", values.file1);
          if (values.file2) formData.append("file2", values.file2);
          if (values.file3) formData.append("file3", values.file3);
          if (values.file4) formData.append("file4", values.file4);
          await APITopshiriq.patch(selectedTask.id, formData);

          // 🆕 Yangilangan ma'lumotlarni olish
          getTasks();
          setIsOpenModal(false);
        } catch (error) {
          console.error("Error updating task:", error);
        }
      }
    },
  });

  const onEdit = (task) => {
    setSelectedTask(task);
    setIsOpenModal(true);
    formik.setValues({
      title: task.title,
      body: task.body,
      max_baxo: task.max_baxo,
      tugash_vaqti: task.tugash_vaqti,
      file1: task.file1,
      file2: task.file2,
      file3: task.file3,
      file4: task.file4,
    });
  };

  // 📌 DELETE - Topshiriqni o‘chirish
  const onDelete = async (taskId) => {
    const confrim = window.confirm("O'chirishni istaysizmi ?");
    if (confrim) {
      try {
        await APITopshiriq.del(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="relative z-0">
      <div
        className={`${
          isOpenModal ? "z-20" : "hidden"
        } w-[100%] h-[100vh] absolute top-[-1.5rem] left-0 bg-[#00000093] transition-[opacity] ease-linear duration-150`}
      >
        <div className="flex justify-end pl-4 pt-4 pr-4">
          <button
            onClick={() => setIsOpenModal(false)}
            className="btn btn-sm btn-error text-xl text-white"
          >
            X
          </button>
        </div>
        <div className="p-4">
          <form
            className="bg-white p-4 rounded-lg"
            onSubmit={formik.handleSubmit}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="form-control mb-4">
                <label htmlFor="title" className="label">
                  <span className="label-text">Sarlavha</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input input-bordered"
                  placeholder="Sarlavha kiriting"
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title ? (
                  <span className="text-red-500 text-sm">
                    {formik.errors.title}
                  </span>
                ) : null}
              </div>
              <div className="form-control mb-4">
                <label htmlFor="max_baxo" className="label">
                  <span className="label-text">Max ball</span>
                </label>
                <input
                  type="number"
                  id="max_baxo"
                  name="max_baxo"
                  className="input input-bordered w-[100px]"
                  {...formik.getFieldProps("max_baxo")}
                />
                {formik.touched.max_baxo && formik.errors.max_baxo ? (
                  <span className="text-red-500 text-sm">
                    {formik.errors.max_baxo}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="form-control mb-4">
              <label htmlFor="body" className="label">
                <span className="label-text">Batafsil</span>
              </label>
              <textarea
                id="body"
                name="body"
                rows="4"
                className="textarea textarea-bordered"
                placeholder="Batafsil ma'lumot kiriting"
                {...formik.getFieldProps("body")}
              />
              {formik.touched.body && formik.errors.body ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.body}
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {["file1", "file2", "file3", "file4"].map((file, index) => (
                <div key={file} className="form-control">
                  <label htmlFor={file} className="label">
                    <span className="label-text">Fayl {index + 1}</span>
                  </label>
                  <input
                    type="file"
                    id={file}
                    name={file}
                    className="file-input file-input-bordered"
                    onChange={(event) =>
                      formik.setFieldValue(file, event.target.files[0])
                    }
                  />
                  {formik.touched[file] &&
                  formik.errors[file] &&
                  index === 0 ? (
                    <span className="text-red-500 text-sm">
                      {formik.errors[file]}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label htmlFor="tugash_vaqti" className="label">
                  <span className="label-text">Tugash sanasi</span>
                </label>
                <input
                  type="date"
                  id="tugash_vaqti"
                  name="tugash_vaqti"
                  className="input input-bordered"
                  {...formik.getFieldProps("tugash_vaqti")}
                />
                {formik.touched.tugash_vaqti && formik.errors.tugash_vaqti ? (
                  <span className="text-red-500 text-sm">
                    {formik.errors.tugash_vaqti}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-info w-full">
                Yuborish
              </button>
            </div>
          </form>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center my-6">
        Topshiriqlarni Ko'rish
      </h1>
      <div className="p-4">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <table className="table w-full text-center select-none rounded-lg ">
            <thead className="bg-base-200 sticky top-0 z-10 border-b-2">
              <tr className="text-sm bg-gray-100">
                <th className="">№</th>
                <th className="">Nomi</th>
                <th className="">Batafsil</th>
                <th className="">Max bal</th>
                <th className="">Boshlanish</th>
                <th className="">Tugash</th>
                <th className="">Tahrirlash</th>
                <th className="">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className="hover:bg-[#ececec] border-b-[1px] border-gray-200"
                >
                  <td className=" text-center">{index + 1}</td>
                  <td className="max-w-[200px]">
                    <div className="w-full px-4 line-clamp-1">{task.title}</div>
                  </td>
                  <td className="max-w-[300px]">
                    <div className="w-full px-4 line-clamp-1">{task.body}</div>
                  </td>
                  <td className=" text-center">{task.max_baxo}</td>
                  <td className=" text-center">{task.boshlanish_vaqti}</td>
                  <td className=" text-center">{task.tugash_vaqti}</td>
                  <td className=" text-center">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => onEdit(task)}
                    >
                      Tahrirlash
                    </button>
                  </td>
                  <td className=" text-center">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => onDelete(task.id)}
                    >
                      O'chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopshiriqlarniKorishZamdekan;
