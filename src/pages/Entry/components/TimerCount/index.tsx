import { CSSProperties, useMemo } from "react";
import styles from "./index.module.less";

interface CustomProperties extends CSSProperties {
  "--dh": string;
  "--dm": string;
  "--ds": string;
}

const now = new Date();
const t = {
  yyyy: now.getFullYear(),
  mm: now.getMonth() + 1,
  dd: now.getDate(),
  h: now.getHours(),
  m: now.getMinutes(),
  s: now.getSeconds(),
};

const TimerCount = () => {
  const properties: CustomProperties = useMemo(() => {
    const { s, m, h } = t;
    // 计算偏移量，比如秒为30的时候，分钟其实也走了30/60，时针同理，最后算出需要延迟的秒数
    const ds = s;
    const dm = (m + s / 60) * 60;
    const dh = (h + m / 60 + s / 60 / 60) * 60 * 60;
    return {
      "--dh": `${dh}s`,
      "--dm": `${dm}s`,
      "--ds": `${ds}s`,
    };
  }, []);

  return (
    <div style={properties}>
      <span>
        {t.yyyy}年{t.mm}月{t.dd}日{" "}
      </span>
      <span className={styles.hour}></span>
      <span className={styles.minute}></span>
      <span className={styles.second}></span>
    </div>
  );
};

export default TimerCount;
