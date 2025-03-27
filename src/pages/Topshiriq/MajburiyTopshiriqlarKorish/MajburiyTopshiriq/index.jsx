import React, { useEffect, useState } from "react";
import TopshiriqlarKorishTable from "../../../../components/TopshiriqlarKorishTable";
import APISuperadminMajTop from "../../../../services/superadminMajTop.js";

const MajburiyTopshiriq = () => {
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const res = await APISuperadminMajTop.get();
            if (res) {
                setData(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDel = async (id) => {
        try {
            await APISuperadminMajTop.del(id);
            getData();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return <TopshiriqlarKorishTable data={data} handleDel={handleDel} />;
};

export default MajburiyTopshiriq;
