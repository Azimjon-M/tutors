import React, { useState, useEffect } from "react";
import Modal from "../../../../components/TestResultModal";

const tests = [
  {
    question: "ReactJS nimaga ishlatiladi?",
    options: ["Frontend", "Backend", "Database", "Mobile Development"],
    correctAnswer: "Frontend",
  },
  {
    question: "JavaScriptda qanday o'zgaruvchi e'lon qilinadi?",
    options: ["var", "let", "const", "function"],
    correctAnswer: "const",
  },
  {
    question:
      "CSSda sahifa fon rangini o'zgartirish uchun qaysi xususiyat ishlatiladi?",
    options: ["color", "background-color", "border", "padding"],
    correctAnswer: "background-color",
  },
  {
    question: "HTMLda eng katta sarlavha qaysi tegi bilan yoziladi?",
    options: ["<h1>", "<h6>", "<p>", "<title>"],
    correctAnswer: "<h1>",
  },
  {
    question: "JavaScriptda funksiya qanday e'lon qilinadi?",
    options: [
      "function myFunc() {}",
      "def myFunc():",
      "func myFunc() {}",
      "void myFunc() {}",
    ],
    correctAnswer: "function myFunc() {}",
  },
  {
    question:
      "Reactda qaysi hook komponent holatini boshqarish uchun ishlatiladi?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: "useState",
  },
  {
    question:
      "CSSda elementning tashqi bo'sh joyini belgilash uchun qaysi xususiyat ishlatiladi?",
    options: ["margin", "padding", "border", "outline"],
    correctAnswer: "margin",
  },
  {
    question: "HTMLda forma yaratish uchun qaysi teg ishlatiladi?",
    options: ["<form>", "<input>", "<textarea>", "<fieldset>"],
    correctAnswer: "<form>",
  },
  {
    question:
      "JavaScriptda qaysi operator tenglikni taqqoslash uchun ishlatiladi?",
    options: ["==", "===", "=", "!="],
    correctAnswer: "===",
  },
  {
    question: "Reactda komponentlar qanday qaytariladi?",
    options: ["render()", "return()", "export()", "display()"],
    correctAnswer: "return()",
  },
];

const TOTAL_TIME = 10; // ⏳ Test uchun ajratilgan vaqt (daqiqa)

function TestTutor() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME * 60); // Vaqtni sekundga o'tkazish
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal holati

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsStarted(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (currentIndex < tests.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: answer });
  };

  const handleFinish = () => {
    setIsStarted(false);
    setIsModalOpen(true); // Modalni ochirish
  };

  const handleStart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsStarted(true);
    setTimeLeft(TOTAL_TIME * 60);
  };

  const correctAnswersCount = Object.keys(selectedAnswers).reduce(
    (count, index) =>
      tests[index] && selectedAnswers[index] === tests[index].correctAnswer
        ? count + 1
        : count,
    0
  );

  const handleCloseModal = () => {
    setIsModalOpen(false); // Modalni yopish
  };

  // Vaqtni minut:sekund formatiga o'tkazish
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Dynamic color change based on width
  const widthPercentage = (timeLeft / TOTAL_TIME / 60) * 100;
  // Background color based on widthPercentage
  const backgroundColorClass =
    widthPercentage <= 20
      ? "bg-red-600"
      : widthPercentage <= 80
      ? "bg-yellow-600"
      : "bg-blue-600";

  return (
    <div className="p-4 max-w-lg lg:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto">
      {!isStarted ? (
        // <div className="text-center">
        //   <h2>Testga xush kelibsiz! Boshlash uchun tugmani bosing.</h2>
        //   <button
        //     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        //     onClick={handleStart}
        //   >
        //     Boshlash
        //   </button>
        // </div>
        <div className="h-[85vh] flex justify-center items-center font-sans">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 max-w-[500px] mx-auto">
              Kitob o‘qiganingizni sinab ko‘rish uchun testga hozirmisiz?
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              [Kitob nomi yoki mavzusi]
            </p>

            <div className="text-left mb-6">
              <p className="text-lg font-semibold text-gray-700">
                Testga kirish:
              </p>
              <ul className="list-none pl-4">
                <li className="text-md text-gray-600">
                  Test kuni: <span className="font-bold">[Test sanasi]</span>
                </li>
                <li className="text-md text-gray-600">
                  Test davomiyligi:{" "}
                  <span className="font-bold">[Test davomiyligi] minut</span>
                </li>
                <li className="text-md text-gray-600">
                  Urinishlar soni: <span className="font-bold">1ta</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <p className="text-md text-gray-600 mb-4">Testga tayyorlaning:</p>
              <ul className="pl-8 text-gray-600">
                <li>Kitobni oxirigacha o‘qib chiqing.</li>
                <li>Savollarga diqqat bilan javob bering.</li>
                <li>
                  Testni yakunlashdan oldin barcha savollarni tekshirib chiqing.
                </li>
              </ul>
            </div>

            <button
              className={`bg-blue-500 text-white py-2 px-6 rounded-full text-xl font-semibold hover:bg-blue-600 transition duration-300 ease-in-out cursor-not-allowed opacity-70`}
              onClick={handleStart}
              // disabled
            >
              Testni boshlash
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ⏳ Timer */}
          <div className="text-center text-lg font-bold mb-4">
            <span className="spinning-hourglass">⏳</span> Qolgan vaqt:{" "}
            <span className="text-red-500">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <div
              className="relative mt-4"
              style={{
                width: `${(timeLeft / TOTAL_TIME / 60) * 100}%`,
              }}
            >
              <div
                className={`h-1 ${backgroundColorClass} rounded-full transition-all duration-500`}
                style={{ width: `${widthPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="lg:grid grid-cols-3 items-start gap-3">
            <div className="col-span-2">
              <div className="border-2 mb-3 rounded-md flex justify-center items-center text-center bg-slate-300 min-h-[100px] particles-js">
                <h2 className="text-xl font-bold">
                  {currentIndex + 1}.{tests[currentIndex].question}
                </h2>
              </div>
              <ul>
                {tests[currentIndex].options.map((option) => (
                  <li
                    key={option}
                    className={`p-2 border rounded-lg mb-2 cursor-pointer transition-all duration-300 transform ${
                      selectedAnswers[currentIndex] === option
                        ? "bg-blue-500 text-white scale-[1.01]"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between my-4">
                <button
                  className={`px-4 py-2 bg-green-500 text-white rounded-lg ${
                    currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handlePrev}
                >
                  Oldingi
                </button>
                <button
                  className={`px-4 py-2 bg-green-500 text-white rounded-lg ${
                    currentIndex === tests.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleNext}
                >
                  Keyingi
                </button>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center lg:flex-col-reverse lg:ml-auto lg:max-w-[270px] gap-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                onClick={handleFinish}
              >
                Yakunlash
              </button>
              <div className="flex justify-center lg:justify-start flex-wrap mt-4 gap-3 lg:gap-4 max-w-[270px]">
                {tests.map((_, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer border-2 ${
                      currentIndex === index
                        ? `${
                            selectedAnswers[index]
                              ? "bg-green-300"
                              : "bg-green-400"
                          }`
                        : ""
                    } ${
                      selectedAnswers[index] || currentIndex === index
                        ? "bg-blue-400 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          correctAnswersCount={correctAnswersCount}
          totalQuestions={tests.length}
        />
      )}
    </div>
  );
}

export default TestTutor;
