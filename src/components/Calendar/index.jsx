import React, { useState, useEffect } from "react";

const Calendar = ({ holidays }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Hozirgi oy
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Hozirgi yil

    const holidayClass = (holiday) => {
        const currentDate = new Date();

        // Bayramning holatini aniqlash:
        if (new Date(holiday.startTime) > currentDate) {
            return "text-yellow-500"; // Keladigan bayramlar uchun sariq rang
        } else if (new Date(holiday.endtime) < currentDate) {
            return "text-red-500"; // O'tgan bayramlar uchun qizil rang
        } else {
            return "text-green-500"; // Hozirgi bayram kuni uchun yashil rang
        }
    };

    const isHoliday = (day, holidays) => {
        for (let holiday of holidays) {
            const startTime = new Date(holiday.startTime);
            const endTime = new Date(holiday.endtime);

            // Bayram kunini tekshirish: agar startTime bayram sanasidan keyin yoki teng bo'lsa
            if (day >= startTime && day <= endTime) {
                return holiday; // Bayramni qaytarish
            }
        }
        return null; // Bayramda emas
    };

    const generateDaysOfMonth = (month, year) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Oydagi kunlar soni
        const currentDate = new Date(); // Hozirgi sana
        const days = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDay = new Date(year, month, day);
            const isToday =
                currentDay.toDateString() === currentDate.toDateString(); // Bugungi kunni aniqlash

            // Bayramni tekshirish
            const holiday = isHoliday(currentDay, holidays);
            const holidayClasses = holiday
                ? holidayClass(holiday)
                : "text-black";

            // Agar bayram kuni ichida bo'lsak, bugungi kunni ko'rsatish
            const isHolidayToday = holiday && isToday;

            days.push(
                <div
                    key={day}
                    className={`day ${
                        isToday ? "bg-blue-500 text-white rounded-full" : ""
                    } ${holidayClasses} p-2 m-1 cursor-pointer ${
                        isHolidayToday ? "underline" : ""
                    }`}
                >
                    {day}{" "}
                    {/* Bayramda ham bugungi kunni ko'rsatamiz, faqat underline qilamiz */}
                </div>
            );
        }
        return days;
    };

    // Oy va yilni o'zgartirish
    const changeMonth = (direction) => {
        if (direction === "next") {
            setCurrentMonth((prevMonth) =>
                prevMonth === 11 ? 0 : prevMonth + 1
            );
            if (currentMonth === 11) setCurrentYear(currentYear + 1); // Yilni o'zgartirish
        } else if (direction === "prev") {
            setCurrentMonth((prevMonth) =>
                prevMonth === 0 ? 11 : prevMonth - 1
            );
            if (currentMonth === 0) setCurrentYear(currentYear - 1); // Yilni o'zgartirish
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <button
                    onClick={() => changeMonth("prev")}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                >
                    Prev
                </button>
                <div className="text-lg font-semibold">
                    {new Date(currentYear, currentMonth).toLocaleString(
                        "default",
                        { month: "long" }
                    )}{" "}
                    {currentYear}
                </div>
                <button
                    onClick={() => changeMonth("next")}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                >
                    Next
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {/* Haftaning kunlarini ko'rsatish */}
                <div className="text-center">Mon</div>
                <div className="text-center">Tue</div>
                <div className="text-center">Wed</div>
                <div className="text-center">Thu</div>
                <div className="text-center">Fri</div>
                <div className="text-center">Sat</div>
                <div className="text-center">Sun</div>

                {/* Oydagi kunlarni ko'rsatish */}
                {generateDaysOfMonth(currentMonth, currentYear)}
            </div>
        </div>
    );
};

export default Calendar;
