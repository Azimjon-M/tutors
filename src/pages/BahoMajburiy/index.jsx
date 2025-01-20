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
import BahoTogarak from "../BahoTogarak";

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
            case "bahoTogarak":
                return <BahoTogarak />;
            default:
                return <p>Tab tanlang.</p>;
        }
    };

    const toglerButton = [
        {
            id: 1,
            name: "TTJga tashrif",
            tab: "ttjTashrif",
        },
        {
            id: 2,
            name: "Ijara",
            tab: "ijara",
        },
        {
            id: 3,
            name: "TTJ Tadbir",
            tab: "ttjTadbir",
        },
        {
            id: 4,
            name: "Davra suhbati",
            tab: "davraSuhbati",
        },
        {
            id: 5,
            name: "Tadbirlar",
            tab: "tadbirlar",
        },
        {
            id: 6,
            name: "Tutorlik soati",
            tab: "tutorlikSoat",
        },
        {
            id: 7,
            name: "Iqtidorli talaba",
            tab: "iqtidorliTalaba",
        },
        {
            id: 8,
            name: "Ota-onaga xat",
            tab: "otaOnagaXat",
        },
        {
            id: 9,
            name: "Test",
            tab: "test",
        },
        {
            id: 10,
            name: "To'garak",
            tab: "bahoTogarak",
        },
    ];

    return (
        <div className="p-4 z-20">
            {/* Asosiy konteyner */}
            <div className="md:flex">
                {/* Chap menyu */}
                <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    {toglerButton.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveTab(item.tab)}
                                className={`inline-flex items-center px-4 py-3 rounded-lg w-full whitespace-nowrap ${
                                    activeTab === item.tab
                                        ? "text-white bg-blue-700"
                                        : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
                {/* O'ng qism */}
                <div className="p-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full custom-scrollbar h-[89vh]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default BahoMajburiy;