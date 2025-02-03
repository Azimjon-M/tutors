import kspiLogo from "../../../assets/icons/logo_kspi.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../../../utils/context/SidebarProvider";
import { BiArrowToLeft } from "react-icons/bi";

const Logo = () => {
    const { isOpen, changeOpen } = useContext(SidebarContext);
    return (
        <div className="bg-gray-200">
            <div className="px-8 py-3 relative">
                <Link
                    className={`flex items-center text-sm text-slate-700 dark:text-white ${
                        !isOpen && "justify-center"
                    }`}
                    to="/analitka"
                >
                    <img src={kspiLogo} className="inline max-h-[1.80rem]" alt="logo" />
                    <div
                        className={`font-semibold ml-2 mt-1 ${
                            !isOpen && "hidden"
                        }`}
                    >
                        KSPI TUTORS
                    </div>
                </Link>
                <div className={`${isOpen ? "" : "h-[30px]"}`} />
                <div
                    onClick={changeOpen}
                    className={ `text-[1.5rem] max-md:hidden absolute top-4 cursor-pointer text-xl transition-all duration-300 ${
                        !isOpen ? "-rotate-180 right-6" : "right-2"
                    }`}
                >
                    <BiArrowToLeft />
                </div>
            </div>
            <hr
                className={`${
                    !isOpen && "opacity-0"
                } h-px mt-0 mb-8 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:via-white`}
            />
        </div>
    );
};

export default Logo;
