import { PropsWithChildren } from "react";
import { useCounter } from "../contexts/counter-context";
import { useSession } from "../contexts/session-context";

const Hello = ({ children }: PropsWithChildren<{}>) => {
  const { count: age, plusCount, minusCount } = useCounter();
  const { session } = useSession();
  const name = session.loginUser?.name || 'Guest';

  return (
    <div style={{ border: '1px solid green' }}>
      <h3>
        Hello, {name} ({age})
      </h3>
      <button onClick={plusCount}>Plus Age</button>
      <button onClick={()=>minusCount(10)}>Minus Age</button>
      <div>{children}</div>
    </div>
  );
};

export default Hello;