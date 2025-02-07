import React, { useState } from "react";
import laptopGirl from "../../../../assets/fon/laptop-girl.png";

import { MdOutlineCloudDownload } from "react-icons/md";

import rasm1 from "../../../../assets/fon/university-events.jpg";
import rasm2 from "../../../../assets/fon/university-events-two.jpg";
import TutorModalFormCom from "../../../../components/TutorModalFormCom";

function IqtidorliTalabalar() {
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
              Talabalar turar joyiga tashrif sahifasi
            </h2>
            <h1 className="text-2xl text-gray-600 mt-2">
              Hush kelibsiz😃,{" "}
              <span className="text-indigo-600 font-semibold">Tyutor</span>
            </h1>
            <p className=" text-gray-600 mt-2">
              Platformaga topshiriqlarni o'z vaqtida yuklashingizni so'raymiz,
              vaqtingiz chegaralangan!
            </p>
            <button onClick={handleOpenModal} className="w-full font-semibold rounded-md bg-indigo-500 hover:bg-indigo-600 mt-5 py-1 text-white">
              Yuklash{" "}
              <span className="text-sm bg-indigo-200 text-indigo-600 px-2 rounded-full">
                1/2
              </span>
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
        <div className="border border-gray-300 space-y-3 rounded-md shadow-md shadow-gray-200 mt-5 p-3">
          <div className="collapse collapse-arrow rounded-md bg-white">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title md:text-xl font-medium">
              <div className="flex items-center justify-between">
                <h4 className="text-gray-600 line-clamp-1">
                  Click to open this one and close others
                </h4>
                <p className="w-7 h-7 rounded-md text-center leading-7 bg-emerald-200 text-emerald-600">
                  7
                </p>
              </div>
            </div>
            <div className="collapse-content">
              <div className="bg-slate-100 rounded-md p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm md:text-base text-slate-600">
                    22.02.2025 yil
                  </p>
                  <button className="flex items-center gap-1 px-4 py-1 rounded-md bg-green-500 text-white text-sm md:text-base font-semibold">
                    Yuklash olish{" "}
                    <MdOutlineCloudDownload className="inline text-xl md:text-2xl" />
                  </button>
                </div>
                <div className="px-5 pt-5">
                  <h1 className="text-xl md:text-2xl font-semibold text-slate-600 text-center">
                    Click to open this one and close others
                  </h1>
                </div>
                <div className="grid md:grid-cols-2 items-center gap-5 mt-5 px-5">
                  <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                    <img
                      src={rasm1}
                      alt="university events"
                      className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                    />
                  </div>
                  <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                    <img
                      src={rasm2}
                      alt="university events"
                      className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <p className="md:text-xl text-slate-600">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="flex items-center pl-5">
                  <a
                    className="inline-flex items-center gap-x-1 text-sm md:text-base text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    href="https://www.kspi.uz"
                  >
                    Qo'shimcha xujjat fayl
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-md bg-white">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title md:text-xl font-medium">
              <div className="flex items-center justify-between">
                <h4 className="text-gray-600 line-clamp-1">
                  Click to open this one and close others
                </h4>
                <p className="w-7 h-7 rounded-md text-center leading-7 bg-emerald-200 text-emerald-600">
                  7
                </p>
              </div>
            </div>
            <div className="collapse-content">
              <div className="bg-slate-100 rounded-md p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm md:text-base text-slate-600">
                    22.02.2025 yil
                  </p>
                  <button className="flex items-center gap-1 px-4 py-1 rounded-md bg-green-500 text-white text-sm md:text-base font-semibold">
                    Yuklash olish{" "}
                    <MdOutlineCloudDownload className="inline text-xl md:text-2xl" />
                  </button>
                </div>
                <div className="px-5 pt-5">
                  <h1 className="text-xl md:text-2xl font-semibold text-slate-600 text-center">
                    Click to open this one and close others
                  </h1>
                </div>
                <div className="grid md:grid-cols-2 items-center gap-5 mt-5 px-5">
                  <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                    <img
                      src={rasm1}
                      alt="university events"
                      className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                    />
                  </div>
                  <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                    <img
                      src={rasm2}
                      alt="university events"
                      className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <p className="md:text-xl text-slate-600">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="flex items-center pl-5">
                  <a
                    className="inline-flex items-center gap-x-1 text-sm md:text-base text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    href="https://www.kspi.uz"
                  >
                    Qo'shimcha xujjat fayl
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal form for uploading tasks */}
        <TutorModalFormCom
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          // roleUser={"admin"}
        />
      </div>
    </div>
  );
}

export default IqtidorliTalabalar;
