import { useState, useEffect } from "react";

const LoadingText = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => (count + 1) % 4);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let loadingStr = "loading";
  for (let i = 0; i < count; i++) {
    loadingStr += ".";
  }

  return <p>{loadingStr}</p>;
};

export default LoadingText;
