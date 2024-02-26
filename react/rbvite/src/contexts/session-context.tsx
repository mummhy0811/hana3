/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ItemHandler } from "../components/My";
import { useFetch } from "../hooks/fetch";

type SessionContextProp = {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  saveItem: ({ id, name, price }: Cart) => void;
  removeItem: (itemId: number) => void;
  totalPrice: number;
};

type ProviderProps = {
  children: ReactNode;
  myHandlerRef?: RefObject<ItemHandler>;
};

type Action =
  | {
      type: "login" | "logout";
      payload: LoginUser | null;
    }
  | {
      type: "set";
      payload: Session;
    }
  | {
      type: "saveItem";
      payload: Cart;
    }
  | {
      type: "removeItem";
      payload: number;
    };


const SessionContext = createContext<SessionContextProp>({
  session: { loginUser: null, cart: [] },
  login: () => {},
  logout: () => {},
  saveItem: () => {},
  removeItem: () => {},
  totalPrice: 0,
});

const reducer = (session: Session, { type, payload }: Action) => {
  switch (type) {
    case "set":
      return { ...(payload as Session) };
    case "login":
      return { ...session, loginUser: payload };
    case "logout":
      return { ...session, loginUser: null };
    case "saveItem": {
      //const는 case문 안에서 쓰면 좋지 않기 때문에, 블럭스코프로 묶어준다.
      const { cart } = session;
      const { id, name, price } = payload;
      const foundItem = id !== 0 && cart.find((item) => item.id === id);

      if (!foundItem) {
        const maxId = Math.max(...session.cart.map((item) => item.id), 0);
         // cart.push({ id: maxId + 1, name, price }); // 기존 코드 -> Bug!!
        return { ...session, cart: [...cart, { id: maxId + 1, name, price }] };
      }

      foundItem.name = name;
      foundItem.price = price;
      return { ...session };
    }
    case "removeItem":
      return {
        ...session,
        cart: session.cart.filter((item) => item.id !== payload),
      };
    default:
      return session;
  }
};

export const SessionProvider = ({ children, myHandlerRef }: ProviderProps) => {
  const [session, dispatch] = useReducer(reducer, {
    loginUser: null,
    cart: [],
  });

  const totalPrice = useMemo(
    () => session.cart.reduce((sum, item) => sum + item.price, 0),
    [session.cart]
  );

  const login = (id: number, name: string) => {
    const loginNoti = myHandlerRef?.current?.loginHandler.noti || alert;
    const focusId = myHandlerRef?.current?.loginHandler.focusId;
    const focusName = myHandlerRef?.current?.loginHandler.focusName;

    if (!id || isNaN(id)) {
      loginNoti("User ID를 입력하세요!");
      if (focusId) focusId();
      return;
    }

    if (!name) {
      loginNoti("User name을 입력하세요!");
      if (focusName) focusName();
      return;
    }
    dispatch({ type: "login", payload: { id, name } });
  };

  const logout = () => dispatch({ type: "logout", payload: null });

  const saveItem = ({ id, name, price }: Cart) =>
    dispatch({ type: "saveItem", payload: { id, name, price } });

  const removeItem = (itemId: number) =>
    dispatch({ type: "removeItem", payload: itemId });

  const { data } = useFetch<Session>({
    url: '/data/sample.json',
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "set", payload: data });
    }
  }, [data]);

  return (
    <SessionContext.Provider
      value={{ session, login, logout, saveItem, removeItem, totalPrice }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
