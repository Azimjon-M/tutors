import { useContext, useEffect, useState } from "react";
import NavLink from "../NavLink";
import sidebar from "../../../utils/sidebar";
import CryptoJS from "crypto-js";
import Logo from "../Logo";
import { SidebarContext } from "../../../utils/context/SidebarProvider";

const Panel = () => {
    const [unShiredRole, setUnShiredRole] = useState("");
    const data = JSON.parse(localStorage.getItem("data"));
    const { isOpen } = useContext(SidebarContext);

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

    return (
        <aside
            className={`${
                isOpen
                    ? "w-1/4 md:max-xl:w-2/6 max-md:w-[250px]"
                    : "max-w-14 max-md:-left-full"
            } max-md:absolute z-50 h-full overflow-y-scroll bg-white`}
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
        </aside>
    );
};

export default Panel;
