import { PropsWithChildren, createContext, useContext, useState } from "react";

type CounterContextProp = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

const CounterContext = createContext<CounterContextProp>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);

  const plusCount = () => setCount((count) => count + 1);
  const minusCount = () => setCount((count) => count - 1);
  

  return (
    <CounterContext.Provider value={{ count, plusCount,minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
