// icons
import { AiOutlinePieChart } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { BsPersonAdd } from "react-icons/bs";
import { MdOutlineGroupAdd } from "react-icons/md";
import { SiOpensourceinitiative } from "react-icons/si";
import { MdOutlineTask } from "react-icons/md";
import { MdOutlineCreditScore } from "react-icons/md";
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
import TutorSardorQoshish from "../pages/TutorSardorQoshish";
import { FiSettings } from "react-icons/fi";
import Guruxlar from "../pages/Guruxlar";
import GuruhBiriktirish from "../pages/GuruhBiriktirish";
import Yonalishlar from "../pages/Yonalishlar";
import Kurslar from "../pages/Kurslar";

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
    title: "Topshiriqlar",
    icon: RiFileList3Line,
    role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
    children: [
      {
        id: 2 - 1,
        title: "Topshiriq ko'rish",
        path: "/topshiriqlar-korish",
        icon: RiFileList3Line,
        element: TopshiriqlarniKorish,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 2 - 2,
        title: "Topshiriq qo'shish",
        path: "/topshiriq-qoshish",
        icon: RiFileList3Line,
        element: TopshiriqlarQoshish,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 2 - 3,
        title: "Topshiriqlar",
        path: "/qoshimcha-topshiriqlar",
        icon: RiFileList3Line,
        element: TopshiriqlarniKorishZamdekan,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 2 - 4,
        title: "Topshiriq qo'shish",
        path: "/qoshimcha-topshiriq-qoshish",
        icon: RiFileList3Line,
        element: TopshiriqlarQoshishZamdekan,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 2 - 5,
        title: "Majburiy topshiriqlar",
        path: "/majburiy-topshiriq-qoshish",
        icon: RiFileList3Line,
        element: MajTopQoshish,
        role: [`"${userRole.superAdmin}"`],
      },
    ],
  },
  {
    id: 3,
    title: "Baholash",
    icon: MdOutlineCreditScore,
    role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
    children: [
      {
        id: 3 - 1,
        title: "Majburiy topshiriqlar",
        path: "/majburiy-topshiriqlar",
        icon: RiFileList3Line,
        element: BahoMajburiy,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 3 - 2,
        title: "Soxaga oid topshiriqlar",
        path: "/soxaga-oid-topshiriqlar",
        icon: RiFileList3Line,
        element: BahoSohagaOid,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 3 - 3,
        title: "Qo'shimcha topshiriqlar",
        path: "/qo'shimcha-topshiriqlar",
        icon: RiFileList3Line,
        element: BahoQoshmcha,
        role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
      },
      {
        id: 3 - 4,
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
    id: 4,
    title: "Majburiy topshiriq",
    icon: RiFileList3Line,
    role: [`"${userRole.tutor}"`],
    children: [
      {
        id: 4 - 1,
        title: "TTJga tashrif",
        path: "/ttj-tashrif",
        icon: RiFileList3Line,
        element: TTJgaTashrifTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 2,
        title: "Ijaraga tashrif",
        path: "/ijaraga-tashrif",
        icon: RiFileList3Line,
        element: IjaragaTashrifTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 3,
        title: "Tutorlik soati",
        path: "/tutorlik-soati",
        icon: RiFileList3Line,
        element: TutorSoatiTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 4,
        title: "Davra suhbati",
        path: "/davra-suxbati",
        icon: RiFileList3Line,
        element: DavraSuxbatiTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 5,
        title: "Tadbirlar",
        path: "/tadbirlar",
        icon: RiFileList3Line,
        element: TadbirlarTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 6,
        title: "TTJda tadbirlar",
        path: "/ttjda-tadbirlar",
        icon: RiFileList3Line,
        element: TTJdaTadbirlarTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 7,
        title: "Iqtidorli talabalar",
        path: "/iqtidorli-talabalar",
        icon: RiFileList3Line,
        element: IqtidorliTalabalarTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 8,
        title: "Test",
        path: "/test-tutor",
        icon: RiFileList3Line,
        element: TestTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 9,
        title: "To'garak",
        path: "/togarak",
        icon: VscGraph,
        element: TogarakTutor,
        role: [`"${userRole.tutor}"`],
      },
      {
        id: 4 - 10,
        title: "Oilaga xat",
        path: "/oilaga-xat",
        icon: RiFileList3Line,
        element: OilagaXatTutor,
        role: [`"${userRole.tutor}"`],
      },
    ],
  },
  {
    id: 5,
    title: "Qo'shimcha topshiriq",
    path: "/qoshimcha-topshiriq",
    icon: MdOutlineTask,
    element: QoshimchaTopshiriqTutor,
    role: [`"${userRole.tutor}"`],
  },
  {
    id: 6,
    title: "Tutor tashabbusi",
    path: "/tutor-tashabbusi",
    icon: SiOpensourceinitiative,
    element: TutorTashabbusi,
    role: [`"${userRole.tutor}"`],
  },
  {
    id: 7,
    title: "Talabalar",
    path: "/tutor-talaba-qoshish",
    icon: MdOutlineGroupAdd,
    element: TutorStatistikaQoshish,
    role: [`"${userRole.tutor}"`],
  },
  {
    id: 8,
    title: "Guruh sardorlari",
    path: "/tutor-sardor-qoshish",
    icon: BsPersonAdd,
    element: TutorSardorQoshish,
    role: [`"${userRole.tutor}"`],
  },
  // /TUTOR
  {
    id: 9,
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
  {
    id: 10,
    title: "Sozlamalar",
    icon: FiSettings,
    role: [`"${userRole.superAdmin}"`, `"${userRole.admin}"`],
    children: [
      {
        id: 10 - 1,
        title: "Fakultet",
        path: "/fakultet",
        element: Fakultet,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 10 - 2,
        title: "Yo'nalish",
        path: "/yonalish",
        element: Yonalishlar,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 10 - 3,
        title: "Kurs",
        path: "/kurs",
        element: Kurslar,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 10 - 4,
        title: "Gurux",
        path: "/gurux",
        element: Guruxlar,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 10 - 5,
        title: "Gurux biriktirish",
        path: "/gurux-biriktirish",
        element: GuruhBiriktirish,
        role: [`"${userRole.admin}"`],
      },
      {
        id: 10 - 6,
        title: "Admin",
        path: "/admin",
        element: Admins,
        role: [`"${userRole.superAdmin}"`],
      },
      {
        id: 10 - 7,
        title: "Tyutor",
        path: "/tutor",
        element: Tutors,
        role: [`"${userRole.superAdmin}"`],
      },
    ],
  },
];

export default sidebar;
