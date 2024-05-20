import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GpuDetail } from "../../components/GpuDetail";
import { ChartData } from "chart.js";
import dayjs, { Dayjs } from "dayjs";
import { fetchGpuDetail, sendAuthCodeForGpuSubscription, verifyAuthCodeForGpuSubscription } from "../../libs/api";
import { fetchGpuPrices } from "../../libs/api";
import { notification } from "antd";

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
  const [emailInput, setEmailInput] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [showAuthCode, setShowAuthCode] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

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

  const emailSubscriptionClicked = () => {
    console.log("email", emailInput);
    sendAuthCodeForGpuSubscription(id, emailInput)
    .then(() => {
      setShowAuthCode(true);
    })
  }

  const codeSubscriptionClicked = () => {
    console.log("code", codeInput);
    verifyAuthCodeForGpuSubscription(id, emailInput, codeInput)
    .then(() => {
      console.log("Code verified");
      api.success({
        message: "Code verified"
      })
    })
  }

  return <div>
    <GpuDetail
      gpu={gpu} prices={prices} chartOptions={options} chartData={chartData}
      dedupedPrices={dedupedPrices} columns={columns}
      onTimeframeChange={onTimeframeChange}
      onClickEmailSubscription={emailSubscriptionClicked}
      emailInput={emailInput}
      setEmailInput={setEmailInput}
      showAuthCode={showAuthCode}
      codeInput={codeInput}
      setCodeInput={setCodeInput}
      onClickCodeSubscription={codeSubscriptionClicked}
    />
  </div>
}

export default GpuDetailPage;
