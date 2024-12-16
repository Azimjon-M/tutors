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
import NotAuthorized from "../pages/NotAuthorized";

import userRole from "../components/userRole";

const sidebar = [
    {
        id: 1,
        title: "Analitka",
        path: "/analitka",
        icon: AiOutlinePieChart,
        isPrivate: true,
        element: Analitika,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
    },
    {
        id: 2,
        title: "Fakultetlar",
        path: "/fakultet",
        icon: AiOutlineTeam,
        isPrivate: true,
        element: Fakultet,
        role: [`"${userRole.superAdmin}"`],
    },
    {
        id: 3,
        title: "Adminlar",
        path: "/admin",
        icon: GrUserPolice,
        isPrivate: true,
        element: Admins,
        role: [`"${userRole.superAdmin}"`],
    },
    {
        id: 4,
        title: "Tyutorlar",
        path: "/tyutor",
        icon: FaUserGraduate,
        isPrivate: true,
        element: Tutors,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
    },
    {
        id: 5,
        title: "Baholash",
        path: "/Baholash",
        icon: AiOutlineBarChart,
        isPrivate: true,
        element: Baholash,
        role: [`"${userRole.superAdmin}"`],
    },
    {
        id: 6,
        title: "Topshiriqlar",
        path: "/topshiriqlar",
        icon: RiFileList3Line,
        isPrivate: true,
        element: Topshiriqlar,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`, `"${userRole.tutor}"`],
        children: [
            {
                id: 6-1,
                title: "Topshiriq qo'shish",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                isPrivate: true,
                element: Topshiriqlar,
                role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`, `"${userRole.tutor}"`],
            },
            {
                id: 6-2,
                title: "Topshiriqlarni ko'rish",
                path: "/topshiriqlarni-ko'rish",
                icon: RiFileList3Line,
                isPrivate: true,
                element: TopshiriqlarniKorish,
                role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`, `"${userRole.tutor}"`],
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
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`, `"${userRole.tutor}"`],
    },
    {
        id: 8,
        title: "Not Authorized",
        path: "/not-authorized",
        icon: VscGraph,
        isPrivate: true,
        hidden: true,
        element: NotAuthorized,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`, `"${userRole.tutor}"`],
    },
    {
        id: 9,
        title: "Test",
        path: "/test",
        icon: VscGraph,
        isPrivate: true,
        element: BaholashMezonlari,
        role: [`"${userRole.superAdmin}"`],
    },
];

export default sidebar;