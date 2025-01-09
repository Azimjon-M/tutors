import { AiFillLeftCircle } from "react-icons/ai";
import kspiLogo from "../../../assets/icons/logo_kspi.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../../../utils/context/SidebarProvider";

const Logo = () => {
    const { isOpen, changeOpen } = useContext(SidebarContext);
    return (
        <>
            <div className="px-8 py-3 relative">
                <Link
                    className={`flex items-center text-sm text-slate-700 dark:text-white ${
                        !isOpen && "justify-center"
                    }`}
                    to="/analitka"
                >
                    <img src={kspiLogo} className="inline max-h-8" alt="logo" />
                    <div
                        className={`font-semibold ml-2 mt-1 ${
                            !isOpen && "hidden"
                        }`}
                    >
                        KSPI TUTORS
                    </div>
                </Link>
                <div
                    onClick={changeOpen}
                    className={`max-md:hidden text-sky-500 absolute top-5 cursor-pointer text-xl transition-all duration-300 ${
                        !isOpen ? "-rotate-180 right-6" : "right-2"
                    }`}
                >
                    <AiFillLeftCircle />
                </div>
            </div>
            <hr
                className={`${
                    !isOpen && "opacity-0"
                } h-px mt-0 mb-8 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:via-white`}
            />
        </>
    );
};

export default Logo;
