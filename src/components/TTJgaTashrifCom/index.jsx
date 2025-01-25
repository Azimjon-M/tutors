import React from "react";

function TTJgaTashrifCom() {
  // const datas = [
  //   {
  //     id: 1,
  //     title: "TTJga tashrif",
  //     date: "12.02.2025",
  //     grade: 9,
  //     image_one: "",
  //     image_two: "",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   },
  //   {
  //     id: 2,
  //     title: "TTJga tashrif",
  //     date: "12.02.2025",
  //     grade: 9,
  //     image_one: "",
  //     image_two: "",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   },
  // ];

  return (
    <div className="border border-gray-400 rounded-md shadow-md shadow-gray-200 mt-5 p-3">
      <div className="collapse collapse-arrow rounded-md bg-white">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title md:text-xl font-medium">
          <div className="flex items-center justify-between">
            <h4 className="li line-clamp-1">
              Click to open this one and close others
            </h4>
            <p className="w-7 h-7 rounded-md text-center leading-7 bg-emerald-200 text-emerald-600">7</p>
          </div>
        </div>
        <div className="collapse-content bg-slate-400">
          <div className="flex items-center justify-between mt-4">
            <p>22.02.2025</p>
            <button>PDF yuklab olish</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TTJgaTashrifCom;
