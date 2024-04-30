import { useEffect, useState } from "react";
import MapChart, { MapChartProps } from "./components/MapChart";
import RealtimeData from "./components/RealtimeData";
import TimerCount from "./components/TimerCount";
import Top10BarChart, { Top10BarChartProps } from "./components/Top10BarChart";
import PieChart, { PieChartProps } from "./components/PieChart";
import WordCloud, { WordCloudProps } from "./components/WordCloud";
import styles from './index.module.less'

const Entry = () => {
  const [mapData, setMapData] = useState<MapChartProps["data"]>([]);
  const [pvUv, setPvUv] = useState({ pv: 0, uv: 0 });
  const [top10Questions, setTop10Questions] = useState<
    Top10BarChartProps["data"]
  >([]);
  const [hotKeywords, setHotKeywords] = useState<WordCloudProps["data"]>([]);
  const [platformRate, setPlatformRate] = useState<PieChartProps["data"]>([]);

  const getWeather = async () => {
    // const pList: Promise<MapPM25>[] = [];
    // Object.entries(
    //   cityCodeMap as {
    //     [key: string]: { city_code: string; children?: { city_code: string }[] };
    //   }
    // ).forEach(([key, val]) => {
    //   pList.push(
    //     new Promise((resolve, reject) => {
    //       $get(`/weather/${val.city_code || val.children?.[0].city_code}`)
    //         .then((r: WeatherData) => {
    //           // const forecast = r.data.forecast.slice(0, 1);
    //           resolve({ code: key, value: r.data.pm25 });
    //         })
    //         .catch((e: Error) => reject(e));
    //     })
    //   );
    // });
    // const res = await Promise.all(pList);
    setMapData([
      { code: "110000", value: 200 },
      { code: "120000", value: 210 },
      { code: "140000", value: 220 },
      { code: "150000", value: 230 },
    ]);
    console.log("res :>> ", mapData);
  };

  const getPlatform = async () => {
    setPlatformRate([
      { name: "桌面网站", count: 235, solveRate: 22.1, satisfactionRate: 33.3 },
      { name: "移动网站", count: 444, solveRate: 22.1, satisfactionRate: 33.3 },
      {
        name: "微信小程序",
        count: 555,
        solveRate: 22.1,
        satisfactionRate: 33.3,
      },
      {
        name: "微信公众号",
        count: 666,
        solveRate: 22.1,
        satisfactionRate: 33.3,
      },
    ]);
  };

  const getHotKeywords = async () => {
    setHotKeywords(
      Array.from({ length: 50 }).map((_, index) => ({
        keyword: `热词${index + 1}`,
        count: 100 - 10 * index,
      }))
    );
  };

  const getTop10Q = async () => {
    setTop10Questions(
      Array.from({ length: 10 }).map((_, index) => ({
        keyword: `问题${index + 1}`,
        count: 100 - 10 * index,
      }))
    );
  };

  const getPvUv = async () => {
    setPvUv({
      pv: 6666,
      uv: 12345,
    });
  };

  useEffect(() => {
    getWeather();
    getPlatform();
    getHotKeywords();
    getTop10Q();
    getPvUv();
  }, []);

  return (
    <>
      <section className={styles.title}>
        <div className={styles.titleContent}>机器人服务大数据</div>
        <TimerCount />
      </section>
      <section className={styles.content}>
        <section className={styles.left}>
          <RealtimeData data={pvUv} />
          <PieChart data={platformRate} />
        </section>
        <section className={styles.middle}>
          <MapChart data={mapData} />
        </section>
        <section className={styles.right}>
          <Top10BarChart data={top10Questions} />
          <WordCloud data={hotKeywords} />
        </section>
      </section>
    </>
  );
};

export default Entry;
