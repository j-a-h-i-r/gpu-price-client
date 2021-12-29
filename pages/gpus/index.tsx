import { NextPage } from "next";
import { useEffect, useState } from "react";
import { GpuList } from "../../components/GpuList";

async function fetchGpus() {
    return fetch("/api/gpus").then((res) => res.json());
}

const GpuListPage: NextPage = () => {
    const [gpus, setGpus] = useState([]);

    useEffect(() => {
        fetchGpus().then((gpus) => setGpus(gpus));
    }, []);

    console.log("gpus", gpus);

    return (
        <div>
            <GpuList gpus={gpus} />
        </div>
    )
}

export default GpuListPage;
