import React from "react";
import BahoTable from "../../../components/BahoTable";
import { data } from "../../../mock";

const BahoOzTashabbusi = () => {
    return <BahoTable data={data} totalPages={10} taskDate={`2025-02-03`} />;
};

export default BahoOzTashabbusi;
