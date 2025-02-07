import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TopshiriqlarQoshish = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [firstSubmitted, setFirstSubmitted] = useState(false);
    const [nonSelected, setNonSelected] = useState(false);
    const [selectedTutors, setSelectedTutors] = useState([]);
    const [filterFak, setFilterFak] = useState("");

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

    const faculties = useMemo(() => {
        const facultiesSet = new Set();
        tutors.forEach((tutor) => facultiesSet.add(tutor.fak));
        return Array.from(facultiesSet);
    }, [tutors]);

    // Fakultet Select orqali filtrlangan tutor
    const filteredTutors = useMemo(() => {
        setSelectAll(false);
        setSelectedTutors([]);
        if (filterFak === "Hammasi") {
            return tutors;
        }
        return filterFak
            ? tutors.filter((tutor) => tutor.fak === filterFak)
            : tutors;
    }, [filterFak, tutors]);

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

    // ************* topshiriq Forma ******************
    const kategory = [
        { id: 1, name: "O'z sohasi" },
        { id: 2, name: "Qo'shimcha" },
    ];

    const formik = useFormik({
        initialValues: {
            title: "",
            details: "",
            category: 0,
            maxBall: 0,
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            startDate: "",
            endDate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Kiritilishi shart!"),
            details: Yup.string().required("Kiritilishi shart!"),
            category: Yup.number().min(1, "Kiritilishi shart!"),
            maxBall: Yup.number().min(0.001, "Kiritilishi shart!"),
            startDate: Yup.date().required("Kiritilishi shart!"),
            endDate: Yup.date()
                .required("Kiritilishi shart!")
                .min(
                    Yup.ref("startDate"),
                    "Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak!"
                ),
        }),
        onSubmit: (values) => {
            if (!selectedTutors.length) {
                setNonSelected(true);
            } else {
                const data = {...values, tutorsId: selectedTutors}
                console.log(data);
            }

            setFirstSubmitted(true);
        },
    });

    useEffect(() => {
        if (firstSubmitted) {
            if (selectedTutors.length >= 1) {
                setNonSelected(false);
            } else {
                setNonSelected(true);
            }
        }
    }, [selectedTutors, firstSubmitted]);

    return (
        <div className="bg-base-200 rounded shadow p-1 md:p-2 lg:p-4">
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
                    <option key={0} value="Hammasi">
                        Hammasi
                    </option>
                    {faculties.map((faculty, index) => (
                        <option key={index} value={faculty}>
                            {faculty}
                        </option>
                    ))}
                </select>
            </div>

            {/* Jadval */}
            <div
                className={`overflow-x-auto max-h-[30vh] lg:max-h-[40vh] border rounded-lg shadow-md ${
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
                                <td className="py-2">{tutor.name}</td>
                                <td className="py-2">{tutor.fak}</td>
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
                            <option value="0" disabled>
                                Kategoryani tanlang!
                            </option>
                            {kategory?.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    selected={item.selected}
                                    disabled={item.disabled}
                                >
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
                        <label htmlFor="maxBall" className="label">
                            <span className="label-text">Max ball</span>
                        </label>
                        <input
                            type="number"
                            id="maxBall"
                            name="maxBall"
                            className="input input-bordered w-[100px]"
                            {...formik.getFieldProps("maxBall")}
                        />
                        {formik.touched.maxBall && formik.errors.maxBall ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.maxBall}
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
                        <label htmlFor="startDate" className="label">
                            <span className="label-text">
                                Boshlanish sanasi
                            </span>
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="input input-bordered"
                            {...formik.getFieldProps("startDate")}
                        />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.startDate}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-control">
                        <label htmlFor="endDate" className="label">
                            <span className="label-text">Tugash sanasi</span>
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="input input-bordered"
                            {...formik.getFieldProps("endDate")}
                        />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <span className="text-red-500 text-sm">
                                {formik.errors.endDate}
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
