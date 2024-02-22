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
      minusCount();
    };
  }, [plusCount, minusCount]);

  useTimeout(() => console.log("X=", count), 1000);

  const [isShow, toggle] = useToggle();

  return (
    <>
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
