// icons
import { FaUserGraduate } from "react-icons/fa6";
import {
    AiOutlineBarChart,
    AiOutlinePieChart,
    AiOutlineTeam,
} from "react-icons/ai";
import { GrUserPolice } from "react-icons/gr";
import { RiFileList3Line } from "react-icons/ri";
// Components
import Analitika from "../pages/Analitika";
import Fakultet from "../pages/Fakultet";
import Admins from "../pages/Admins";
import Tutors from "../pages/Tutors";
import Baholash from "../pages/Baholash";
import Topshiriqlar from "../pages/Topshiriqlar";
import BaholashMezonlari from "../pages/BaholashMezonlari";
import { VscGraph } from "react-icons/vsc";
import TopshiriqlarniKorish from "../pages/TopshiriqlarniKorish";

const sidebar = [
    {
        id: 1,
        title: "Analitka",
        path: "/analitka",
        icon: AiOutlinePieChart,
        isPrivate: true,
        element: Analitika,
        role: ["superAdmin, admin"],
    },
    {
        id: 2,
        title: "Fakultetlar",
        path: "/fakultet",
        icon: AiOutlineTeam,
        isPrivate: true,
        element: Fakultet,
        role: ["superAdmin"],
    },
    {
        id: 3,
        title: "Adminlar",
        path: "/admin",
        icon: GrUserPolice,
        isPrivate: true,
        element: Admins,
        role: ["superAdmin"],
    },
    {
        id: 4,
        title: "Tyutorlar",
        path: "/tyutor",
        icon: FaUserGraduate,
        isPrivate: true,
        element: Tutors,
        role: ["superAdmin, admin"],
    },
    {
        id: 5,
        title: "Baholash",
        path: "/Baholash",
        icon: AiOutlineBarChart,
        isPrivate: true,
        element: Baholash,
        role: ["superAdmin"],
    },
    {
        id: 6,
        title: "Topshiriqlar",
        path: "/topshiriqlar",
        icon: RiFileList3Line,
        isPrivate: true,
        element: Topshiriqlar,
        role: ["superAdmin, admin, user"],
        children: [
            {
                id: 6-1,
                title: "Topshiriqlar",
                path: "/topshiriqlar",
                icon: RiFileList3Line,
                isPrivate: true,
                element: Topshiriqlar,
                role: ["superAdmin, admin, user"],
            },
            {
                id: 6-2,
                title: "Topshiriqlarni ko'rish",
                path: "/topshiriqlarni-ko'rish",
                icon: RiFileList3Line,
                isPrivate: true,
                element: TopshiriqlarniKorish,
                role: ["superAdmin, admin, user"],
            },
        ]
    },
    {
        id: 7,
        title: "BaholashMezonlari",
        path: "/baholash-mezonlari",
        icon: VscGraph,
        isPrivate: true,
        element: BaholashMezonlari,
        role: ["superAdmin, admin, user"],
    },
];

export default sidebar;