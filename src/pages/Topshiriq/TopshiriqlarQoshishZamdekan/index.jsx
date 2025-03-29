import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APITopshiriq from "../../../services/adminQoshimchaTopshiriq.js";
import APIUsers from "../../../services/users";
import CryptoJS from "crypto-js";

const TopshiriqlarQoshishZamdekan = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [users, setUsers] = useState([]);
  const [nonSelected, setNonSelected] = useState(false);
  const data = JSON.parse(localStorage.getItem("data"));

  const unShifredTxt = (key, content) => {
    const res = CryptoJS.AES.decrypt(content, key)
      .toString(CryptoJS.enc.Utf8)
      .trim()
      .replace(/^"|"$/g, "");
    return res;
  };

  // Checkbox Hammasini tanlash forEach
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedTutors(users?.map((tutor) => tutor.id));
    } else {
      setSelectedTutors([]);
    }
  };

  // Aloxida tanlash
  const handleTutorSelect = (tutorId, checked) => {
    if (checked) {
      setSelectedTutors([...selectedTutors, tutorId]);
    } else {
      setSelectedTutors(selectedTutors.filter((id) => id !== tutorId));
    }
  };

  useEffect(() => {
    let filtredTutorIdArray = [];
    users?.forEach(
      (item) => (filtredTutorIdArray = [...filtredTutorIdArray, item.id])
    );
    if (
      selectedTutors.length === filtredTutorIdArray.length &&
      selectedTutors.every((value) => filtredTutorIdArray.includes(value))
    ) {
      if (!selectAll) {
        setSelectAll(true);
      }
    } else {
      if (selectAll) {
        setSelectAll(false);
      }
    }
  }, [users, selectedTutors, selectAll]);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      max_baxo: "",
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      boshlanish_vaqti: "",
      tugash_vaqti: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Sarlavha kiritilishi shart!"),
      body: Yup.string().required("Batafsil ma'lumot kiritilishi kerak!"),
      max_baxo: Yup.string().required("Maximal ball kiritilishi kerak!"),
      boshlanish_vaqti: Yup.date().required("Boshlanish sanasini kiriting!"),
      tugash_vaqti: Yup.date()
        .required("Tugash sanasini kiriting!")
        .min(
          Yup.ref("boshlanish_vaqti"),
          "Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak!"
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!selectedTutors.length) {
        setNonSelected(true);
      } else {
        // Oddiy text ma'lumotlarni qo‘shish
        const dataToPost = {
          topshiriq_users: selectedTutors,
          title: values.title,
          body: values.body,
          max_baxo: values.max_baxo,
          boshlanish_vaqti: values.boshlanish_vaqti,
          tugash_vaqti: values.tugash_vaqti,
        };

        try {
          const response = await APITopshiriq.post(dataToPost);
          if (response.status === 201) {
            const createdDataId = response.data.id;
            // 2. Fayl tanlangan bo‘lsa, PATCH orqali faylni qo‘shish
            if (values.file1 || values.file2 || values.file3 || values.file4) {
              const formData = new FormData();
              // Fayllarni qo‘shish (faqat mavjudlarini)
              if (values.file1) formData.append("file1", values.file1);
              if (values.file2) formData.append("file2", values.file2);
              if (values.file3) formData.append("file3", values.file3);
              if (values.file4) formData.append("file4", values.file4);
              try {
                await APITopshiriq.patch(createdDataId, formData);
              } catch (err) {
                console.error(err);
              }
            }
            alert("Muvaffaqiyatli qo'shildi.!");
          }
          resetForm();
          setSelectedTutors([]);
        } catch (error) {
          console.error("Failed to add/update user", error);
        }
      }
    },
  });

  const removeLoopGetTutor = useRef(false);

  // Get Tutors By FakID
  useEffect(() => {
    if (!removeLoopGetTutor.current) {
      removeLoopGetTutor.current = true;

      const fakultetId = unShifredTxt(
        process.env.REACT_APP_SHIFRED_FAKULTET,
        data?.fakultet
      );

      (async () => {
        try {
          const response = await APIUsers.getFakTutors(fakultetId);
          setUsers(response?.data);
        } catch (error) {
          console.error("Failed to fetch admins", error);
        }
      })();
    }
  }, [data]);

  return (
    <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
      <h1 className="text-lg font-bold mb-4">Qaysi tutorlarga yuborish:</h1>

      {/* Jadval */}
      <div className="overflow-x-auto max-h-[30vh] lg:max-h-[40vh] border rounded-lg shadow-md">
        <table className="table table-zebra w-full text-center select-none">
          <thead className="bg-base-200 sticky top-0 z-10">
            <tr>
              <th>№</th>
              <th>Familiya</th>
              <th>Ism</th>
              <th>
                <label className="cursor-pointer flex items-center justify-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  Hammaga yuborish
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((tutor, index) => (
              <tr key={tutor.id} className="hover">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{tutor.last_name}</td>
                <td className="py-2">{tutor.first_name}</td>
                <td className="py-2">
                  <label className="cursor-pointer flex items-center justify-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      checked={selectedTutors.includes(tutor.id)}
                      onChange={(e) =>
                        handleTutorSelect(tutor.id, e.target.checked)
                      }
                    />
                    Shu tutorga yuborish
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {nonSelected && (
        <div className="text-center text-[red] font-medium">
          Tutorlardan birini tanlashingiz shart!
        </div>
      )}

      <h1 className="text-lg font-bold mt-8">Topshiriq yuborish:</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
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
            <span className="text-red-500 text-sm">{formik.errors.body}</span>
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
              {formik.touched[file] && formik.errors[file] && index === 0 ? (
                <span className="text-red-500 text-sm">
                  {formik.errors[file]}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label htmlFor="boshlanish_vaqti" className="label">
              <span className="label-text">Boshlanish sanasi</span>
            </label>
            <input
              type="date"
              id="boshlanish_vaqti"
              name="boshlanish_vaqti"
              className="input input-bordered"
              {...formik.getFieldProps("boshlanish_vaqti")}
            />
            {formik.touched.boshlanish_vaqti &&
            formik.errors.boshlanish_vaqti ? (
              <span className="text-red-500 text-sm">
                {formik.errors.boshlanish_vaqti}
              </span>
            ) : null}
          </div>
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
  );
};

export default TopshiriqlarQoshishZamdekan;
