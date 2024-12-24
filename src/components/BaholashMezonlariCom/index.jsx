import React from "react";

const BaholashMezonlariCom = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 dark:text-white text-center my-5">
        Baholash mezonlari
      </h1>
      <div className="max-w-7xl px-5 mx-auto">
        {/* MEZONLAR */}
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>№</th>
              <th>Mezon tafsiloti</th>
              <th className="text-nowrap">Maksimal ball</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                ipsa quo sunt eius nulla nobis a molestiae provident saepe.
                Deleniti hic voluptate fugiat quaerat fuga magni quis sequi nisi
                impedit. Quam facilis, minus ut expedita consequuntur cumque
                obcaecati! Deleniti itaque nisi dolor beatae, cumque incidunt,
                ullam exercitationem repellendus magni maxime magnam cupiditate
                inventore veritatis praesentium, sint quae earum fuga optio.
              </td>
              <td className="text-center">10</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                ipsa quo sunt eius nulla nobis a molestiae provident saepe.
                Deleniti hic voluptate fugiat quaerat fuga magni quis sequi nisi
                impedit.
              </td>
              <td className="text-center">6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BaholashMezonlariCom;
