export function GpuDetail({gpu}) {
    return <div>
        <h2>{gpu?.name}</h2>
        <p>{gpu?.price}</p>
    </div>
}