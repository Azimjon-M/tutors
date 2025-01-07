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
import Topshiriqlar from "../pages/Topshiriqlar";
import BaholashMezonlari from "../pages/BaholashMezonlari";
import { VscGraph } from "react-icons/vsc";
import TopshiriqlarniKorish from "../pages/TopshiriqlarniKorish";
// import NotAuthorized from "../pages/NotAuthorized";
import BahoMajburiy from "../pages/BahoMajburiy";
import BahoSohagaOid from "../pages/BahoSohagaOid";
import BahoQoshmcha from "../pages/BahoQoshmcha";
import BahoOzTashabbusi from "../pages/BahoOzTashabbusi";
import BahoTogarak from "../pages/BahoTogarak";

import userRole from "../components/userRole";

const sidebar = [
    {
        id: 1,
        title: "Analitka",
        path: "/analitka",
        icon: AiOutlinePieChart,
        element: Analitika,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`, `"${userRole.tutor}"`],
    },
    {
        id: 2,
        title: "Fakultetlar",
        path: "/fakultet",
        icon: AiOutlineTeam,
        element: Fakultet,
        role: [`"${userRole.superAdmin}"`],
    },
    {
        id: 3,
        title: "Adminlar",
        path: "/admin",
        icon: GrUserPolice,
        element: Admins,
        role: [`"${userRole.superAdmin}"`],
    },
    {
        id: 4,
        title: "Tyutorlar",
        path: "/tyutor",
        icon: FaUserGraduate,
        element: Tutors,
        role: [`"${userRole.superAdmin}"`],
    },
    {
        id: 5,
        title: "Baholash",
        path: "/Baholash",
        icon: AiOutlineBarChart,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
        children: [
            {
                id: 5-1,
                title: "Majburiy topshiriqlar",
                path: "/majburiy-topshiriqlar",
                icon: RiFileList3Line,
                element: BahoMajburiy,
                role: [`"${userRole.superAdmin}"`],
            },
            {
                id: 5-2,
                title: "Soxaga oid topshiriqlar",
                path: "/soxaga-oid-topshiriqlar",
                icon: RiFileList3Line,
                element: BahoSohagaOid,
                role: [`"${userRole.superAdmin}"`],
            },
            {
                id: 5-3,
                title: "Qo'shimcha topshiriqlar",
                path: "/qo'shimcha-topshiriqlar",
                icon: RiFileList3Line,
                element: BahoQoshmcha,
                role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
            },
            {
                id: 5-4,
                title: "O'z tashabbusli topshiriqlar",
                path: "/o'z-tashabbusli-topshiriqlar",
                icon: RiFileList3Line,
                element: BahoOzTashabbusi,
                role: [`"${userRole.superAdmin}"`],
            },
            {
                id: 5-5,
                title: "To'garak topshiriqlari",
                path: "/to'garaklar-topshiriqlar",
                icon: RiFileList3Line,
                element: BahoTogarak,
                role: [`"${userRole.superAdmin}"`],
            },
        ]
    },
    {
        id: 6,
        title: "Topshiriqlar",
        path: "/topshiriqlar",
        icon: RiFileList3Line,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
        children: [
            {
                id: 6-1,
                title: "Topshiriqlar",
                path: "/topshiriqlar",
                icon: RiFileList3Line,
                element: TopshiriqlarniKorish,
                role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`,],
            },
            {
                id: 6-2,
                title: "Topshiriq qo'shish",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
            },
        ]
    },
    {
        id: 7,
        title: "Majburiy topshiriq",
        path: "/topshiriqlar",
        icon: RiFileList3Line,
        role: [`"${userRole.tutor}"`],
        children: [
            {
                id: 7-1,
                title: "TTJga tashrif",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-2,
                title: "Ijaraga tashrif",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-3,
                title: "Tutorlik toati",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-4,
                title: "Davra suhbati",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-5,
                title: "Tadbirlar",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-6,
                title: "TTJda tadbiralr",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-7,
                title: "Iqtidorli talabam",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-8,
                title: "Oilaga xat",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
            {
                id: 7-8,
                title: "Test",
                path: "/topshiriq-qoshish",
                icon: RiFileList3Line,
                element: Topshiriqlar,
                role: [`"${userRole.tutor}"`],
            },
        ]
    },
    {
        id: 8,
        title: "Qo'shimcha topshiriq",
        path: "/qoshimcha-topshiriq",
        icon: VscGraph,
        element: BaholashMezonlari,
        role: [`"${userRole.tutor}"`],
    },
    {
        id: 9,
        title: "Tutor tashabbusi",
        path: "/tutor-tashabbusi",
        icon: VscGraph,
        element: BaholashMezonlari,
        role: [`"${userRole.tutor}"`],
    },
    {
        id: 10,
        title: "To'garak",
        path: "/togarak",
        icon: VscGraph,
        element: BaholashMezonlari,
        role: [`"${userRole.tutor}"`],
    },
    {
        id: 11,
        title: "Baholash Mezonlari",
        path: "/baholash-mezonlari",
        icon: VscGraph,
        element: BaholashMezonlari,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`, `"${userRole.tutor}"`],
    },
];

export default sidebar;