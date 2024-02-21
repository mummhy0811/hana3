import { FormEvent, useRef } from "react";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { useSession } from "../contexts/session-context";

export const My = () => {
  const { session, removeItem, addCartItem } = useSession();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const addCart = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //submit을 무력화

    if (!nameRef.current?.value) {
      alert("상품 이름을 입력하세요");
      nameRef.current?.focus();
      return;
    }

    if (!priceRef.current?.value) {
      alert("상품 가격을 입력하세요");
      priceRef.current?.focus();
      return;
    }
    const price = priceRef.current.value;
    const name = nameRef.current.value;
    addCartItem(name, +price);
    nameRef.current.value = "";
    priceRef.current.value = "";
  };

  return (
    <div
      style={{ border: "2px solid red", marginBottom: "2rem", padding: "1rem" }}
    >
      {session.loginUser ? <Profile /> : <Login/>}

      <form onSubmit={addCart}>
        <div>
          item name:
          <input type="text" ref={nameRef} />
        </div>
        <div>
          item price:
          <input type="number" ref={priceRef} />
        </div>
        <button type="submit">add item</button>
      </form>

      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id}>
            <small>{id}.</small>
            {name} ({price.toLocaleString()}원)
            <button onClick={() => removeItem(id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
