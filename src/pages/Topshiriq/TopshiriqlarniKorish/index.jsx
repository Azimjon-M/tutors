import React, { useState } from "react";

import MajburiyTopshiriq from "../MajburiyTopshiriqlarKorish/MajburiyTopshiriq";
import OzTashabbusliTopshiriq from "../MajburiyTopshiriqlarKorish/OzTashabbusliTopshiriq";
import QoshimchaTopshiriqTutor from "../MajburiyTopshiriqlarKorish/QoshimchaTopshiriq";
import SoxagaOidTopshiriq from "../MajburiyTopshiriqlarKorish/SoxagaOidTopshiriq"

const TopshiriqlarniKorish = () => {
    const [activeTab, setActiveTab] = useState("majTop");
    const renderContent = () => {
        switch (activeTab) {
            case "majTop":
                return <MajburiyTopshiriq />;
            case "soxOidTop":
                return <OzTashabbusliTopshiriq />;
            case "qoshTop":
                return <QoshimchaTopshiriqTutor />;
            case "ozTashTop":
                return <SoxagaOidTopshiriq />;
            default:
                return <p className="m-4 text-lg font-medium">Tabni tanlang...</p>;
        }
    };

    const toglerButton = [
        {
            id: 1,
            name: "Majburiy topshiriqlar",
            tab: "majTop",
        },
        {
            id: 2,
            name: "Soxaga oid topshiriqlar",
            tab: "soxOidTop",
        },
        {
            id: 3,
            name: "Qo'shimcha topshiriqlar",
            tab: "qoshTop",
        },
        {
            id: 4,
            name: "O'z tashabbusli topshiriqlar",
            tab: "ozTashTop",
        },
    ];

    return (
        <div>
            {/* Asosiy konteyner */}
            <div className="md:flex">
                {/* Chap menyu */}
                <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 p-3">
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
                <div className="w-full h-[calc(100vh-72px)] bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg custom-scrollbar">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default TopshiriqlarniKorish;