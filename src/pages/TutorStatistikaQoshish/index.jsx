import React, { useState } from "react";
import SelectMultiple from "../../components/SelectMultiple";

const TutorStatistikaQoshish = () => {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState({});
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [studentName, setStudentName] = useState("");
  const [gender, setGender] = useState("o'g'il");
  const [orphanStatus, setOrphanStatus] = useState("oddiy");
  const [studyType, setStudyType] = useState("kontrakt");

  const addGroup = () => {
    if (groupName.trim() !== "") {
      setGroups([...groups, groupName]);
      setStudents({ ...students, [groupName]: [] });
      setGroupName("");
    }
  };

  const addStudent = () => {
    if (selectedGroup && studentName.trim() !== "") {
      const newStudent = {
        name: studentName,
        gender,
        orphanStatus,
        studyType,
      };
      setStudents({
        ...students,
        [selectedGroup]: [...students[selectedGroup], newStudent],
      });
      setStudentName("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Guruh va Talabalar
      </h2>

      {/* Guruh qo'shish */}
      <div className="mb-4">
        <SelectMultiple />
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Yangi guruh nomi"
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
        <button
          onClick={addGroup}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Guruh qo'shish
        </button>
      </div>

      {/* Guruhni tanlash */}
      <div className="mb-4">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="">Guruhni tanlang</option>
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {/* Talaba qo'shish */}
      {selectedGroup && (
        <div className="mb-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Talaba ismi"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md focus:outline-blue-500"
          >
            <option value="o'g'il">O'g'il</option>
            <option value="qiz">Qiz</option>
          </select>

          <select
            value={orphanStatus}
            onChange={(e) => setOrphanStatus(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md focus:outline-blue-500"
          >
            <option value="oddiy">Oddiy</option>
            <option value="chinyetim">Chinyetim</option>
          </select>

          <select
            value={studyType}
            onChange={(e) => setStudyType(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md focus:outline-blue-500"
          >
            <option value="kontrakt">Kontrakt</option>
            <option value="grant">Grant</option>
          </select>

          <button
            onClick={addStudent}
            className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Talaba qo'shish
          </button>
        </div>
      )}

      {/* Qo'shilgan talabalar ro'yxati */}
      {selectedGroup && students[selectedGroup]?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">
            {selectedGroup} dagi talabalar:
          </h3>
          <ul className="list-disc list-inside">
            {students[selectedGroup].map((student, index) => (
              <li key={index} className="text-gray-700">
                {student.name} - {student.gender} - {student.orphanStatus} -{" "}
                {student.studyType}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TutorStatistikaQoshish;
