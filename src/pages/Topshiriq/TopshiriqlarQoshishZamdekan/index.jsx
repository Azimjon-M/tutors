import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APITopshiriq from "../../../services/topshiriq";
import APIUsers from "../../../services/users";

const TopshiriqlarQoshishZamdekan = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [users, setUsers] = useState([]);

  const tutors = useMemo(
    () => [
      { id: 1, name: "Abdulla Karimov", fak: "Fiz-Mat" },
      { id: 2, name: "Muhammad Aliyev", fak: "Fiz-Mat" },
      { id: 3, name: "Saida Rasulova", fak: "Ona-tili" },
      { id: 4, name: "Abdulla Karimov", fak: "Ona-tili" },
      { id: 5, name: "Muhammad Aliyev", fak: "Ximya" },
      { id: 6, name: "Saida Rasulova", fak: "Ximya" },
      { id: 7, name: "Abdulla Karimov", fak: "Sanat" },
      { id: 8, name: "Muhammad Aliyev", fak: "Sanat" },
      { id: 9, name: "Saida Rasulova", fak: "Kimyo" },
    ],
    []
  );

  const getUsers = async () => {
    try {
      const response = await APIUsers.get();
      const sortedData = response.data.filter((item) => !item.admin);

      setUsers(sortedData);
    } catch (error) {
      console.error("Failed to fetch admins", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Fakultet Select orqali filtrlangan tutor
  const filteredTutors = useMemo(() => {
    setSelectAll(false);
    setSelectedTutors([]);
    return tutors;
  }, [tutors]);

  // Checkbox Hammasini tanlash
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedTutors(filteredTutors.map((tutor) => tutor.id));
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
    filteredTutors.forEach(
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
  }, [filteredTutors, selectedTutors, selectAll]);

  const formik = useFormik({
    initialValues: {
      users: "",
      // title: "",
      // details: "",
      topshiriq_turi: "majburiy",
      // numberValue: "",
      // file1: null,
      // file2: null,
      // file3: null,
      // file4: null,
      // urinishlar_soni: "",
      boshlanish_vaqti: "",
      tugash_vaqti: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Sarlavha kiritilishi shart!"),
      details: Yup.string().required("Batafsil ma'lumot kiritilishi kerak!"),
      boshlanish_vaqti: Yup.date().required("Boshlanish sanasini kiriting!"),
      tugash_vaqti: Yup.date()
        .required("Tugash sanasini kiriting!")
        .min(
          Yup.ref("startDate"),
          "Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak!"
        ),
    }),
    onSubmit: async (values) => {
      console.log(selectedTutors);
      const dataToPost = {
        users: selectedTutors,
        urinishlar_soni: 2,
        topshiriq_turi: "majburiy",
        boshlanish_vaqti: values.boshlanish_vaqti,
        tugash_vaqti: values.tugash_vaqti,
      };
      try {
        await APITopshiriq.post(dataToPost);
        alert("Muvaffaqiyatli qo'shildi.!");
        // resetForm();
      } catch (error) {
        console.error("Failed to add/update user", error);
      }
    },
  });

  return (
    <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
      <h1 className="text-lg font-bold mb-4">Qaysi tutorlarga yuborish:</h1>

      {/* Jadval */}
      <div className="overflow-x-auto max-h-[30vh] lg:max-h-[40vh] border rounded-lg shadow-md">
        <table className="table table-zebra w-full text-center select-none">
          <thead className="bg-base-200 sticky top-0 z-10">
            <tr>
              <th>№</th>
              <th>Isim Familya</th>
              <th>Fakulteti</th>
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
            {users.map((tutor, index) => (
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
            <label htmlFor="numberValue" className="label">
              <span className="label-text">Max ball</span>
            </label>
            <input
              type="number"
              id="numberValue"
              name="numberValue"
              className="input input-bordered w-[100px]"
              {...formik.getFieldProps("numberValue")}
            />
            {formik.touched.numberValue && formik.errors.numberValue ? (
              <span className="text-red-500 text-sm">
                {formik.errors.numberValue}
              </span>
            ) : null}
          </div>
        </div>
        <div className="form-control mb-4">
          <label htmlFor="details" className="label">
            <span className="label-text">Batafsil</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows="4"
            className="textarea textarea-bordered"
            placeholder="Batafsil ma'lumot kiriting"
            {...formik.getFieldProps("details")}
          />
          {formik.touched.details && formik.errors.details ? (
            <span className="text-red-500 text-sm">
              {formik.errors.details}
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
