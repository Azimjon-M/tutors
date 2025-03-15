import React, { useEffect, useState } from "react";
import TopshiriqlarKorishTable from "../../../../components/TopshiriqlarKorishTable";
import APIMajburiyTop from "../../../../services/superadminMajburiyTop.js";

const MajburiyTopshiriq = () => {
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const res = await APIMajburiyTop.get();
            if (res) {
                setData(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return <TopshiriqlarKorishTable data={data} />;
};

export default MajburiyTopshiriq;
