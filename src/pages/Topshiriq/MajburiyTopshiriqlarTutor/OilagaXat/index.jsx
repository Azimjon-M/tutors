import React, { useState } from "react";
import laptopGirl from "../../../../assets/fon/laptop-girl.png";

import { CiEdit } from "react-icons/ci";
import { MdOutlineCloudDownload } from "react-icons/md";

import TutorModalOilagaXat from "../../../../components/TutorModalOilagaXat";

function OilagaXat() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white rounded-md shadow-md shadow-gray-200 mt-8 p-3">
          {/* Title section */}
          <div className="p-1 md:p-5 text-center md:text-left">
            <h2 className="text-xl text-gray-600">
              Talaba oilasiga xat yuborish sahifasi
            </h2>
            <h1 className="text-2xl text-gray-600 mt-2">
              Hush kelibsiz😃,{" "}
              <span className="text-indigo-600 font-semibold">Tyutor</span>
            </h1>
            <p className=" text-gray-600 mt-2">
              Platformaga topshiriqlarni o'z vaqtida yuklashingizni so'raymiz,
              vaqtingiz chegaralangan!
            </p>
            <button
              onClick={handleOpenModal}
              className="w-full font-semibold rounded-md bg-indigo-500 hover:bg-indigo-600 mt-5 py-1 text-white"
            >
              Yuklash
            </button>
          </div>

          {/* User image */}
          <div className="md:flex items-center justify-center hidden">
            <img src={laptopGirl} alt="Laptop girl" />
          </div>

          {/* End time */}
          <div className="lg:flex items-center justify-center border-l-2 hidden">
            <div className="relative text-center size-44">
              <svg
                className="size-full -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-indigo-200 dark:text-neutral-700"
                  strokeWidth="1"
                ></circle>

                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-indigo-500 dark:text-blue-500"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="40"
                  strokeLinecap="round"
                ></circle>
              </svg>

              <div className="text-center absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-4xl font-bold text-indigo-500 dark:text-blue-500">
                  124
                </span>
                <p className="text-center text-4xl font-bold text-indigo-500 dark:text-blue-500">
                  soat
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* End time */}
        <div className="mt-5 p-3 rounded-md bg-white lg:hidden">
          <div
            className="flex relative h-6 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="flex flex-col justify-center overflow-hidden bg-indigo-300 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-indigo-500 w-2/4"></div>
            <div className="text-center absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <span className="text-center text-base font-bold text-indigo-600 dark:text-indigo-400">
                Tugash vaqti: 124 soat
              </span>
            </div>
          </div>
        </div>

        {/* Get data List*/}
        <div className="border border-gray-300 space-y-3 rounded-md shadow-md shadow-gray-200 mt-5 p-1 lg:p-3">
          {/* Xat item */}
          <div className="rounded-md bg-white p-2 xl:p-3">
            <div className="md:text-xl font-medium">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <h4 className="text-gray-600 line-clamp-1">
                  Ogoxlantirish xati
                </h4>
                <div className="flex items-center justify-end">
                  <button
                    className="flex items-center gap-1 px-4 py-1 rounded-md bg-green-500 text-white text-sm md:text-base font-semibold mr-3"
                    onClick={handleOpenModal}
                  >
                    Tahrirlash <CiEdit className="inline text-xl" />
                  </button>
                  <button className="flex items-center gap-1 px-4 py-1 rounded-md bg-blue-500 text-white text-sm md:text-base font-semibold mr-3">
                    Yuklab olish{" "}
                    <MdOutlineCloudDownload className="inline text-xl md:text-2xl" />
                  </button>
                  <p className="w-7 h-7 rounded-md text-center leading-7 bg-emerald-200 text-emerald-600">
                    7
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Xat item end */}
        </div>

        {/* Modal form for uploading tasks */}
        <TutorModalOilagaXat isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

export default OilagaXat;
