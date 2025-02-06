import React from "react";

// Modal komponentini import qilish
const TestResultModal = ({ onClose, correctAnswersCount, totalQuestions }) => {
  // Test natijasini foizga aylantirish
  const percentage = (correctAnswersCount / totalQuestions) * 100;

  // Natijaga qarab emoji tanlash
  const emoji = percentage >= 60 ? "🤩" : "😯";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
        <div className="relative mb-4 text-6xl text-center">
          {/* Emoji chiqishi (katta) */}
          {emoji}
          <div className="absolute top-0 left-0 w-full h-full rounded-lg"></div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Sizning natijangiz!
        </h2>
        <p className="text-lg text-center">
          Siz {totalQuestions} ta testdan {correctAnswersCount} tasini to‘g‘ri
          bajardingiz!
        </p>
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
            onClick={onClose}
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResultModal;
