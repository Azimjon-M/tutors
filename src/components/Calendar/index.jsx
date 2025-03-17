import React, { useEffect, useState } from "react";

const Calendar = ({ holidays, onMonthChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Bayram rangini aniqlash
    const holidayClass = (holiday, isToday) => {
        const currentDate = new Date().setHours(0, 0, 0, 0); // Bugungi kunni solishtirish uchun
        const boshlanish_vaqti = new Date(holiday.boshlanish_vaqti).setHours(
            0,
            0,
            0,
            0
        );
        const tugash_vaqti = new Date(holiday.tugash_vaqti).setHours(
            23,
            59,
            59,
            999
        );

        // Agar bugungi kun bayram kuni ichida bo'lsa, ustunlik beramiz
        if (
            isToday &&
            currentDate >= boshlanish_vaqti &&
            currentDate <= tugash_vaqti
        ) {
            return "btn btn-info text-white"; // Hozirgi kun bayram kuni
        }

        // Bayramning holatini aniqlash
        if (currentDate < boshlanish_vaqti) {
            return "btn btn-success text-white"; // Keladigan bayramlar
        } else if (currentDate > tugash_vaqti) {
            return "btn btn-error text-white"; // O'tgan bayramlar
        } else {
            return "btn btn-warning text-white"; // Hozirgi bayramlar
        }
    };

    // Kun bayramga to'g'ri keladimi?
    const isHoliday = (day, holidays) => {
        const dayTime = new Date(day).setHours(0, 0, 0, 0); // Kunni solishtirish uchun vaqtni nolga o'rnatamiz

        for (let holiday of holidays) {
            const boshlanish_vaqti = new Date(
                holiday.boshlanish_vaqti
            ).setHours(0, 0, 0, 0);
            const tugash_vaqti = new Date(holiday.tugash_vaqti).setHours(
                23,
                59,
                59,
                999
            ); // Kun oxirigacha

            if (dayTime >= boshlanish_vaqti && dayTime <= tugash_vaqti) {
                return holiday;
            }
        }
        return null;
    };

    // Oy kunlarini generatsiya qilish
    const generateDaysOfMonth = (month, year) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Oy kunlari soni
        const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // Dushanbadan boshlanish
        const days = [];

        // Bo'sh joylarni qo'shish
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-2 m-1"></div>);
        }

        // Kunlarni generatsiya qilish
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDay = new Date(year, month, day);
            const isToday =
                currentDay.toDateString() === new Date().toDateString(); // Bugungi kun
            const holiday = isHoliday(currentDay, holidays); // Bayramni tekshirish
            const holidayClasses = holiday
                ? holidayClass(holiday, isToday)
                : "text-black"; // Bayram ranglari btn btn-pri

            days.push(
                <div
                    key={day}
                    className={`day ${
                        isToday && !holiday
                            ? "btn bg-[#00b7ff] border border-black hover:bg-[#0099ff] text-white"
                            : ""
                    } ${holidayClasses} p-2 m-1 cursor-pointer`}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    // Oy va yilni o'zgartirish
    const changeMonth = (direction) => {
        if (direction === "next") {
            if (currentMonth === 11) {
                onMonthChange(currentYear+1, 0);
            } else {
                onMonthChange(currentYear, currentMonth+1);
            }
            setCurrentMonth((prevMonth) =>
                prevMonth === 11 ? 0 : prevMonth + 1
            );
            if (currentMonth === 11) setCurrentYear(currentYear + 1); // Yilni o'zgartirish

        } else if (direction === "prev") {
            if (currentMonth === 0) {
                onMonthChange(currentYear-1, 11);
            } else {
                onMonthChange(currentYear, currentMonth - 1);
            }
            setCurrentMonth((prevMonth) =>
                prevMonth === 0 ? 11 : prevMonth - 1
            );
            if (currentMonth === 0) setCurrentYear(currentYear - 1); // Yilni o'zgartirish
        }
    };

    const getMonth = (numberEfMonth) => {
        switch (numberEfMonth) {
            case 0:
                return "Yanvar";
            case 1:
                return "Fevral";
            case 2:
                return "Mart";
            case 3:
                return "Aprel";
            case 4:
                return "May";
            case 5:
                return "Iyyun";
            case 6:
                return "Iyyul";
            case 7:
                return "Avgust";
            case 8:
                return "Sentyabr";
            case 9:
                return "Oktyabr";
            case 10:
                return "Noyabr";
            case 11:
                return "Dekabr";
            default:
                return "Oy";
        }
    };

    useEffect(() => {
        onMonthChange(new Date().getFullYear(), new Date().getMonth()); // Parentga o'zgarishlarni yuborish
    }, [onMonthChange]);

    return (
        <div className="border rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => changeMonth("prev")}
                    className="btn btn-neutral text-white"
                >
                    Ortga
                </button>
                <div className="flex gap-2 text-lg font-semibold">
                    <h1>{getMonth(currentMonth)}</h1>
                    <h1>{currentYear}</h1>
                </div>
                <button
                    onClick={() => changeMonth("next")}
                    className="btn btn-neutral text-white"
                >
                    Oldinga
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {/* Hafta kunlari */}
                <div className="text-center">Dushanba</div>
                <div className="text-center">Seshanba</div>
                <div className="text-center">Chorshanba</div>
                <div className="text-center">Payshanba</div>
                <div className="text-center">Juma</div>
                <div className="text-center">Shanba</div>
                <div className="text-center">Yakshanba</div>

                {/* Oy kunlari */}
                {generateDaysOfMonth(currentMonth, currentYear)}
            </div>
        </div>
    );
};

export default Calendar;
