import React, { useEffect, useState } from "react";
import TopshiriqlarKorishTable from "../../../../components/TopshiriqlarKorishTable";
import APISuperadminSoxaOid from "../../../../services/superadminSoxaOidTopKorish";

const SoxagaOidTopshiriq = () => {
    const [data, setData] = useState([]);

    const onGetDataTime = async (page) => {
        if (page) {
            try {
                const res = await APISuperadminSoxaOid.getByPage(page);
                if (res) {
                    const numberOfData = Math.ceil(res?.data.count / 12);
                    let newData = { ...res?.data, numberOfData };
                    setData(newData);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await APISuperadminSoxaOid.get();
                if (res) {
                    const numberOfData = Math.ceil(res?.data.count / 12);
                    let newData = { ...res?.data, numberOfData };
                    setData(newData);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleDel = async (id) => {
        try {
            await APISuperadminSoxaOid.del(id);
            onGetDataTime();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        onGetDataTime();
    }, []);

    return data?.count ? (
        <TopshiriqlarKorishTable
            data={data}
            handleDel={handleDel}
            handleGet={onGetDataTime}
        />
    ) : (
        <div className="text-center py-4 text-[red] font-medium">Ma'lumot Kiritilmagan!</div>
    );
};

export default SoxagaOidTopshiriq;
