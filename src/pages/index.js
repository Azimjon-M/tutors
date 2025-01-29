import { lazy } from "react";

export const Admins = lazy(() => import("./Admins"));
export const AdminStatistika = lazy(() => import("./AdminStatistika"));
export const Analitika = lazy(() => import("./Analitika"));

export const BahoMajburiy = lazy(() => import("./Bahoslash/BahoMajburiy"));
export const BaholashMezonlari = lazy(() => import("./Bahoslash/BaholashMezonlari"));
export const BahoOzTashabbusi = lazy(() => import("./Bahoslash/BahoOzTashabbusi"));
export const BahoQoshmcha = lazy(() => import("./Bahoslash/BahoQoshmcha"));
export const BahoSohagaOid = lazy(() => import("./Bahoslash/BahoSohagaOid"));
export const BahoTogarak = lazy(() => import("./Bahoslash/BahoTogarak"));

export const Error401 = lazy(() => import("./Error/Error401"));
export const Error404 = lazy(() => import("./Error/Error404"));
export const Fakultet = lazy(() => import("./Fakultet"));
export const Login = lazy(() => import("./Login"));
export const NotAuthorized = lazy(() => import("./NotAuthorized"));
export const SuperAdminStatistika = lazy(() => import("./SuperAdminStatistika"));
export const Topshiriqlar = lazy(() => import("./Topshiriq/TopshiriqlarQoshish"));
export const TopshiriqlarniKorish = lazy(() => import("./Topshiriq/TopshiriqlarniKorish"));
export const Tutors = lazy(() => import("./Tutors"));
export const TutorStatistika = lazy(() => import("./TutorStatistika"));
