import React, { useState, useEffect } from "react";
import laptopGirl from "../../../../assets/fon/laptop-girl.png";
import TutorModalFormTTJIjara from "../../../../components/TutorModalFormTTJIjara";
import APIMajburiyTopshiriq from "../../../../services/majburiyTopshiriq";

function TTJgaTashrifTutor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const [tasks, setTasks] = useState([]);

  // 📌 GET - Barcha topshiriqlarni olish
  const getTasks = async () => {
    try {
      const response = await APIMajburiyTopshiriq.getActiveByTur(
        "ttjga_tashrif"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
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
          {tasks &&
            tasks.map((task) => {
              const startTime = new Date(task?.topshiriq?.boshlanish_vaqti);
              const endTime = new Date(task?.topshiriq?.tugash_vaqti);
              const now = new Date();

              const isWithinTimeRange = now >= startTime && now <= endTime;
              return (
                <div
                  key={task.id}
                  className="collapse collapse-arrow rounded-md bg-white"
                >
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title md:text-xl font-medium">
                    <div className="flex items-center justify-between">
                      <h4 className="text-gray-600 line-clamp-1">
                        {task?.topshiriq?.boshlanish_vaqti} -{" "}
                        {task?.topshiriq?.tugash_vaqti}
                      </h4>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleOpenModal(task)}
                          className={`w-full z-10 font-semibold rounded-md px-2 py-1 text-white ${
                            isWithinTimeRange
                              ? "bg-indigo-500 hover:bg-indigo-600"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!isWithinTimeRange}
                        >
                          Yuklash
                        </button>
                        <p className="w-7 h-7 rounded-md text-center leading-7 bg-emerald-200 text-emerald-600">
                          {task?.baxo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-content">
                    {task?.title ? (
                      <div className="bg-slate-100 rounded-md p-3">
                        <div className="px-5 pt-5">
                          <h1 className="text-xl md:text-2xl font-semibold text-slate-600 text-center">
                            {task?.title}
                          </h1>
                        </div>
                        <div className="grid md:grid-cols-2 items-center gap-5 mt-5 px-5">
                          <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                            <img
                              src={task?.file1}
                              alt="university events"
                              className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                            />
                          </div>
                          <div className="flex justify-center items-center border p-3 border-slate-300 rounded-md bg-slate-200">
                            <img
                              src={task?.file2}
                              alt="university events"
                              className="h-52 md:h-72 object-cover rounded-md shadow-2xl"
                            />
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="md:text-xl text-slate-600">
                            {task?.body}
                          </p>
                        </div>
                        <div
                          className={`flex items-center pl-5 ${
                            task?.file3 ? "" : "hidden"
                          }`}
                        >
                          <a
                            className="inline-flex items-center gap-x-1 text-sm md:text-base text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                            href={task?.file3}
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
                    ) : (
                      <div className="text-center italic text-red-500">
                        Yuklamagansiz!
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Modal form for uploading tasks */}
        <TutorModalFormTTJIjara
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={selectedTask}
          // roleUser={"admin"}
        />
      </div>
    </div>
  );
}

export default TTJgaTashrifTutor;
