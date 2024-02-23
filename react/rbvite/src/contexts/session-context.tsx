/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ItemHandler } from '../components/My';

type SessionContextProp = {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  saveItem: ({ id, name, price }: Cart) => void;
  removeItem: (itemId: number) => void;
  totalPrice: number;
};

const SampleSession: Session = {
  loginUser: null,
  // loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

const SessionContext = createContext<SessionContextProp>({
  session: { loginUser: null, cart: [] },
  login: () => {},
  logout: () => {},
  saveItem: () => {},
  removeItem: () => {},
  totalPrice: 0,
});

type ProviderProps = {
  children: ReactNode;
  myHandlerRef?: RefObject<ItemHandler>;
};

export const SessionProvider = ({ children, myHandlerRef }: ProviderProps) => {
  const [session, setSession] = useState<Session>(SampleSession);
  
  const totalPrice = useMemo(()=>
    session.cart.reduce((sum, item)=>sum+item.price, 0)
  ,[session.cart]);

  const login = (id: number, name: string) => {
    const loginNoti = myHandlerRef?.current?.loginHandler.noti || alert;
    console.log('🚀  loginNoti:', loginNoti);

    const focusId = myHandlerRef?.current?.loginHandler.focusId;
    const focusName = myHandlerRef?.current?.loginHandler.focusName;

    if (!id || isNaN(id)) {
      loginNoti('User ID를 입력하세요!');
      if (focusId) focusId();
      return;
    }

    if (!name) {
      loginNoti('User name을 입력하세요!');
      if (focusName) focusName();
      return;
    }

    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };
  const saveItem = ({ id, name, price }: Cart) => {
    const { cart } = session;
    const foundItem = id !== 0 && cart.find((item) => item.id === id);
    if (!foundItem) {
      id = Math.max(...session.cart.map((item) => item.id), 0) + 1;
      cart.push({ id, name, price });
    } else {
      foundItem.name = name;
      foundItem.price = price;
    }

    setSession({
      ...session,cart:[...cart]
    });
  };

  const removeItem = (itemId: number) => {
    console.log('🚀  itemId:', itemId);
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== itemId),
    });
  };

  useEffect(()=>{
    const controller = new AbortController();
    const { signal } = controller;

    (async function () {
      const res = await fetch('/data/sample.json', {signal});
      const data = await res.json();
      setSession(data);
    })()

    return () => {};//controller.abort(); //네트워크를 취소하라는 신호를 보냄

  },[]);

  return (
    <SessionContext.Provider
      value={{ session, login, logout, saveItem, removeItem, totalPrice }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);