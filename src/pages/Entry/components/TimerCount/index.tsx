import { CSSProperties } from "react";
import styles from "./index.module.less";

interface CustomProperties extends CSSProperties {
  "--dh": number;
  "--dm": number;
  "--ds": number;
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
  const getProperties: () => CustomProperties = () => {
    const { s, m, h } = t;
    // 计算偏移量，比如秒为30的时候，分钟其实也走了30/60，时针同理，最后算出需要延迟的秒数
    const ds = s;
    const dm = (m + s / 60) * 60;
    const dh = (h + m / 60 + s / 60 / 60) * 60 * 60;
    return {
      "--dh": dh,
      "--dm": dm,
      "--ds": ds,
    };
  };

  return (
    <div style={getProperties()}>
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
