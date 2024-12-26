import React, { useState } from "react";
import TTJTashrif from "../../components/BahMajburiyTTJTashrif";
import IjaraTashrif from "../../components/BahMajburiyIjaraTashrif";
import TTJTadbir from "../../components/BahMajburiyTTJTadbir";
import DavraSuhbati from "../../components/BahMajburiyDavraSuhbati";
import Tadbirlar from "../../components/BahMajburiyTadbirlar";
import TutorlikSoati from "../../components/BahMajburiyTutorlikSoati";
import IqtidorliTalabalarim from "../../components/BahMajburiyIqtidorliTalabalarim";
import OilagaXat from "../../components/BahMajburiyOilagaXat";
import Test from "../../components/BahMajburiyTest";

const BahoMajburiy = () => {
  const [activeTab, setActiveTab] = useState("ttjTashrif");

  // Har bir tabning kontenti
  const renderContent = () => {
    switch (activeTab) {
      case "ttjTashrif":
        return <TTJTashrif />;
      case "ijara":
        return <IjaraTashrif />;
      case "ttjTadbir":
        return <TTJTadbir />;
      case "davraSuhbati":
        return <DavraSuhbati />;
      case "tadbirlar":
        return <Tadbirlar />;
      case "tutorlikSoat":
        return <TutorlikSoati />;
      case "iqtidorliTalaba":
        return <IqtidorliTalabalarim />;
      case "otaOnagaXat":
        return <OilagaXat />;
      case "test":
        return <Test />;
      default:
        return <p>Tab tanlang.</p>;
    }
  };

  return (
    <div className="p-4">
      {/* Asosiy konteyner */}
      <div className="md:flex">
        {/* Chap menyu */}
        <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {/* Havola: TTJga tashrif */}
          <li>
            <button
              onClick={() => setActiveTab("ttjTashrif")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "ttjTashrif"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              TTJga tashrif
            </button>
          </li>

          {/* Havola: Ijaraga tashrif */}
          <li>
            <button
              onClick={() => setActiveTab("ijara")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "ijara"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Ijaraga tashrif
            </button>
          </li>

          {/* Havola: Tutorlik soati */}
          <li>
            <button
              onClick={() => setActiveTab("tutorlikSoat")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "tutorlikSoat"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Tutorlik soati
            </button>
          </li>

          {/* Havola: Davra suhbati */}
          <li>
            <button
              onClick={() => setActiveTab("davraSuhbati")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "davraSuhbati"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Davra suhbati
            </button>
          </li>

          {/* Havola: TTJda tadbir */}
          <li>
            <button
              onClick={() => setActiveTab("ttjTadbir")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "ttjTadbir"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              TTJda tadbir
            </button>
          </li>

          {/* Havola: Tadbirlar */}
          <li>
            <button
              onClick={() => setActiveTab("tadbirlar")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "tadbirlar"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Tadbirlar
            </button>
          </li>

          {/* Havola: Iqtidorli talabalar */}
          <li>
            <button
              onClick={() => setActiveTab("iqtidorliTalaba")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "iqtidorliTalaba"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Iqtidorli talabalarim
            </button>
          </li>

          {/* Havola: Talaba oilasiga xat */}
          <li>
            <button
              onClick={() => setActiveTab("otaOnagaXat")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "otaOnagaXat"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Oilaga xat
            </button>
          </li>

          {/* Havola: Test */}
          <li>
            <button
              onClick={() => setActiveTab("test")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                activeTab === "test"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Test
            </button>
          </li>
        </ul>

        {/* O'ng qism */}
        <div className="p-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full overflow-y-scroll custom-scrollbar h-[89vh]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BahoMajburiy;
