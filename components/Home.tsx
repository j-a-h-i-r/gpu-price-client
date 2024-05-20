import { Button, Card, Col, Row, Statistic } from "antd";
import Link from "next/link";

export function Home(props: any) {
    const { gpuCount, modelCount } = props;
    return <Row gutter={32} justify={"center"}>
        <Col>
            <Card bordered={true}>
                <Statistic title="Total GPUs" value={gpuCount}/>
                <Button type={"primary"}>
                    <Link href={"/gpus"}>View All</Link>
                </Button>
            </Card>
        </Col>
        <Col>
            <Card>
                <Statistic title="Total Models" value={modelCount}/>
                <Button type={"primary"}>
                    <Link href={"/models"}>View All</Link>
                </Button>
            </Card>
        </Col>
    </Row>
}
