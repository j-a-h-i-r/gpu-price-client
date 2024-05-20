import { Dayjs } from "dayjs";

export async function fetchGpus() {
    return fetch("/api/gpus").then((res) => res.json());
}

export async function fetchGpuDetail(gpuId: string) {
  console.log("Fetching detail of gup with ID ", gpuId);
  return fetch(`/api/gpus/${gpuId}`).then((res) => res.json());
}

export async function fetchGpuPrices(gpuId: string, startTime: Dayjs | null = null) {
  console.log(`Fetching prices of GPU with id (${gpuId}) and timeframe (${startTime} to now)`);

  let apiPath = `/api/gpus/${gpuId}/prices`;
  if (startTime) {
    apiPath = `${apiPath}?start_date=${startTime.toDate()}`;
  }
  return fetch(apiPath).then((res) => res.json());
}

export async function fetchAllGpusWithModels() {
    return fetch("/api/models/allgpus").then((res) => res.json());
}

export interface Model {
    id: number;
    name: string;
}

export async function fetchAllModels(): Promise<Model[]> {
    return fetch("/api/models")
        .then((res) => res.json())
        .catch((err) => []);
}

export interface GpuModelEntries {
    modelid?: string;
    modelname?: string;
    gpuids: string[];
}

export async function associateGpuWithModel(gpu: GpuModelEntries, token?: string) {
    let apiUrl = `/api/models/manage?token=${token}`;
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gpu),
    })
        .then((res) => res.json());
}

export async function sendAuthCodeForGpuSubscription(gpuId: string, email: string) {
    const apiUrl = `/api/gpus/${gpuId}/subscriptions`;
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
    })
    .then((res) => res.json())
}

export async function verifyAuthCodeForGpuSubscription(gpuId: string, email: string, code: string) {
    const apiUrl = `/api/gpus/${gpuId}/subscriptions`;
    return fetch(apiUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, code})
    })
    .then((res) => res.json())
}
