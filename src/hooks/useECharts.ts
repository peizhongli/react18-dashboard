import * as echarts from "echarts";
import { ECBasicOption } from "echarts/types/dist/shared.js";
import { GeoJSON } from "echarts/types/src/coord/geo/geoTypes.js";
import { useRef, useEffect } from "react";
import china from "@assets/JSON/china.json";
import useResize from "./useResize";

interface Options {
  needRegiMap?: boolean;
}

const useECharts = (options: Options = {}) => {
  const chartInstance = useRef<echarts.ECharts>();

  const init = (el: HTMLElement, opt: ECBasicOption) => {
    chartInstance.current = echarts.init(el);
    if (options.needRegiMap) {
      echarts.registerMap("china", china as GeoJSON);
    }
    chartInstance.current.setOption(opt);
  };

  const resize = () => {
    if (!chartInstance.current) {
      return;
    }
    chartInstance.current.resize();
  };

  const showLoading = () => {
    if (!chartInstance.current) {
      return;
    }
  };

  const hideLoading = () => {
    if (!chartInstance.current) {
      return;
    }
  };

  const destroy = () => {
    if (!chartInstance.current) {
      return;
    }
    chartInstance.current.dispose();
  };

  useResize(resize);

  useEffect(() => {
    return () => {
      destroy();
    };
  });

  return {
    instance: chartInstance.current,
    init,
    showLoading,
    hideLoading,
  };
};

export default useECharts;
