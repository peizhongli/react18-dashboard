import { MutableRefObject, useEffect, useRef } from "react";
import ClipBox from "@components/ClipBox";
import top1Icon from "@assets/images/top1.png";
import top2Icon from "@assets/images/top2.png";
import top3Icon from "@assets/images/top3.png";
import useECharts from "@hooks/useECharts";
import styles from "./index.module.less";

interface Question {
  keyword: string;
  count: number;
}

const COMMON_RICH = {
  width: 15,
  height: 20,
};
export interface Top10BarChartProps {
  data: Question[];
}
const Top10BarChart = (props: { data: Question[] }) => {
  const { init } = useECharts();

  const barChartRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    initChart();
  }, [props.data]);

  const initChart = () => {
    const data = props.data.reverse();
    const allCount = data.map((i) => i.count);
    const allKeywords = data.map((i) => i.keyword.slice(0, 16));
    init(barChartRef.current as HTMLElement, {
      grid: {
        x2: 40,
        x: 100,
        y: 0,
        y2: 0,
      },
      xAxis: {
        show: false,
      },
      yAxis: [
        {
          position: "left",
          offset: 65,
          axisTick: "none",
          axisLine: "none",
          axisLabel: {
            color: "#fff",
            align: "center",
            fontSize: 14,
            rich: {
              a: {
                backgroundColor: {
                  image: top1Icon,
                  repeat: "no-repeat",
                },
                ...COMMON_RICH,
              },
              b: {
                backgroundColor: {
                  image: top2Icon,
                  repeat: "no-repeat",
                },
                ...COMMON_RICH,
              },
              c: {
                backgroundColor: {
                  image: top3Icon,
                  repeat: "no-repeat",
                },
                ...COMMON_RICH,
              },
              d: {
                width: 100,
                color: "#fff",
                fontSize: 14,
              },
            },
            formatter: function (_: number, index: number) {
              switch (index) {
                case 9:
                  return `{a|}`;
                case 8:
                  return `{b|}`;
                case 7:
                  return `{c|}`;
                default:
                  return `{d|${10 - index}}`;
              }
            },
          },
          data: allKeywords,
        },
        {
          position: "left",
          offset: 50,
          axisTick: "none",
          axisLine: "none",
          axisLabel: {
            overflow: "truncate",
            color: "#fff",
            fontSize: 14,
            align: "left",

            formatter: function (value: string) {
              return `${value}`;
            },
          },
          data: allKeywords,
        },
        {
          position: "right",
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#00ECFF",
            fontSize: 14,
          },
          axisTick: "none",
          data: allCount,
        },
      ],
      series: [
        {
          name: "进度",
          type: "bar",
          barWidth: 6,
          barCategoryGap: 0,
          itemStyle: {
            borderRadius: 5,
            fontSize: 14,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#FFB739", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#aaE0FF", // 100% 处的颜色
                },
              ],
            },
          },
          showBackground: true,
          backgroundStyle: {
            color: "#2B62C144",
            borderRadius: 5,
          },
          data: allCount,
        },
      ],
    });
  };

  return (
    <ClipBox direction="right" title="热点问题">
      <div ref={barChartRef} className={styles.chartWrap}></div>
    </ClipBox>
  );
};

export default Top10BarChart;
