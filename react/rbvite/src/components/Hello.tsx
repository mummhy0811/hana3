import { PropsWithChildren } from "react";
import { useCounter } from "../contexts/counter-context";
import { useSession } from "../contexts/session-context";

type Props = {
  age: number;
  plusCount: () => void;
};

export const Hello = ({ children }: PropsWithChildren<Props>) => {
  const { count: age, plusCount } = useCounter();
  const { session } = useSession();

  return (
    <div style={{ border: "1px solid green" }}>
      <h3>
        Hello, {session.loginUser?.name || "Guest"} ({age})
      </h3>
      <button onClick={plusCount}>Plus Age</button>
      <div>{children}</div>
    </div>
  );
};
