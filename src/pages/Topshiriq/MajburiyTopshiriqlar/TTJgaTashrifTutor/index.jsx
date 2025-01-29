import React from "react";
import TTJgaTashrifCom from "../../../components/TTJgaTashrifCom";

function TTJgaTashrifTutor() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-start bg-white rounded-md shadow-md shadow-gray-200 mt-8 p-3">
          <div
            class="flex relative w-2/4 h-6 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="flex flex-col justify-center overflow-hidden bg-blue-300 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500 w-2/4"
            ></div>
            <div class="text-center absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <span class="text-center text-base font-bold text-blue-500 dark:text-blue-500">
                5 | 22:55:50
              </span>
            </div>
          </div>
          {/* <div class="relative text-center size-28">
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
                class="stroke-current text-gray-200 dark:text-neutral-700"
                stroke-width="2"
              ></circle>

              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-blue-600 dark:text-blue-500"
                stroke-width="2"
                stroke-dasharray="100"
                stroke-dashoffset="10"
                stroke-linecap="round"
              ></circle>
            </svg>

            <div class="text-center absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <span class="text-center text-xl font-bold text-blue-600 dark:text-blue-500">
                22:55:50
              </span>
            </div>
          </div> */}
        </div>
        <TTJgaTashrifCom />
      </div>
    </div>
  );
}

export default TTJgaTashrifTutor;
