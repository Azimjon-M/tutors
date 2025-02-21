// icons
import { FaUserGraduate } from "react-icons/fa6";
import {
  AiOutlineBarChart,
  AiOutlinePieChart,
  AiOutlineTeam,
} from "react-icons/ai";
import { GrUserPolice } from "react-icons/gr";
import { RiFileList3Line } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
// Components
import {
  Admins,
  Analitika,
  BaholashMezonlari,
  BahoMajburiy,
  BahoOzTashabbusi,
  BahoQoshmcha,
  BahoSohagaOid,
  Fakultet,
  TopshiriqlarniKorish,
  Tutors,
} from "../pages";
import TopshiriqlarQoshish from "../pages/Topshiriq/TopshiriqlarQoshish";
import TopshiriqlarQoshishZamdekan from "../pages/Topshiriq/TopshiriqlarQoshishZamdekan";
import TopshiriqlarniKorishZamdekan from "../pages/Topshiriq/TopshiriqlarniKorishZamdekan";
import userRole from "../components/userRole";

// Majburiy topshiriq Tutor
import IjaragaTashrifTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/IjaragaTashrif";
import TTJgaTashrifTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/TTJgaTashrif";
import TutorSoatiTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/TutorlikSoati";
import DavraSuxbatiTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/DavraSuxbati";
import TadbirlarTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/Tadbirlar";
import TTJdaTadbirlarTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/TTJdaTadbirlar";
import IqtidorliTalabalarTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/IqtidorliTalabalar";
import TestTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/Test";
import TogarakTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/Togarak";
import OilagaXatTutor from "../pages/Topshiriq/MajburiyTopshiriqlarTutor/OilagaXat";
import MajTopQoshish from "../pages/Topshiriq/MajTopQoshish/index";

// Qoshimcha topshiriq  
import QoshimchaTopshiriqTutor from "../pages/Topshiriq/QoshimchaTopshiriqTutor";
import TutorTashabbusi from "../pages/Topshiriq/TutorTashabbusi";
import TutorStatistikaQoshish from "../pages/TutorStatistikaQoshish";

