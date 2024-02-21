import "./App.css";
import { Hello } from "./components/Hello";
import { My } from "./components/My";
import { useCounter } from "./contexts/counter-context";
import { SessionProvider } from "./contexts/session-context";

function App() {
  const { count, plusCount } = useCounter();
  return (
    <>
      <h1 style={{ color: "white", backgroundColor: "red" }}>Vite + React</h1>
      <SessionProvider>
        <My />
        <Hello>
          Hello-children!!!!!!!!!!!
        </Hello>
      </SessionProvider>

      <div className="card">
        <button
          onClick={() => {
            for (let i = 0; i < 10; i++) plusCount();
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
