import {
  FormEvent,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useCounter } from "../contexts/counter-context";
import { useSession } from "../contexts/session-context";
import { useTimeout } from "../hooks/timeout";
import { useToggle } from "../hooks/toggle";

export type LoginHandler = {
  noti: (msg: string) => void;
  focusId: () => void;
  focusName: () => void;
};

export const Login = forwardRef((_, ref: ForwardedRef<LoginHandler>) => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const { count, plusCount, minusCount } = useCounter();
  const { login } = useSession();

  const handler = {
    noti: (msg: string) => alert(msg),
    focusId: () => idRef.current?.focus(),
    focusName: () => nameRef.current?.focus(),
  };

  useImperativeHandle(ref, () => handler);

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // submit 기본 기능을 무력화!

    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value;
    login(id, name ?? "");
  };

  useEffect(() => {
    plusCount();

    return () => {
      minusCount(10);
    };
  }, [plusCount, minusCount]);
  const [isShow, toggle] = useToggle();

  const { reset, clear } = useTimeout(()=>console.log(isShow), 1000,[isShow]);
  reset();
  useTimeout(clear, 500);



  return (
    <>
      <button onClick={reset}>reset</button>
      <button onClick={clear}>clear</button>
      <button
        onClick={toggle}
        style={{ border: `1px solid ${isShow ? "blue" : "yellow"}` }}
      >
        {isShow ? "HIDE" : "SHOW"}
      </button>
      <form onSubmit={makeLogin}>
        <div>
          <span style={{ marginRight: "1em" }}>{count}-LoginID:</span>
          <input type="number" ref={idRef} />
        </div>
        <div>
          LoginName:
          <input type="text" ref={nameRef} />
        </div>
        <button type="submit">Sign-in</button>
      </form>
    </>
  );
});
Login.displayName = "Login";
