import React, { useState } from "react";

const Test = () => {
  const [questionsInput, setQuestionsInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiritilgan matnni qatorlarga ajratish
    const lines = questionsInput.split("\n").filter((line) => line.trim() !== "");

    // Har bir qatorni savol, variantlar va to'g'ri javobga ajratish
    const newQuestions = lines.map((line) => {
      const [question, optionsPart, correctAnswer] = line.split("|").map((part) => part.trim());
      const options = optionsPart.split(",").map((option) => option.trim());
      return { question, options, correctAnswer };
    });

    // Backendga savollarni yuborish
    try {
      const response = await fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestions),
      });
      if (response.ok) {
        alert("Savollar muvaffaqiyatli qo'shildi!");
        setQuestionsInput("");
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Paneli</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Savollar va Variantlarni Kiriting (format: Savol | Variant1, Variant2, Variant3, Variant4 | To'g'ri Javob):</label>
          <textarea
            value={questionsInput}
            onChange={(e) => setQuestionsInput(e.target.value)}
            rows={10}
            required
          />
        </div>
        <button type="submit">Savollarni Qo'shish</button>
      </form>
    </div>
  );
};

export default Test;