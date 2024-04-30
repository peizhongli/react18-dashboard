import { ReactNode } from "react";
import "./index.less";

interface ClipBoxProps {
  direction?: string;
  title: string;
  customClass?: string;
  children: ReactNode;
}

const ClipBox = (props: ClipBoxProps) => {
  const { direction = "left", title, customClass = "", children } = props;
  return (
    <div className={['clipWrap', direction, customClass].join(" ")}>
      <div className='clipBg'></div>
      <div className='clipTitle'>{title}</div>
      <div className='clipContent'>{children}</div>
    </div>
  );
};

export default ClipBox;
