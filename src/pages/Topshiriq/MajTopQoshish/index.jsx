import React, { useState } from "react";
import {
    MajTopTTjTashrif,
    MajTopIjaraTashri,
    MajTopTTjTadbir,
    MajTopDavraSuxbat,
    MajTopTadbirlar,
    MajTopTutorlikSoati,
    MajTopIqtidorliTalaba,
    MajTopOilagaXat,
    MajTopTest,
    MajTopTogarak
} from "../index.js";

const MajTopQoshish = () => {
    // +Tab
    const [activeTab, setActiveTab] = useState("ttjTashrif");

    // Har bir tabning kontenti
    const renderContent = () => {
        switch (activeTab) {
            case "ttjTashrif":
                return <MajTopTTjTashrif />;
            case "ijara":
                return <MajTopIjaraTashri />;
            case "ttjTadbir":
                return <MajTopTTjTadbir />;
            case "davraSuhbati":
                return <MajTopDavraSuxbat />;
            case "tadbirlar":
                return <MajTopTadbirlar />;
            case "tutorlikSoat":
                return <MajTopTutorlikSoati />;
            case "iqtidorliTalaba":
                return <MajTopIqtidorliTalaba />;
            case "otaOnagaXat":
                return <MajTopOilagaXat />;
            case "test":
                return <MajTopTest />;
            case "bahoTogarak":
                return <MajTopTogarak />;
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
    // /+Tab

    return (
        <div>
            {/* Asosiy konteyner */}
            <div className="md:flex me-0">
                {/* Chap menyu */}
                <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 md:mb-0 p-3">
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
                <div className="w-full h-[calc(100vh-72px)] bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg custom-scrollbar p-2">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MajTopQoshish;
