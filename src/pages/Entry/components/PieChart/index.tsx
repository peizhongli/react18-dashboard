import { MutableRefObject, useEffect, useRef } from "react";
import ClipBox from "@components/ClipBox";
import { ZRColor } from "echarts/types/dist/shared.js";
import useECharts from "@hooks/useECharts";
import styles from "./index.module.less";

interface Platform {
  name: string;
  count: number;
  solveRate: number;
  satisfactionRate: number;
}
export interface PieChartProps {
  data: Platform[];
}
const PieChart = (props: { data: Platform[] }) => {
  const { init } = useECharts();

  const pieChartRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    initChart();
  }, [props.data]);

  const initChart = () => {
    const data = props.data.map((i) => ({ name: i.name, value: i.count }));
    const allPlatform = data.map((i) => i.name);
    init(pieChartRef.current as HTMLElement, {
      color: [
        ["#5EC0EF", "#1B76C4"],
        ["#56D09D", "#1A9062"],
        ["#BB8AF1", "#7232E1"],
        ["#E1F18A", "#DCE132"],
      ].map(
        ([startColor, endColor]): ZRColor => ({
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: startColor, // 0% 处的颜色
            },
            {
              offset: 1,
              color: endColor, // 100% 处的颜色
            },
          ],
        })
      ),
      legend: {
        type: "plain",
        orient: "vertical",
        x: "center",
        y: "center",
        icon: "rect",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "#fff",
          fontSize: 14,
        },
        data: allPlatform,
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: [84, 109],
          legendHoverLink: false,
          label: {
            formatter: `{b|{b}}\n占比: {d|{d}%}`,
            fontSize: 14,
            color: "#fff",
            rich: {
              b: {
                color: "#fff",
                align: "center",
                lineHeight: 22,
                fontSize: 14,
              },
              d: {
                color: "#00ECFF",
                fontSize: 14,
              },
            },
          },
          labelLine: {
            lineStyle: {
              color: "#00ECFF",
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter: `{b|{b}}\n占比: {d|{d}%}`,
              fontWeight: "bold",
              color: "#fff",
              rich: {
                b: {
                  color: "#fff",
                  align: "center",
                  lineHeight: 22,
                  fontWeight: "bold",
                },
                d: {
                  color: "#00ECFF",
                  fontWeight: "bold",
                },
              },
            },
          },
          data,
        },
        {
          name: "图例背景",
          type: "pie",
          selectedMode: "single",
          hoverAnimation: false,
          radius: [0, 71],
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [{ value: 1, name: "" }],
          itemStyle: {
            color: "rgba(43,98,193,0.27)",
          },
        },
      ],
    });
  };

  return (
    <ClipBox customClass={styles.wrap} title="业务量渠道占比及质量数据">
      <div ref={pieChartRef} className={styles.chartWrap}></div>
      <ul>
        {props.data.map((i, index) => (
          <li key={index}>
            <p className={styles.subtitle}>{i.name}</p>
            <div className={styles.channelBox}>
              <p data-des="解决率">{i.solveRate}%</p>
              <p data-des="满意率">{i.satisfactionRate}%</p>
            </div>
          </li>
        ))}
      </ul>
    </ClipBox>
  );
};

export default PieChart;
