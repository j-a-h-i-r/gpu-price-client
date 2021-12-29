import Link from "next/link"

export function GpuList({gpus = []}) {
    return <div>
        {gpus.map((gpu) => {
            return <div key={gpu?.id}>
                <Link href={`gpus/${gpu?.id}`}>{gpu?.name}</Link>
                <h2>{gpu?.name}</h2>
            </div>
        })}
    </div>
}