import { useContext, useEffect, useState } from "react";
import NavLink from "../NavLink";
import sidebar from "../../../utils/sidebar";
import CryptoJS from "crypto-js";
import Logo from "../Logo";
import { SidebarContext } from "../../../utils/context/SidebarProvider";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Panel = () => {
    const [unShiredRole, setUnShiredRole] = useState("");
    const data = JSON.parse(localStorage.getItem("data"));
    const { isOpen, logOut } = useContext(SidebarContext);
    const navigate = useNavigate();

    const unShifredTxt = (key, content) => {
        const res = CryptoJS.AES.decrypt(content, key)
            .toString(CryptoJS.enc.Utf8)
            .trim()
            .replace(/^"|"$/g, "");
        return res;
    };

    useEffect(() => {
        if (data) {
            setUnShiredRole(
                unShifredTxt(process.env.REACT_APP_SHIFRED_ROLE, data?.role)
            );
        }
    }, [data]);

    //chiqish funksiyasi
    const exit = () => {
        navigate("/login");
        logOut();
    };

    return (
        <aside
            className={`${
                isOpen
                    ? "w-1/4 md:max-xl:w-2/6 max-md:w-[250px]"
                    : "max-w-14 max-md:-left-full"
            } max-md:absolute z-50 h-full overflow-y-scroll bg-white relative`}
        >
            <Logo />
            {sidebar
                .filter(item => {
                    const cleanedRoles = item?.role.map(role =>
                        role.replace(/['"]/g, "")
                    );
                    return cleanedRoles.includes(unShiredRole);
                })
                .map(parent => {
                    return (
                        <NavLink
                            key={parent.id}
                            data={parent}
                            unShiredRole={unShiredRole}
                        />
                    );
                })}
            <div className="w-full absolute bottom-8 px-4">
                <button
                    onClick={exit}
                    className={`${
                        isOpen
                            ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 hover:shadow-red-500/50"
                            : "text-red-600 bg-transparent"
                    } w-full flex items-center justify-center gap-2  font-bold py-3 rounded-full transition-transform duration-300 ease-out hover:scale-105  active:scale-95 shadow-lg`}
                >
                    <FiLogOut className="text-xl" />
                    {isOpen && "Chiqish"}
                </button>
            </div>
        </aside>
    );
};

export default Panel;
