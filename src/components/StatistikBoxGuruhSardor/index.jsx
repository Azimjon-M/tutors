import React from "react";
import { Container, BoxIndicator } from "./styled";

const StatistikBoxGuruhSardor = ({ data }) => {
  return (
    <Container
      color={data.color}
      className="flex w-[240px] rounded-md overflow-hidden bg-gray-100"
    >
      <BoxIndicator color={data.color} />
      <div className="w-full p-2">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl text-end">
            {data.last_name} {data.first_name}
          </h1>
          <div className="flex justify-between">
            <div className="flex justify-center items-center mx-2 p-2">
              <img className="w-[50px] h-auto" src={data.icon} alt="icon" />
            </div>
            <div className="text-end">
              <h2 className="text-lg">{data.group}</h2>
              <h2 className="text-lg">{data.number}</h2>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StatistikBoxGuruhSardor;
