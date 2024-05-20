import { useEffect, useState } from 'react';
import { Home } from '../components/Home';
import { fetchGpus } from "../libs/api";
import { fetchAllModels } from "../libs/api";
import { Model } from "../libs/api";

export default () => {
  const [gpus, setGpus] = useState([]);
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetchGpus().then((gpus) => setGpus(gpus))

    fetchAllModels().then((models) => setModels(models));
  }, [])

  return <Home gpuCount={gpus.length} modelCount={models.length}/>
}
