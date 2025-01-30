import React from "react";
import laptopGirl from "../../../../assets/fon/laptop-girl.png";
import TTJgaTashrifCom from "../../../../components/TTJgaTashrifCom";


function TTJgaTashrifTutor() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-3 bg-white rounded-md shadow-md shadow-gray-200 mt-8 p-3">
          <div className="pl-5 pt-5">
            <h2 className="text-xl text-gray-600">Talabalar turar joyiga tashrif sahifasi</h2>
            <h1 className="text-2xl text-gray-600 mt-2">Hush kelibsiz😃, <span className="text-indigo-600 font-semibold">Tyutor</span></h1>
            <p className=" text-gray-600 mt-2">Platformaga topshiriqlarni o'z vaqtida yuklashingizni so'raymiz, vaqtingiz chegaralangan!</p>
            <button className="w-full rounded-md bg-indigo-500 mt-5 py-1 text-white">1/2</button>
            {/* <div
              class="flex relative h-6 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
              role="progressbar"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div class="flex flex-col justify-center overflow-hidden bg-blue-300 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500 w-2/4"></div>
              <div class="text-center absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span class="text-center text-base font-bold text-blue-500 dark:text-blue-500">
                  5 | 22:55:50
                </span>
              </div>
            </div> */}
          </div>
          <div className="flex items-center justify-center">
            <img src={laptopGirl} alt="Laptop girl" />
          </div>
          <div className="flex items-center justify-center border-l-2">
            <div class="relative text-center size-44">
              <svg
                class="size-full -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  class="stroke-current text-indigo-200 dark:text-neutral-700"
                  stroke-width="1"
                ></circle>

                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  class="stroke-current text-indigo-500 dark:text-blue-500"
                  stroke-width="2"
                  stroke-dasharray="100"
                  stroke-dashoffset="40"
                  stroke-linecap="round"
                ></circle>
              </svg>

              <div class="text-center absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span class="text-center text-4xl font-bold text-indigo-500 dark:text-blue-500">
                  124
                </span>
                <p className="text-center text-4xl font-bold text-indigo-500 dark:text-blue-500">soat</p>
              </div>
            </div>
          </div>
        </div>
        <TTJgaTashrifCom />
      </div>
    </div>
  );
}

export default TTJgaTashrifTutor;
