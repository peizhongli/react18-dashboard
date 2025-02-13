import { useMemo } from "react";
import ClipBox from "@components/ClipBox";
import styles from "./index.module.less";

interface RealtimeDataProps {
  data: {
    pv: number;
    uv: number;
  };
}
const RealtimeData = (props: RealtimeDataProps) => {
  const pv = useMemo(
    () => `${props.data.pv}`.padStart(7, "0").split(""),
    [props.data.pv]
  );
  const uv = useMemo(
    () => `${props.data.uv}`.padStart(7, "0").split(""),
    [props.data.uv]
  );

  return (
    <ClipBox customClass={styles.wrap} title="当前数据">
      <div data-title="PV" className={styles.realtimeContent}>
        <ul>
          {pv.map((i, index) => (
            <li key={index}>
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
      <div data-title="UV" className={styles.realtimeContent}>
        <ul>
          {uv.map((i, index) => (
            <li key={index}>
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </ClipBox>
  );
};

export default RealtimeData;
