import React, { useMemo } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const BahMajburiyTTJTashrif = () => {
  const tutors = useMemo(
    () => [
      { id: 1, name: "Abdulla Karimov", fak: "Fiz-Mat" },
      { id: 2, name: "Muhammad Aliyev", fak: "Fiz-Mat" },
      { id: 3, name: "Saida Rasulova", fak: "Tabiiy fanlar" },
      { id: 4, name: "Abdulla Karimov", fak: "Tabiiy fanlar" },
      { id: 5, name: "Muhammad Aliyev", fak: "Tabiiy fanlar" },
      { id: 6, name: "Saida Rasulova", fak: "Aniq fanlar" },
      { id: 7, name: "Abdulla Karimov", fak: "Jismoniy madaniyat" },
      { id: 8, name: "Muhammad Aliyev", fak: "Fiz-Mat" },
      { id: 9, name: "Saida Rasulova", fak: "Fiz-Mat" },
    ],
    []
  );
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        TTJga tashrif
      </h3>
      {tutors.map((tutor, index) => (
        <div
          key={tutor.id}
          className="collapse collapse-arrow border rounded-lg shadow-md hover:shadow-lg mb-3"
        >
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title flex justify-between items-center">
            <p className="text-sky-700 font-medium line-clamp-1">
              <span>{index + 1}. </span>
              {tutor.name}
            </p>
            <div className="flex space-x-2 z-10">
              <button
                type="button"
                className="relative p-2 rounded-lg text-white border border-teal-500 bg-teal-500 hover:bg-teal-600 active:bg-teal-100 active:border-teal-600 active:text-teal-600"
                onClick={() => null}
              >
                <IoNotificationsOutline />
                <span className="-top-1 -right-1 absolute w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
          <div className="collapse-content space-y-2">
            <p className="text-sky-700 font-medium">
              <span className="text-sky-800 font-bold">Fakultitet nomi:</span>{" "}
              {tutor.fak}
            </p>
            <p className="text-sky-700 font-medium">
              <span className="text-sky-800 font-bold">
                Topshiriq:
              </span>{" "}
              {tutor.username}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BahMajburiyTTJTashrif;
