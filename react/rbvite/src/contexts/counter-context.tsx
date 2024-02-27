import { PropsWithChildren, createContext, useContext, useReducer } from "react";

type CounterContextProp = {
  count: number;
  plusCount: () => void;
  minusCount: (count?:number) => void;
};

type ReducerAction = {
  type: 'plus' | 'minus';
  payload?: number;
};


const CounterContext = createContext<CounterContextProp>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

const reducer = (count:number, {type, payload=1}:ReducerAction) =>{
  //방법1
  // if(type==='plus') return count+1;
  // if(type === 'minus') return count-payload;  

  // return count;

  switch (type) {
    case 'plus':
      return count + (payload ?? 1);
    case 'minus':
      return count - payload;
    default:
      return count;
  }

}

export const CounterProvider = ({ children }: PropsWithChildren) => {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer,0);

  // const plusCount = () => setCount((count) => count + 1);
  // const minusCount = () => setCount((count) => count - 1);
  const plusCount = () => dispatch({type: 'plus'});
  const minusCount = (payload:number=1) => dispatch({type: 'minus', payload});
  

  return (
    <CounterContext.Provider value={{ count, plusCount,minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
