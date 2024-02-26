import { Ref, createRef, forwardRef, useRef } from 'react';
import './App.css';
import Hello from './components/Hello';
import My, { ItemHandler } from './components/My';
import { flushSync } from 'react-dom';
import { useCounter } from './contexts/counter-context';
import { SessionProvider } from './contexts/session-context';
import Posts from './components/Posts';
import MouseCapture from './components/MouseCapture';
import DeferTrans from './components/DeferTrans';

const H5 = forwardRef(({ ss }: { ss: string }, ref: Ref<HTMLInputElement>) => {
  return (
    <div style={{ border: '1px solid skyblue', marginBottom: '0.5rem' }}>
      <h5>H55555566-{ss}</h5>
      <input type='text' ref={ref} placeholder='child-input...' />
    </div>
  );
});
H5.displayName = 'H5';

function App() {
  const { count, plusCount } = useCounter();

  const childInputRef = createRef<HTMLInputElement>();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const myHandlerRef = useRef<ItemHandler>(null);

  return (
    <>
    <DeferTrans/>
      <h1 ref={titleRef} style={{ color: 'white', backgroundColor: 'red' }}>
        Vite + React
      </h1>

      <SessionProvider myHandlerRef={myHandlerRef}>
        <Posts />
        <My ref={myHandlerRef} />
        <Hello>Hello-children!!!!!!!!!!!</Hello>
      </SessionProvider>
      <MouseCapture />
      <button
        onClick={() => {
          if (childInputRef.current) {
            childInputRef.current.value = 'XXXX';
            childInputRef.current.select();
          }
        }}
      >
        call H5 input
      </button>
      <button onClick={() => myHandlerRef.current?.signOut()}>
        App-Sign-Out
      </button>
      <button onClick={() => myHandlerRef.current?.notify('테스트메시지')}>
        Message
      </button>
      <button onClick={() => myHandlerRef.current?.removeItem()}>Rm2</button>

      <div className='card'>
        <button
          onClick={() => {
            for (let i = 0; i < 10; i += 1) {
              flushSync(plusCount);
            }
          }}
        >
          count is {count}
        </button>
      </div>

      <button
        onClick={() => titleRef.current?.scrollIntoView({ behavior: 'smooth' })}
      >
        Go to the Top
      </button>
    </>
  );
}
export default App;