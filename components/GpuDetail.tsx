import { Table } from 'antd';
import 'chart.js/auto';
import Link from 'next/link';
import { Chart } from "react-chartjs-2";

export function GpuDetail(props: any) {
    const {
        gpu, prices, chartData, chartOptions, onTimeframeChange,
        dedupedPrices, columns
    } = props;
    return <div className='container mx-auto'>
        <Link href="/gpus" className='bg-blue-100 p-4'> Back </Link>
        <h2>{gpu?.name}</h2>
        <p> Availability: {prices?.isAvailable? 'Available': 'Not Available'} </p>
        <p> Website: {gpu.website} </p>

        <p>Total price points: {prices.length}</p>

        <div>
            <p>Select timframe</p>
            <div style={{display: "flex", gap: "12px", cursor: "pointer"}}>
                <p onClick={() => onTimeframeChange("1M")}>1M</p>
                <p onClick={() => onTimeframeChange("3M")}>3M</p>
                <p onClick={() => onTimeframeChange("6M")}>6M</p>
                <p onClick={() => onTimeframeChange("1Y")}>1Y</p>
                <p onClick={() => onTimeframeChange("MAX")}>MAX</p>
            </div>
        </div>
        
        <Table dataSource={dedupedPrices} columns={columns}/>

        <Chart type='line' options={chartOptions} data={chartData}/>
    </div>
}