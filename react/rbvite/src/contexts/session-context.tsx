/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { ItemHandler } from "../components/My";
import { LoginHandler } from "../components/Login";

type SessionContextProp = {
  session: Session;
  login: (id: number, name: string) => boolean;
  logout: () => void;
  saveItem: ({ id, name, price }: Cart) => void;
  removeItem: (itemId: number) => void;
  totalPrice: number;
};

const SessionContext = createContext<SessionContextProp>({
  session: { loginUser: null, cart: [] },
  login: () => false,
  logout: () => {},
  saveItem: () => {},
  removeItem: () => {},
  totalPrice: 0,
});

type ProviderProps = {
  children: ReactNode;
  myHandlerRef?: RefObject<ItemHandler>;
  loginHandlerRef?: RefObject<LoginHandler>;
};

type Action =
  | {
      type: "login" | "logout";
      payload: LoginUser | null;
    }
  | { type: "set"; payload: Session }
  | { type: "saveItem"; payload: Cart }
  | { type: "removeItem"; payload: number };

const reducer = (session: Session, { type, payload }: Action) => {
  let newer;
  switch (type) {
    case "set":
      newer = { ...payload };
      break;

    case "login":
    case "logout":
      newer = { ...session, loginUser: payload };
      break;

    case "saveItem":
      {
        const { id, name, price } = payload;
        const { cart } = session;
        const foundItem = id !== 0 && cart.find((item) => item.id === id);
        if (!foundItem) {
          const maxId = Math.max(...session.cart.map((item) => item.id), 0) + 1;
          // cart.push({ id: maxId + 1, name, price }); // Bug!!
          newer = {
            ...session,
            cart: [...cart, { id: maxId + 1, name, price }],
          };
        } else {
          foundItem.name = name;
          foundItem.price = price;
          console.log("🚀  foundItem:", foundItem);

          newer = { ...session };
        }
      }
      break;

    case "removeItem":
      newer = {
        ...session,
        cart: session.cart.filter((item) => item.id !== payload),
      };
      break;

    default:
      return session;
  }
  setStorage(newer);
  return newer;
};

const SKEY = "session";
const DefaultSession: Session = {
  loginUser: null,
  cart: [],
};

function getStorage() {
  const storedData = localStorage.getItem(SKEY);
  if (storedData) {
    return JSON.parse(storedData) as Session;
  }

  setStorage(DefaultSession);

  return DefaultSession;
}

function setStorage(session: Session) {
  localStorage.setItem(SKEY, JSON.stringify(session));
}

export const SessionProvider = ({
  children,
  myHandlerRef,
  loginHandlerRef,
}: ProviderProps) => {
  const [session, dispatch] = useReducer(
    reducer,
    getStorage() || DefaultSession
  );

  const totalPrice = useMemo(
    () => session.cart.reduce((sum, item) => sum + item.price, 0),
    [session.cart]
  );

  const login = useCallback((id: number, name: string) => {
    const loginNoti =
      myHandlerRef?.current?.loginHandler.noti ||
      loginHandlerRef?.current?.noti ||
      alert;

    const focusId =
      myHandlerRef?.current?.loginHandler.focusId ||
      loginHandlerRef?.current?.focusId;
    const focusName =
      myHandlerRef?.current?.loginHandler.focusName ||
      loginHandlerRef?.current?.focusName;

    if (!id || isNaN(id)) {
      loginNoti("User ID를 입력하세요!");
      if (focusId) focusId();
      return false;
    }

    if (!name) {
      loginNoti("User name을 입력하세요!");
      if (focusName) focusName();
      return false;
    }

    dispatch({ type: "login", payload: { id, name } });
    return true;
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "logout", payload: null });
  }, []);

  const saveItem = useCallback(({ id, name, price }: Cart) => {
    dispatch({ type: "saveItem", payload: { id, name, price } });
  }, []);

  const removeItem = useCallback((itemId: number) => {
    dispatch({ type: "removeItem", payload: itemId });
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, login, logout, saveItem, removeItem, totalPrice }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
