import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ModelList } from "../../../components/ModelList";
import { TableRowSelection } from "antd/es/table/interface";
import { DefaultOptionType, OptionProps } from "antd/es/select";

interface Model {
    id: number
    name: string
}

async function fetchAllGpusWithModels() {
    return fetch("/api/models/allgpus").then((res) => res.json());
}

async function fetchAllModels(): Promise<Model[]> {
    return fetch("/api/models").then((res) => res.json());
}

interface GpuModelEntries {
    modelid?: string
    modelname?: string
    gpuids: string[]
}

async function associateGpuWithModel(gpu: GpuModelEntries) {
    return fetch("/api/models/manage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gpu),
    })
    .then((res) => res.json());
}

const GpuListPage: NextPage = () => {
    const [gpus, setGpus] = useState<any[]>([]);
    const [selectedGpus, setSelectedGpus] = useState<any[]>([]);
    const [gpuFilter, setGpuFilter] = useState("");
    const [isModelModalOpen, setIsModelModalOpen] = useState(false);
    const [modelInput, setModelInput] = useState("");
    const [models, setModels] = useState<Model[]>([]);

    const columns = [
        {
            title: "GPU Name",
            dataIndex: "gpuname",
            key: "gpuid",
            sorter: (a: any, b: any) => a.gpuname < b.gpuname? -1 : 1,
            filterSearch: (input, record) => record.gpuname.startsWith(input),
            filters: [],
            onFilter: (value: string, record: any) => record.gpuname.startsWith(value),
        },
        { title: "Model Name", dataIndex: "modelname", key: "modelid" },
    ]

    const gpuSelectionChanged = (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        console.log("selectedRowKeys", selectedRows);
        setSelectedGpus(selectedRows);
    }

    const rowSelection: TableRowSelection<any> = {
        type: "checkbox",
        onChange: gpuSelectionChanged,
    }

    useEffect(() => {
        fetchAllGpusWithModels().then((gpus) => setGpus(gpus));
    }, []);

    useEffect(() => {
        fetchAllModels().then((models) => setModels(models));
    }, [])

    /**
     * This is the filtered list that will be shown in table once
     * user starts filtering GPUs using the search filter
     */
    const filteredGpus = gpus.filter((gpu) => {
        return gpu.gpuname.toLowerCase().includes(gpuFilter);
    })

    console.log("gpus", filteredGpus);

    const onFilterChange = (searchText: string) => {
        console.log("Search Text: ", searchText);
        setGpuFilter(searchText);
    }

    const onClickModelBtn = () => {
        console.log("btn", selectedGpus);
        setIsModelModalOpen(true);
    }

    const onClickCancel = () => {
        setIsModelModalOpen(false);
    }

    const onClickOk = () => {
        const existingModelId = models.find((m) => {
            return m.name.toLowerCase() === modelInput.toLowerCase();
        })?.id;

        const gpuIds = selectedGpus.map((g) => g.gpuid);
        const reqBody: GpuModelEntries = { gpuids: gpuIds }
        
        if (existingModelId) {
            reqBody.modelid = existingModelId.toString();
        } else {
            reqBody.modelname = modelInput;
        }

        associateGpuWithModel(reqBody)
        .then((res) => {
            setIsModelModalOpen(false);
        })
    }

    const onChangeModelInput = (value: string) => {
        console.log("aaa", value);
        setModelInput(value);
    }

    const modelOptions = models.map((m) => {
        return {
            label: m.name,
            value: m.name,
        }
    })

    const modelInputFilter = (input: string, option: DefaultOptionType) => {
        const { value } = option;
        return value?.toString().toLocaleLowerCase().includes(input.toLowerCase());
    }

    const isModelSelectedFromList = models.some((m) => {
        return m.name.toLowerCase() === modelInput.toLowerCase();
    })

    return (
        <div>
            <ModelList
                gpus={filteredGpus}
                modelOptions={modelOptions}
                columns={columns}
                selectedGpus={selectedGpus}
                rowSelection={rowSelection}
                onFilterChange={onFilterChange}
                gpuFilter={gpuFilter}
                onClickModelBtn={onClickModelBtn}
                isModelModalOpen={isModelModalOpen}
                onClickCancel={onClickCancel}
                onClickOk={onClickOk}
                modelInput={modelInput}
                onChangeModelInput={onChangeModelInput}
                modelInputFilter={modelInputFilter}
                isModelSelectedFromList={isModelSelectedFromList}
            />
        </div>
    )
}

export default GpuListPage;
