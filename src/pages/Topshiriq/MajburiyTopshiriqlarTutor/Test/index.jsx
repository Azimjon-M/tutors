import React, { useState, useEffect } from "react";

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
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME * 60); // Vaqtni sekundga o'tkazish

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
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
    setIsFinished(true);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setTimeLeft(TOTAL_TIME * 60);
  };

  const correctAnswersCount = Object.keys(selectedAnswers).filter(
    (index) => selectedAnswers[index] === tests[index].correctAnswer
  ).length;

  // Vaqtni minut:sekund formatiga o'tkazish
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="p-4 max-w-lg mx-auto">
      {!isFinished ? (
        <>
          {/* ⏳ Timer */}
          <div className="text-center text-lg font-bold mb-4">
            ⏳ Qolgan vaqt:{" "}
            <span className="text-red-500">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>

          <h2 className="text-xl font-bold mb-4">
            {currentIndex + 1}.
            {tests[currentIndex].question}
          </h2>
          <ul>
            {tests[currentIndex].options.map((option) => (
              <li
                key={option}
                className={`p-2 border rounded-lg mb-2 cursor-pointer ${
                  selectedAnswers[currentIndex] === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <div className="flex justify-between my-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Oldingi
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
              onClick={handleNext}
              disabled={currentIndex === tests.length - 1}
            >
              Keyingi
            </button>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg w-full"
            onClick={handleFinish}
          >
            Yakunlash
          </button>
          <div className="flex justify-center flex-wrap mt-4 gap-2">
            {tests.map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer border-2 ${
                  selectedAnswers[index]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Test natijasi</h2>
          <p className="text-lg">
            Siz {tests.length} ta testdan {correctAnswersCount} tasini to‘g‘ri
            bajardingiz!
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleRestart}
          >
            Qayta boshlash
          </button>
        </div>
      )}
    </div>
  );
}

export default TestTutor;
