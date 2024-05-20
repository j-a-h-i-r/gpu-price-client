import { Button, Col, Input, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import 'chart.js/auto';
import Link from 'next/link';
import { Chart } from "react-chartjs-2";

export function GpuDetail(props: any) {
    const {
        gpu, prices, chartData, chartOptions, onTimeframeChange,
        dedupedPrices, columns, onClickEmailSubscription,
        emailInput, setEmailInput, showAuthCode,
        codeInput, setCodeInput, onClickCodeSubscription
    } = props;
    return <div className='container mx-auto'>
        <Link href="/gpus" className='bg-blue-100 p-4'> Back </Link>
        <h2>{gpu?.name}</h2>
        <Row gutter={32} justify={"space-between"}>
            <Col>
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
            </Col>
            <Col>
                <Title level={3}>Manage Notification</Title>
                <Input placeholder="Enter email" value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}/>
                <Button
                    type="primary"
                    onClick={onClickEmailSubscription}
                >
                    Check
                </Button>

                {showAuthCode &&
                <div>
                    <Input placeholder="Enter auth code" value={codeInput}
                        onChange={e => setCodeInput(e.target.value)}
                    />
                    <Button type="primary" onClick={onClickCodeSubscription}>Submit Code</Button>
                </div>
                }
            </Col>
        </Row>
        
        <Table dataSource={dedupedPrices} columns={columns}/>

        <Chart type='line' options={chartOptions} data={chartData}/>
    </div>
}