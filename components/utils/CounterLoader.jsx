import { useEffect, useState } from 'react';

const CounterLoader = () => {
  const [count, setCount] = useState(0);

  const increment = (inc) => (inc >= 0 && inc < 5 ? inc + 0.5 : 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((counter) => increment(counter));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <h1>{count.toFixed(1)}</h1>;
};

export default CounterLoader;
