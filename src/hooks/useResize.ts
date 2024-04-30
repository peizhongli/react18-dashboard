import { useEffect } from "react";

const useResize = (cb: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", cb);
    return () => {
      window.removeEventListener("resize", cb);
    };
  });
};

export default useResize;
