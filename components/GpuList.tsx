import Link from "next/link"

export function GpuList({gpus = []}) {
    return <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Website</th>
            </tr>
            {gpus.map((gpu: any) => {
                return <tr key={gpu?.id}>
                    <td>
                        <Link href={`gpus/${gpu?.id}`}>{gpu?.name}</Link>
                    </td>
                    <td> {gpu?.website} </td>
                </tr>
            })}
        </table>
    </div>
}