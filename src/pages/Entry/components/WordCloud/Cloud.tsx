import { useEffect, useRef, MutableRefObject } from "react";
import styles from "./index.module.less";

export interface Word {
  keyword: string;
  count: number;
}

const colors = [
  "rgba(0,236,255,0.8)",
  "#00ECFF",
  "rgba(0,236,255,0.9)",
  "#00ECFF",
  "#00ECFF",
  "rgba(255,255,255,0.9)",
  "#fff",
  "#fff",
  "#fff",
  "rgba(255,255,255,0.8)",
];

const RADIUS = 120; // 3d球的半径
const FALL_LENGTH = 320;
const ANGLE = Math.PI / 500;

class Tag {
  el: HTMLElement;
  x: number;
  y: number;
  z: number;
  CX: number;
  CY: number;

  constructor(options: {
    el: HTMLElement;
    x: number;
    y: number;
    z: number;
    CX: number;
    CY: number;
  }) {
    const { el, x, y, z, CX, CY } = options;
    this.el = el;
    this.x = x;
    this.y = y;
    this.z = z;
    this.CX = CX;
    this.CY = CY;
  }
  move() {
    const scale = FALL_LENGTH / (FALL_LENGTH - this.z);
    const alpha = (this.z + RADIUS) / (2 * RADIUS);
    const left = this.x + this.CX - this.el.offsetWidth / 2 + 40 + "px"; // 水平偏移
    const top = this.y + this.CY - this.el.offsetHeight / 2 + 10 + "px"; // 竖直偏移
    this.el.style.opacity = `${alpha}`;
    this.el.style.zIndex = `${parseInt(`${scale * 100}`)}`;
    this.el.style.transform = `translate(${left},${top}) scale(${scale})`;
  }
}

const Cloud = (props: { data: Word[] }) => {
  const tagList: MutableRefObject<Tag[]> = useRef([]);
  const wrapRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const tagsRefs: MutableRefObject<HTMLParagraphElement[]> = useRef([]);
  const frame: MutableRefObject<number> = useRef(0);

  const init = () => {
    const tagsLen = tagsRefs.current.length;
    const minCount = Math.min(...props.data.map((i) => i.count));
    const CX = (wrapRef.current as HTMLElement).offsetWidth / 2;
    const CY = (wrapRef.current as HTMLElement).offsetHeight / 2;

    tagsRefs.current.forEach((i, index) => {
      const fontScale = (props.data[index].count / minCount) * 16;
      i.style.fontSize = `${Math.min(fontScale, 30)}px`;
      i.style.color = colors[parseInt(`${Math.random() * 10}`)];

      const k = -1 + (2 * (index + 1) - 1) / tagsLen;
      const a = Math.acos(k);
      const b = a * Math.sqrt(tagsLen * Math.PI);
      const x = RADIUS * 1.15 * Math.sin(a) * Math.cos(b);
      const y = RADIUS * Math.sin(a) * Math.sin(b);
      const z = RADIUS * Math.cos(a);
      tagList.current.push(new Tag({ el: i, x, y, z, CX, CY }));
    });
    animate();
  };

  const rotateX = () => {
    const cos = Math.cos(ANGLE);
    const sin = Math.sin(ANGLE);
    tagList.current.forEach((i) => {
      i.x = i.x * cos - i.z * sin;
      i.y = i.y * cos - i.z * sin;
      i.z = i.z * cos + i.y * sin;
    });
  };

  const rotateY = () => {
    const cos = Math.cos(ANGLE);
    const sin = Math.sin(ANGLE);
    tagList.current.forEach((i) => {
      i.x = i.x * cos - i.z * sin;
      i.z = i.z * cos + i.x * sin;
    });
  };

  const animate = () => {
    rotateX();
    rotateY();
    tagList.current.forEach((i) => i.move());
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [props.data]);

  return (
    <div className={styles.tagWrap} ref={wrapRef}>
      {props.data.map((i, index) => (
        <p
          className={styles.tagItem}
          ref={(el: HTMLParagraphElement) => (tagsRefs.current[index] = el)}
          key={index}
        >
          <span className={styles.tagName}>{i.keyword}</span>
          <span className={styles.tagValue}>{i.count}</span>
        </p>
      ))}
    </div>
  );
};

export default Cloud;
