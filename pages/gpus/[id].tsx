import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GpuDetail } from "../../components/GpuDetail";

async function fetchGpuDetail(gpuId) {
    return fetch(`/api/gpus/${gpuId}`).then((res) => res.json());
}

const GpuDetailPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [gpu, setGpu] = useState({});

    useEffect(() => {
        fetchGpuDetail(id)
        .then((detail) => setGpu(detail));
    }, [id]);

    return <div>
        <GpuDetail gpu={gpu}/>
    </div>
}

export default GpuDetailPage;
