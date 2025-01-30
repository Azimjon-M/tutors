import React from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import rasm1 from "../../assets/fon/imagess.jpg";
import rasm2 from "../../assets/fon/university-events-two.jpg";

function TTJgaTashrifCom() {

  return (
    <div className="border border-gray-300 rounded-md shadow-md shadow-gray-200 mt-5 p-3">
      <div className="collapse collapse-arrow rounded-md bg-white mb-3">
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TTJgaTashrifCom;
