import React from "react";

const BaholashMezonlari = () => {
    const sections = [
        { id: 1, maxBal: "9", title: "Majburiy topshiriq", children: true },
        { id: 2, maxBal: "", title: "Soxaga oid" },
        { id: 3, maxBal: "12", title: "Qo'shimcha topshiriqlar" },
        { id: 4, maxBal: "", title: "O'z Tashabbusi" },
    ];
    const childSectiom = [
        { id: 1, maxBal: "1452", title: "TTJga tashrif" },
        { id: 2, maxBal: "", title: "Ijaraga tashrif" },
        { id: 3, maxBal: "", title: "TTJda tadbir" },
        { id: 4, maxBal: "96", title: "Davra suxbati" },
        { id: 5, maxBal: "", title: "Tadbirlar" },
        { id: 6, maxBal: "", title: "Tutorlik soati" },
        { id: 7, maxBal: "", title: "Iqtidorli talaba" },
        { id: 8, maxBal: "", title: "Ota-onaga xat" },
        { id: 9, maxBal: "", title: "Test" },
        { id: 10, maxBal: "", title: "To'garak" },
    ];
    const handleSubmit = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const value = formData.get("score");

        switch (id) {
            case 1:
                console.log(value);
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto p-6">
            <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
                Baholash Mezonlari
            </h1>
            <div className="flex flex-wrap justify-between items-start gap-8">
                <div className="w-[60%] p-4 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-center text-2xl font-medium mb-6">
                        Berilgan Ballar
                    </h2>
                    <div>
                        {sections.map((item) =>
                            item.children ? (
                                <div
                                    key={item.id}
                                >
                                    <h3 className="font-semibold mb-2">
                                        {item.title}:
                                    </h3>
                                    {childSectiom.map((child) => (
                                        <div
                                            key={child.id}
                                            className="flex justify-between items-center p-2 border-b border-gray-300 ms-4"
                                        >
                                            <span>{child.title}</span>
                                            <span>
                                                {child.maxBal ? (
                                                    <span className="text-md">
                                                        {child.maxBal}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-red-500">
                                                        0 (baholanmagan!)
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-2 border-b border-gray-300"
                                >
                                    <span className="font-medium">
                                        {item.title} Bali:
                                    </span>
                                    <span>
                                        {item.maxBal ? (
                                            <span className="text-md">
                                                {item.maxBal}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-red-500">
                                                0 (baholanmagan!)
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
                {/* Formlar bo'limi */}
                <div className="w-[35%] p-4 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-center text-2xl font-medium mb-6">
                        Baholash
                    </h2>
                    <div className="flex gap-2 join join-vertical w-full">
                        {sections.map((section) =>
                            section.children ? (
                                <div
                                    key={section.id}
                                    className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg"
                                >
                                    <input type="checkbox" name="accordion" />
                                    <div className="collapse-title font-medium flex justify-between items-center">
                                        {section.title}
                                    </div>
                                    <div className="collapse-content">
                                        {childSectiom.map((item) => (
                                            <div
                                                key={item.id}
                                                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4"
                                            >
                                                <input
                                                    type="radio"
                                                    name="childAccordion"
                                                />
                                                <div className="collapse-title text-lg font-medium flex justify-between items-center">
                                                    {item.title}
                                                </div>
                                                <div className="collapse-content">
                                                    <form
                                                        onSubmit={(e) =>
                                                            handleSubmit(
                                                                e,
                                                                section.id
                                                            )
                                                        }
                                                    >
                                                        <div className="">
                                                            Max ball:
                                                            <b>
                                                                {item.maxBal
                                                                    ? item.maxBal
                                                                    : "0"}
                                                            </b>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            name="score"
                                                            defaultValue={
                                                                item.maxBal
                                                                    ? item.maxBal
                                                                    : "0"
                                                            }
                                                            className="input input-bordered w-full mt-2"
                                                            placeholder="Qiymat kiriting"
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary w-full mt-2"
                                                        >
                                                            Saqlash
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={section.id}
                                    className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg"
                                >
                                    <input type="checkbox" name="accordion" />
                                    <div className="collapse-title font-medium flex justify-between items-center">
                                        {section.title}
                                    </div>
                                    <div className="collapse-content">
                                        <form
                                            onSubmit={(e) =>
                                                handleSubmit(e, section.id)
                                            }
                                        >
                                            <div className="">
                                                Max ball:
                                                <b>
                                                    {section.maxBal
                                                        ? section.maxBal
                                                        : "0"}
                                                </b>
                                            </div>
                                            <input
                                                type="number"
                                                min="0"
                                                name="score"
                                                defaultValue={
                                                    section.maxBal
                                                        ? section.maxBal
                                                        : "0"
                                                }
                                                className="input input-bordered w-full mt-2"
                                                placeholder="Qiymat kiriting"
                                            />
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-full mt-2"
                                            >
                                                Saqlash
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaholashMezonlari;
