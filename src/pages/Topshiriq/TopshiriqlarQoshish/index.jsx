import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APISuperAdminQoshTop from "../../../services/superadminQoshTop";
import APISuperadminOzSoxa from "../../../services/superadminOzSoxa";
import APIGetTutor from "../../../services/getUser";
import Loading from "../../../components/Loading";

const TopshiriqlarQoshish = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTutors, setSelectedTutors] = useState([]);
    const [tutor, setTutor] = useState([]);
    const [nonSelected, setNonSelected] = useState(false);
    const [filterFak, setFilterFak] = useState(0);
    const data = JSON.parse(localStorage.getItem("data"));
    const [isLoading, setIsLoading] = useState(false);

    const remFirsWorking = useRef(false);
    const removeLoopGetTutor = useRef(false);

    const kategory = [
        { id: 1, name: "Qo'shimcha" },
        { id: 2, name: "O'z sohasi" },
    ];

    // Checkbox Hammasini tanlash forEach name
    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedTutors(tutor?.map((tutor) => tutor.id));
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

    const faculties = useMemo(() => {
        const facultiesSet = new Set();
        tutor?.forEach((tutor) => facultiesSet?.add(tutor?.fakultet?.name));
        return Array.from(facultiesSet);
    }, [tutor]);

    // Fakultet Select orqali filtrlangan tutor
    const filteredTutors = useMemo(() => {
        setSelectAll(false);
        setSelectedTutors([]);
        if (filterFak === "Hammasi") {
            return tutor;
        }
        return filterFak
            ? tutor.filter((tutor) => tutor?.fakultet?.name === filterFak)
            : tutor;
    }, [filterFak, tutor]);

    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
            category: 0,
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
            category: Yup.number()
                .min(1)
                .max(2)
                .required("Batafsil ma'lumot kiritilishi kerak!"),
            max_baxo: Yup.string().required("Maximal ball kiritilishi kerak!"),
            boshlanish_vaqti: Yup.date().required(
                "Boshlanish sanasini kiriting!"
            ),
            tugash_vaqti: Yup.date().required("Tugash sanasini kiriting!"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!selectedTutors.length) {
                setNonSelected(true);
                remFirsWorking.current = true;
            } else {
                setIsLoading(true);
                // Oddiy text ma'lumotlarni qo‘shish
                const dataToPost = {
                    topshiriq_users: selectedTutors,
                    title: values.title,
                    body: values.body,
                    max_baxo: values.max_baxo,
                    boshlanish_vaqti: values.boshlanish_vaqti,
                    tugash_vaqti: values.tugash_vaqti,
                };

                switch (Number(values.category)) {
                    case 1:
                        try {
                            const response = await APISuperAdminQoshTop.post(
                                dataToPost
                            );
                            if (response.status === 201) {
                                const createdDataId = response.data.id;
                                // 2. Fayl tanlangan bo‘lsa, PATCH orqali faylni qo‘shish
                                if (
                                    values.file1 ||
                                    values.file2 ||
                                    values.file3 ||
                                    values.file4
                                ) {
                                    const formData = new FormData();
                                    // Fayllarni qo‘shish (faqat mavjudlarini)
                                    if (values.file1)
                                        formData.append("file1", values.file1);
                                    if (values.file2)
                                        formData.append("file2", values.file2);
                                    if (values.file3)
                                        formData.append("file3", values.file3);
                                    if (values.file4)
                                        formData.append("file4", values.file4);
                                    await APISuperAdminQoshTop.patch(
                                        createdDataId,
                                        formData
                                    );
                                }
                            }
                            resetForm();
                            setSelectedTutors([]);
                        } catch (error) {
                            console.error("Failed to add/update user", error);
                        } finally {
                            setIsLoading(false);
                            remFirsWorking.current = false;
                        }
                        break;
                    case 2:
                        try {
                            const response = await APISuperadminOzSoxa.post(
                                dataToPost
                            );
                            if (response.status === 201) {
                                const createdDataId = response.data.id;
                                // 2. Fayl tanlangan bo‘lsa, PATCH orqali faylni qo‘shish
                                if (
                                    values.file1 ||
                                    values.file2 ||
                                    values.file3 ||
                                    values.file4
                                ) {
                                    const formData = new FormData();
                                    // Fayllarni qo‘shish (faqat mavjudlarini)
                                    if (values.file1)
                                        formData.append("file1", values.file1);
                                    if (values.file2)
                                        formData.append("file2", values.file2);
                                    if (values.file3)
                                        formData.append("file3", values.file3);
                                    if (values.file4)
                                        formData.append("file4", values.file4);
                                    await APISuperadminOzSoxa.patch(
                                        createdDataId,
                                        formData
                                    );
                                }
                            }
                            resetForm();
                            setSelectedTutors([]);
                        } catch (error) {
                            console.error("Failed to add/update user", error);
                        } finally {
                            setIsLoading(false);
                            remFirsWorking.current = false;
                        }
                        break;
                    default:
                        setIsLoading(false);
                }
            }
        },
    });
    // Get Tutors By FakID
    useEffect(() => {
        if (!removeLoopGetTutor.current) {
            setIsLoading(true);
            removeLoopGetTutor.current = true;
            (async () => {
                try {
                    const response = await APIGetTutor.getTutor();
                    setTutor(response?.data);
                } catch (error) {
                    console.error("Failed to fetch admins", error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [data]);

    useEffect(() => {
        let filtredTutorIdArray = [];
        tutor?.forEach(
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
    }, [tutor, selectedTutors, selectAll]);

    useEffect(() => {
        if (remFirsWorking.current) {
            if (!selectedTutors.length) {
                setNonSelected(true);
            } else {
                setNonSelected(false);
            }
        }
    }, [selectedTutors]);

    // overflow-hidden
    return (
        <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
            {isLoading && <Loading />}
            <h1 className="text-lg font-bold mb-4">
                Qaysi tutorlarga yuborish:
            </h1>
            <div className="flex flex-col justify-end items-end mb-4">
                <label
                    htmlFor="facultyFilter"
                    className="block text-sm font-bold mb-2"
                >
                    Fakultet bo'yicha tanlash:
                </label>
                <select
                    id="facultyFilter"
                    className="select select-bordered min-w-[300px]"
                    value={filterFak}
                    onChange={(e) => setFilterFak(e.target.value)}
                >
                    <option key={0} defaultValue="Hammasi">
                        Hammasi
                    </option>
                    {faculties.map((faculty, index) => (
                        <option key={index + 1} value={faculty}>
                            {faculty}
                        </option>
                    ))}
                </select>
            </div>

            {/* Jadval */}
            <div
                className={`overflow-auto max-h-[30vh] lg:max-h-[40vh] border rounded-lg shadow-md ${
                    nonSelected && "border-2 border-red-600"
                }`}
            >
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
                                        onChange={(e) =>
                                            handleSelectAll(e.target.checked)
                                        }
                                    />
                                    Hammaga yuborish
                                </label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTutors.map((tutor, index) => (
                            <tr key={tutor.id} className="hover">
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">{tutor.first_name}</td>
                                <td className="py-2">
                                    {tutor?.fakultet?.name}
                                </td>
                                <td className="py-2">
                                    <label className="cursor-pointer flex items-center justify-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-info"
                                            checked={selectedTutors.includes(
                                                tutor.id
                                            )}
                                            onChange={(e) =>
                                                handleTutorSelect(
                                                    tutor.id,
                                                    e.target.checked
                                                )
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
                    <div className="form-control mb-4">
                        <label htmlFor="category" className="label">
                            <span className="label-text">
                                Kategoriyani tanlang
                            </span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="select select-bordered"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                        >
                            <option value={0} disabled>
                                Kategoryani tanlang!
                            </option>
                            {kategory?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {formik.touched.category && formik.errors.category ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.category}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {["file1", "file2", "file3", "file4"].map((file, index) => (
                        <div key={file} className="form-control">
                            <label htmlFor={file} className="label">
                                <span className="label-text">
                                    Fayl {index + 1}
                                </span>
                            </label>
                            <input
                                type="file"
                                id={file}
                                name={file}
                                className="file-input file-input-bordered"
                                onChange={(event) =>
                                    formik.setFieldValue(
                                        file,
                                        event.target.files[0]
                                    )
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
                        <label htmlFor="boshlanish_vaqti" className="label">
                            <span className="label-text">
                                Boshlanish sanasi
                            </span>
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
                        {formik.touched.tugash_vaqti &&
                        formik.errors.tugash_vaqti ? (
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

export default TopshiriqlarQoshish;
