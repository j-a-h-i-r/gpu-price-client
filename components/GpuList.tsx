import { Table } from "antd"
import Link from "next/link"

export function GpuList(props: any) {
    const { gpus, columns} = props;
    return <div>
        <Table dataSource={gpus} columns={columns} />
    </div>
}