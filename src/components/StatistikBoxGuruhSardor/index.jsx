import React from "react";
import { Container, BoxIndicator, Text } from "./styled";

const StatistikBoxGuruhSardor = ({ data }) => {
    return (
        <Container color={data.color} className="flex w-[240px] rounded-md overflow-hidden bg-gray-100">
            <BoxIndicator color={data.color} />
            <div className="flex justify-center items-center mx-2 p-2">
                <img className="w-[60px] h-auto" src={data.icon} alt="icon" />
            </div>
            <div className="w-full flex justify-end p-2">
                <div className="flex flex-col items-end justify-center">
                    <h1 className="text-xl">{data.last_name} {data.first_name}</h1>
                    <h2 className="text-lg">{data.group}</h2>
                    <h2 className="text-lg">{data.number}</h2>
                    {/* <Text color={data.color} className="text-2xl font-bold">
                        {data.numbers}
                        <Text color={data.color} className="text-sm">{data.unit}</Text>
                    </Text> */}
                </div>
            </div>
        </Container>
    );
};

export default StatistikBoxGuruhSardor;
