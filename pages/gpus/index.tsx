import { NextPage } from "next";
import { useEffect, useState } from "react";
import { GpuList } from "../../components/GpuList";
import Link from "next/link";

async function fetchGpus() {
    return fetch("/api/gpus").then((res) => res.json());
}

const GpuListPage: NextPage = () => {
    const [gpus, setGpus] = useState([]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "id",
            render: (text: string, record: any) => <Link href={`gpus/${record.id}`}>{text}</Link>,
            sorter: (a: any, b: any) => a.name < b.name? -1 : 1,
        },
        { title: "Website", dataIndex: "website", key: "id" },
    ]

    useEffect(() => {
        fetchGpus().then((gpus) => setGpus(gpus));
    }, []);

    console.log("gpus", gpus);

    return (
        <div>
            <GpuList gpus={gpus} columns={columns} />
        </div>
    )
}

export default GpuListPage;
