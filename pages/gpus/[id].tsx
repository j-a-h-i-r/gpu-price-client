import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GpuDetail } from "../../components/GpuDetail";
import { ChartData } from "chart.js";
import dayjs, { Dayjs } from "dayjs";

async function fetchGpuDetail(gpuId: string) {
  console.log("Fetching detail of gup with ID ", gpuId);
  return fetch(`/api/gpus/${gpuId}`).then((res) => res.json());
}

async function fetchGpuPrices(gpuId: string, startTime: Dayjs | null = null) {
  console.log(`Fetching prices of GPU with id (${gpuId}) and timeframe (${startTime} to now)`);
  
  let apiPath = `/api/gpus/${gpuId}/prices`;
  if (startTime) {
    apiPath = `${apiPath}?start_date=${startTime.toDate()}`;
  }
  return fetch(apiPath).then((res) => res.json());
}

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
  }, [startTime]);

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
      onTimeframeChange={onTimeframeChange}
    />
  </div>
}

export default GpuDetailPage;
