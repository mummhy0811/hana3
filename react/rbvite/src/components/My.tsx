import { FormEvent, useRef } from "react";
import { Cart, Session } from "../App";
import { Login } from "./Login";
import { Profile } from "./Profile";

type Props = {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  removeItem: (id: number) => void;
  addCartItem:(name:string, price:number)=>void;
};

export const My = ({
  session: { loginUser, cart },
  login,
  logout,
  removeItem,
  addCartItem,
}: Props) => {
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
    nameRef.current.value='';
    priceRef.current.value='';
  };

  return (
    <div style={{ border: "2px solid red", marginBottom: "2rem", padding: "1rem" }}>

      {loginUser ? (
        <Profile loginUser={loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      
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
        {cart.map(({ id, name, price }: Cart) => (
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
