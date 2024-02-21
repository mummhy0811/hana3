import { PropsWithChildren, createContext, useContext, useState } from "react";

type LoginUser = { id: number; name: string };
type Cart = { id: number; name: string; price: number };

const SampleSession: Session = {
  // loginUser: null,
  loginUser: { id: 1, name: "Hong" },
  cart: [
    { id: 100, name: "라면", price: 3000 },
    { id: 101, name: "컵라면", price: 2000 },
    { id: 200, name: "파", price: 5000 },
  ],
};

type Session = {
  loginUser: LoginUser | null;
  cart: Cart[];
};

type CounterContextProp = {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  removeItem: (id: number) => void;
  addCartItem: (name: string, price: number) => void;
};

const SessionContext = createContext<CounterContextProp>({
  session: SampleSession,
  login: () => {},
  logout: () => {},
  removeItem: () => {},
  addCartItem: () => {},
});

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(SampleSession);

  const login = (id: number, name: string) => {
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };
  const removeItem = (id: number) => {
    setSession({
      ...session,
      cart: [...session.cart.filter((item) => item.id != id)],
    });
  };

  const addCartItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map((item) => item.id), 0) + 1;
    setSession({
      ...session,
      cart: [...session.cart, { id: id, name: name, price: price }],
    });
  };

  return (
    <SessionContext.Provider
      value={{ session, login, logout, removeItem, addCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
