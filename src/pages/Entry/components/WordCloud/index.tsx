import Cloud, { Word } from "./Cloud";
import ClipBox from "@components/ClipBox";
import styles from "./index.module.less";

export interface WordCloudProps {
  data: Word[];
}
const WordCloud = (props: { data: Word[] }) => {
  return (
    <ClipBox
      customClass={styles.wrap}
      direction="right"
      title="词云"
    >
      <Cloud data={props.data} />
    </ClipBox>
  );
};

export default WordCloud;
