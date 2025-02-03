import { useContext, useEffect, useState } from "react";
import { BiCaretRight } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContext } from "../../../utils/context/SidebarProvider";

const NavLink = ({ data, unShiredRole }) => {
    let children = data.children ?? false;
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubOpen, setisSubOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isChildActive, setIsChildActive] = useState(false);
    const { isOpen, setOpen } = useContext(SidebarContext);

    // link bosilganda unga yo'naltrish va/yoki children panelini ochish
    const handleClickItem = childPath => {
        if (!children) {
            navigate(data.path);
        } else {
            setOpen();
            if (typeof childPath !== "string") {
                setisSubOpen(prev => !prev);
            } else {
                navigate(childPath);
            }
        }
    };

    // link ochiqligiga qarab active effectni alishtrish uchun
    useEffect(() => {
        if (location.pathname === data.path) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        if (data.children?.map(e => e.path).includes(location.pathname)) {
            setisSubOpen(true);
            setIsChildActive(true);
        } else {
            setIsChildActive(false);
            setisSubOpen(false);
        }
    }, [location, data.children, data.path]);

    return (
        <>
            {/* navlink */}
            <div
                onClick={handleClickItem}
                className={`${
                    (isActive || isChildActive) && "border-sky-700"
                } ${
                    !isOpen ? "border-none px-2" : "border-r-4 pr-4 px-4"
                } w-full  my-3 cursor-pointer`}
            >
                {/* blue area */}
                <div
                    className={`${
                        (isActive || isChildActive) &&
                        "bg-[#0000aa40] text-sky-600"
                    } ${
                        !isOpen ? "justify-center" : "justify-between"
                    }  py-1 px-2 rounded flex items-center`}
                >
                    {/* texts */}
                    <div className={`flex gap-2 items-center font-semibold`}>
                        {/* icon */}
                        <span>{<data.icon />}</span>
                        {/* nom */}
                        <span className={!isOpen ? "hidden" : ""}>
                            {data.title}
                        </span>
                    </div>
                    {/* ochish icon */}
                    <span
                        className={`${(!children || !isOpen) && "hidden"} ${
                            isSubOpen && "rotate-90"
                        }`}
                    >
                        <BiCaretRight />
                    </span>
                </div>
            </div>

            {/* child links my */}

            {children && isOpen && (
                <div
                    className={`${
                        !isSubOpen && "hidden"
                    } text-xs ml-5 overflow-hidden transition-all duration-1000`}
                >
                    {children
                        .filter(item => {
                            const cleanedRoles = item?.role.map(role =>
                                role.replace(/['"]/g, "")
                            );
                            return cleanedRoles.includes(unShiredRole);
                        })
                        .map(element => (
                            <div
                                key={element.id}
                                onClick={() => handleClickItem(element.path)}
                                className="w-full px-4 flex items-center gap-2 my-4 cursor-pointer"
                            >
                                <div
                                    style={{
                                        boxShadow:
                                            location.pathname === element.path
                                                ? "0 0 20px 5px rgba(0, 0, 255, 0.5)"
                                                : "none",
                                    }}
                                    className={`icon w-2 h-2 rounded-full ${
                                        location.pathname === element.path
                                            ? "bg-blue-600"
                                            : "bg-gray-500"
                                    }`}
                                ></div>
                                <span>{element.title}</span>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};

export default NavLink;
