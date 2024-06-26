import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GpuDetail } from "../../../components/GpuDetail";
import { ChartData } from "chart.js";
import dayjs, { Dayjs } from "dayjs";
import { fetchGpuDetail } from "../../../libs/api";
import { fetchGpuPrices } from "../../../libs/api";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

function prepareChartData(prices: Array<any>) {
  if (!(prices.length > 0)) {
    return emptyChartData;
  }

  const labels = prices.map((p) => p.updatedAt);
  const values = prices.map((p) => p.price);
  let data = {
    labels,
    datasets: [
      {
        label: 'GPU Price History',
        data: values,
      },
    ],
  };

  return data;
}

const emptyChartData: ChartData = {
  labels: [],
  datasets: [],
}

const GpuDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [gpu, setGpu] = useState({});
  const [prices, setPrices] = useState([] as any[]);
  const [chartData, setChartData] = useState(emptyChartData);
  const [startTime, setStartTime] = useState<Dayjs|null>(null);

  const dedupedPrices = prices.filter((e, i, a) => e.price != a[i-1]?.price);

  const columns = [
    {
        title: "Timestamp",
        dataIndex: "updatedAt",
        key: "id",
    },
    { title: "Price", dataIndex: "price", key: "id" },
]

  useEffect(() => {
    if (!id) return;
    fetchGpuDetail(id)
      .then((detail) => setGpu(detail));

    fetchGpuPrices(id)
      .then((priceResult) => {
        const prices = priceResult?.prices as any[] ?? [];
        setPrices(prices);
        setChartData(prepareChartData(prices));
      }
    );
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchGpuPrices(id, startTime)
      .then((priceResult) => {
        const prices = priceResult?.prices as any[] ?? [];
        setPrices(prices);
        setChartData(prepareChartData(prices));
      }
    );
  }, [id, startTime]);

  const onTimeframeChange = (timeframeCode: string) => {
    const timeframeCodeToTimestampMap: any = {
      "1M": dayjs().subtract(1, "month"),
      "3M": dayjs().subtract(3, "month"),
      "6M": dayjs().subtract(6, "month"),
      "1Y": dayjs().subtract(1, "year"),
      "MAX": null,
    }
    let startTime: Dayjs | null = null;
    if (timeframeCode in timeframeCodeToTimestampMap) {
      startTime = timeframeCodeToTimestampMap[timeframeCode] as Dayjs;
    }

    setStartTime(startTime);
  }

  return <div>
    <GpuDetail
      gpu={gpu} prices={prices} chartOptions={options} chartData={chartData}
      dedupedPrices={dedupedPrices} columns={columns}
      onTimeframeChange={onTimeframeChange}
    />
  </div>
}

export default GpuDetailPage;
