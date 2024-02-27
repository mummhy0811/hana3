import { useRef } from 'react';
import './App.css';
import Hello from './components/Hello';
import My, { ItemHandler } from './components/My';
import { SessionProvider } from './contexts/session-context';
import Posts from './components/Posts';
import { Nav } from './Nav';
import { Route, Routes } from 'react-router-dom';
import { Login, LoginHandler } from './components/Login';
import { NotFound } from './NotFound';
import { Home } from './components/Home';
import Sample from './components/Sample';
import DeferTrans from './components/DeferTrans';
import { PostLayout } from './components/PostLayout';
import { PostDetail } from './components/PostDetail';

function App() {
  const myHandlerRef = useRef<ItemHandler>(null);
  const loginHandlerRef = useRef<LoginHandler>(null);

  return (
    <>
      <SessionProvider
        myHandlerRef={myHandlerRef}
        loginHandlerRef={loginHandlerRef}
      >
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login ref={loginHandlerRef} />} />
          <Route path='/my' element={<My ref={myHandlerRef} />} />
          <Route path='/posts' element={<PostLayout/>}>
            <Route index element={<Posts />} />
            <Route path=':id' element={<PostDetail />} />
          </Route>
          <Route path='/hello' element={<Hello />} />
          <Route path='/sample' element={<Sample />} />
          <Route path='/difertrans' element={<DeferTrans />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SessionProvider>
    </>
  );
}
export default App;