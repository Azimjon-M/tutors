import { Outlet } from "react-router-dom";
import Panel from "./Panel";
import Breadcrumb from "../Breadcrumb";

const Sidebar = () => {
    return (
        /* container (as a body) */
        <div className="bg-gray-100 w-full h-screen relative flex transition-all duration-300">
            {/* Sidebar */}
            <Panel />
            {/* page container */}
            <div className={`w-full overflow-y-auto`}>
                <nav className="bg-slate-500 py-3 pl-4">
                    {/* navbar vazifasida */}
                    <Breadcrumb />
                </nav>
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;