const sidebar = [
  {
    id: 1,
    title: "Analitka",
    path: "/analitka",
    icon: AiOutlinePieChart,
    element: Analitika,
    role: [
      `"${userRole.superAdmin}"`,
      `"${userRole.admin}"`,
      `"${userRole.tutor}"`,
    ],
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
    title: "Topshiriqlar",
    path: "/topshiriqlar",
    icon: RiFileList3Line,
    role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
    children: [
      {
        id: 5 - 1,
        title: "Topshiriq ko'rish",
        path: "/topshiriqlar-korish",
        icon: RiFileList3Line,
        element: TopshiriqlarniKorish,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 5 - 2,
        title: "Topshiriq qo'shish",
        path: "/topshiriq-qoshish",
        icon: RiFileList3Line,
        element: TopshiriqlarQoshish,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 5 - 3,
        title: "Topshiriqlar",
        path: "/qoshimcha-topshiriqlar",
        icon: RiFileList3Line,
        element: TopshiriqlarniKorishZamdekan,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 5 - 4,
        title: "Topshiriq qo'shish",
        path: "/qoshimcha-topshiriq-qoshish",
        icon: RiFileList3Line,
        element: TopshiriqlarQoshishZamdekan,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 5 - 5,
        title: "Majburiy topshiriqlar",
        path: "/majburiy-topshiriq-qoshish",
        icon: RiFileList3Line,
        element: MajTopQoshish,
        role: [`"${userRole.superAdmin}"`],
      },
    ],
  },
  {
    id: 6,
    title: "Baholash",
    path: "/Baholash",
    icon: AiOutlineBarChart,
    role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
    children: [
      {
        id: 6 - 1,
        title: "Majburiy topshiriqlar",
        path: "/majburiy-topshiriqlar",
        icon: RiFileList3Line,
        element: BahoMajburiy,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 6 - 2,
        title: "Soxaga oid topshiriqlar",
        path: "/soxaga-oid-topshiriqlar",
        icon: RiFileList3Line,
        element: BahoSohagaOid,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 6 - 3,
        title: "Qo'shimcha topshiriqlar",
        path: "/qo'shimcha-topshiriqlar",
        icon: RiFileList3Line,
        element: BahoQoshmcha,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
      },
      {
        id: 6 - 4,
        title: "O'z tashabbusli topshiriqlar",
        path: "/oz-tashabbusli-topshiriqlar",
        icon: RiFileList3Line,
        element: BahoOzTashabbusi,
        role: [`"${userRole.superAdmin}"`],
      },
    ],
  },
  // TUTOR
  {
    id: 7,
    title: "Majburiy topshiriq",
    path: "/topshiriqlar",
    icon: RiFileList3Line,
    role: [`"${userRole.tutor}"`],
    children: [
      {
        id: 7 - 1,
        title: "TTJga tashrif",
        path: "/ttj-tashrif",
        icon: RiFileList3Line,
        element: TTJgaTashrifTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 2,
        title: "Ijaraga tashrif",
        path: "/ijaraga-tashrif",
        icon: RiFileList3Line,
        element: IjaragaTashrifTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 3,
        title: "Tutorlik soati",
        path: "/tutorlik-soati",
        icon: RiFileList3Line,
        element: TutorSoatiTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 4,
        title: "Davra suhbati",
        path: "/davra-suxbati",
        icon: RiFileList3Line,
        element: DavraSuxbatiTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 5,
        title: "Tadbirlar",
        path: "/tadbirlar",
        icon: RiFileList3Line,
        element: TadbirlarTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 6,
        title: "TTJda tadbirlar",
        path: "/ttjda-tadbirlar",
        icon: RiFileList3Line,
        element: TTJdaTadbirlarTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 7,
        title: "Iqtidorli talabalar",
        path: "/iqtidorli-talabalar",
        icon: RiFileList3Line,
        element: IqtidorliTalabalarTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 8,
        title: "Test",
        path: "/test-tutor",
        icon: RiFileList3Line,
        element: TestTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 9,
        title: "To'garak",
        path: "/togarak",
        icon: VscGraph,
        element: TogarakTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 7 - 10,
        title: "Oilaga xat",
        path: "/oilaga-xat",
        icon: RiFileList3Line,
        element: OilagaXatTutor,
        role: [`"${userRole.tutor}"`],
      },
    ],
  },
  {
    id: 8,
    title: "Qo'shimcha topshiriq",
    path: "/qoshimcha-topshiriq",
    icon: VscGraph,
    element: QoshimchaTopshiriqTutor,
    role: [`"${userRole.tutor}"`],
  },
  {
    id: 9,
    title: "Tutor tashabbusi",
    path: "/tutor-tashabbusi",
    icon: VscGraph,
    element: TutorTashabbusi,
    role: [`"${userRole.tutor}"`],
  },
  {
    id: 10,
    title: "Statistika qo'shish",
    path: "/tutor-statistika-qoshish",
    icon: VscGraph,
    element: TutorStatistikaQoshish,
    role: [`"${userRole.tutor}"`],
  },
  // /TUTOR
  {
    id: 11,
    title: "Baholash Mezonlari",
    path: "/baholash-mezonlari",
    icon: VscGraph,
    element: BaholashMezonlari,
    role: [
      `"${userRole.superAdmin}"`,
      `"${userRole.admin}"`,
      `"${userRole.tutor}"`,
    ],
  },
  // {
  //   id: 11,
  //   title: "Baholash Mezonlari",
  //   path: "/baholash-mezonlari",
  //   icon: VscGraph,
  //   element: BaholashMezonlari,
  //   role: [
  //     `"${userRole.superAdmin}"`,
  //   ],
  // },
];

export default sidebar;
