import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Logo from "../../assets/icons/logo_kspi.png";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import APIGetToken from "../../services/getToken";
import APIGetUser from "../../services/getUser";

import LoadnigTxt from "../../components/LoadingTxt";
import Encryption from "../../components/Encryption";
import Decryption from "../../components/Decryption";

const Login = () => {
    const [eye, setEye] = useState(false);
    const [isLoading, setIsLoading] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const removeLoop = useRef(false);
    const clearLocalStorage = useRef(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, "Kamida 3ta belgi bo'lishi kerak!")
            .required("Kamida 3ta belgi bo'lishi kerak!"),
        password: Yup.string()
            .min(3, "Kamida 3ta belgi bo'lishi kerak!")
            .required("Kamida 3ta belgi bo'lishi kerak!"),
    });

    const data = JSON.parse(localStorage.getItem("data"));

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            remember: false,
        },
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (!errMessage && !isLoading) {
                setIsLoading(true);
                try {
                    const res = await APIGetToken.post({
                        username: values.username,
                        password: values.password,
                    });

                    
                    if (res.data && res?.data?.access && res?.data?.refresh) {
                        // getEndTime of RefToken
                        const decodeJWT = (token) => {
                            const base64Url = token.split('.')[1]; // Payload qismi
                            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            const jsonPayload = decodeURIComponent(
                                atob(base64)
                                    .split('')
                                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                                    .join('')
                            );
                            return JSON.parse(jsonPayload);
                        };
                        const decoded = decodeJWT(res?.data?.refresh);
                        const expiresAt = new Date(decoded.exp * 1000); // Token tugash vaqti
                        const formattedExpiration = {
                            date: expiresAt.toISOString().split('T')[0], // "YYYY-MM-DD"
                            hour: expiresAt.toTimeString().split(' ')[0].slice(0, 5), // "HH:MM"
                        };
                        try {
                            const resUser = await APIGetUser.get(
                                values.username,
                                res?.data?.access
                            );
                            if (resUser.data) {
                                const [data] = resUser.data;
                                const jsonData = JSON.stringify({
                                    id: Encryption(
                                        values.id,
                                        process.env.REACT_APP_SHIFRED_ID
                                    ),
                                    username: Encryption(
                                        values.username,
                                        process.env.REACT_APP_SHIFRED_USERNAME
                                    ),
                                    password: Encryption(
                                        values.password,
                                        process.env.REACT_APP_SHIFRED_PASSWORD
                                    ),
                                    remember: values.remember,
                                    first_name: Encryption(
                                        data?.first_name,
                                        process.env.REACT_APP_SHIFRED_FIRSTNAME
                                    ),
                                    last_name: Encryption(
                                        data?.last_name,
                                        process.env.REACT_APP_SHIFRED_LASTNAME
                                    ),
                                    token: Encryption(
                                        res?.data?.access,
                                        process.env.REACT_APP_ENCRYPTION_KEY
                                    ),
                                    refToken: Encryption(
                                        res?.data?.refresh,
                                        process.env.REACT_APP_ENCRYPTION_REFKEY
                                    ),
                                    role: Encryption(
                                        data?.role,
                                        process.env.REACT_APP_SHIFRED_ROLE
                                    ),
                                    fakultet: Encryption(
                                        data?.fakultet?.id,
                                        process.env.REACT_APP_SHIFRED_FAKULTET
                                    ),
                                    endRefToken: formattedExpiration,
                                });
                                localStorage.setItem("data", jsonData);
                                if (window.innerWidth >= 1024) {
                                    localStorage.setItem("isOpen", "open")
                                }
                                navigate("/analitka");
                            }
                        } catch (err) {
                            console.error(
                                "Admin ma'lumotlarini olishda xatolik:",
                                err
                            );
                        }
                    } else {
                        setErrMessage("Username or Password wrong!");
                        setTimeout(() => {
                            setErrMessage("");
                        }, 3000);
                    }
                } catch (error) {
                    console.error("Error during API call:", error);
                    setErrMessage("Username or Password wrong!");
                    setTimeout(() => {
                        setErrMessage("");
                    }, 3000);
                } finally {
                    setIsLoading(false);
                }
            }
        },
    });

    const handleClickPassword = () => {
        const btn = document.getElementById("password");
        btn.type = btn.type === "text" ? "password" : "text";
        btn.type === "text" ? setEye(true) : setEye(false);
    };

    useEffect(() => {
        if (data?.remember && !removeLoop.current) {
            console.log(data?.remember);
            formik.setValues({
                username: Decryption(
                    data?.username,
                    process.env.REACT_APP_SHIFRED_USERNAME
                ),
                password: Decryption(
                    data?.password,
                    process.env.REACT_APP_SHIFRED_PASSWORD
                ),
                remember: formik.values.remember,
            });
        }
        removeLoop.current = true;
    }, [data, formik]);

    useEffect(() => {
        if (!data?.remember && !clearLocalStorage.current) {
            localStorage.removeItem("data");
        }
        clearLocalStorage.current = true;
    }, [data]);

    return (
        <div className="w-full h-[100vh] flex justify-center items-center ">
            <div className="flex flex-col justify-center gap-2 border rounded-md shadow-2xl p-4 -mt-20">
                <div className="w-[300px] h-full">
                    <div className="flex justify-center">
                        <img
                            className="w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px] h-auto"
                            src={Logo}
                            alt="logo"
                        />
                    </div>
                    <h1 className="text-center font-bold text-[1.3rem] lg:text-[1.4rem]">
                        Tutor KPI
                    </h1>
                </div>
                <form
                    className="w-[300px] flex flex-col gap-2"
                    onSubmit={formik.handleSubmit}
                >
                    <label
                        className="w-full flex flex-col gap-1"
                        htmlFor="username"
                    >
                        Username
                        <input
                            disabled={isLoading ? true : false}
                            type="text"
                            id="username"
                            className={`${
                                formik.errors.username
                                    ? "border border-red-600 focus:border-red-600 focus:outline-red-600"
                                    : "focus:border-green-600 focus:outline-green-600"
                            } input input-sm input-bordered w-full max-w-xs`}
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                    </label>
                    {formik.errors.username && (
                        <div className="text-xs text-red-600">
                            {formik.errors.username}
                        </div>
                    )}
                    <label
                        className="relative flex flex-col gap-1"
                        htmlFor="password"
                    >
                        Password
                        <input
                            disabled={isLoading ? true : false}
                            type="password"
                            id="password"
                            className={`${
                                formik.errors.password
                                    ? "border border-red-600 focus:border-red-600 focus:outline-red-600"
                                    : "focus:border-green-600 focus:outline-green-600"
                            } input input-sm input-bordered w-full max-w-xs`}
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <div
                            onClick={handleClickPassword}
                            className="cursor-pointer absolute top-[50%] right-3 font-bold"
                        >
                            {
                                <>
                                    <BsFillEyeFill
                                        className={`${
                                            eye && "hidden"
                                        } text-[1.2rem] mt-1`}
                                    />
                                    <BsEyeSlashFill
                                        className={`${
                                            !eye && "hidden"
                                        } text-[1.2rem] mt-1`}
                                    />
                                </>
                            }
                        </div>
                    </label>
                    {formik.errors.password && (
                        <div className="text-xs text-red-600">
                            {formik.errors.password}
                        </div>
                    )}
                    <div className="form-control">
                        <label className="cursor-pointer justify-start gap-2 label">
                            <input
                                disabled={isLoading ? true : false}
                                id="remember"
                                name="remember"
                                type="checkbox"
                                onChange={formik.handleChange}
                                value={formik.values.remember}
                                className="checkbox checkbox-sm checkbox-accent"
                            />
                            <span className="label-text">Remember me</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={`w-full btn btn-sm text-white ${
                            errMessage ? "btn-error" : "btn-success"
                        }`}
                    >
                        {isLoading ? (
                            <LoadnigTxt />
                        ) : errMessage ? (
                            `${errMessage}`
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
