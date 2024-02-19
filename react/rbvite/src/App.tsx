import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { Hello } from './components/Hello';
import { My } from './components/My';
import { flushSync } from 'react-dom';

// {ss: 'FirstComponent' }
// function H5(prop: { ss: string }) {
// function H5({ ss }: { ss: string }) {
//   return <h5>H55555566-{ss}</h5>;
// }

export type LoginUser = { id: number; name: string };
export type Cart = { id: number; name: string; price: number };
export type Session = {
  loginUser: LoginUser | null;
  cart: Cart[];
};

const SampleSession: Session = {
  // loginUser: null,
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(SampleSession);

  // const plusCount = () => setCount(count + 1);
  const plusCount = () => setCount((prevCount) => prevCount + 1);
  const login = (id:number, name:string) => {
    setSession({...session, loginUser:{id, name}})
  };
  const logout = () => {
    // setSession({ cart: [...session.cart], loginUser: null });
    // session.loginUser = null;
    setSession({ ...session, loginUser: null });
  };
  const removeItem = (id:number) => {
  
    //방법1
    setSession({
      ...session, 
      cart: [...session.cart.filter(item => item.id!=id)] //방법1 - 가독성 면에서 더 좋다.(순수함수임이 더 잘 드러남)
      // cart: session.cart.filter(item => item.id!=id) //방법2 - 성능면에서 더 좋다.
      //상황에 따라 방법1,2 알아서 사용
    });

    //방법2 //- 값이 바뀌지만 리렌더링 하지 않음(session의 주소가 변하지 않았으므로.)
    // session.cart=session.cart.filter(item => item.id!=id); 
  };
  return (
    <>
      <h1 style={{ color: 'white', backgroundColor: 'red' }}>Vite + React</h1>
      {/* <H5 ss={`First-Component ${count}`} /> */}
      <My session={session} login={login} logout={logout} removeItem={removeItem}/>
      <Hello
        name={session.loginUser?.name || 'Guest'}
        age={count}
        plusCount={plusCount}
      >
        Hello-children!!!!!!!!!!!
      </Hello>
      <div className='card'>
        <button
          onClick={() => {
            for(let i=0;i<10;i++)
            flushSync(() => setCount(c => c + 1));
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
