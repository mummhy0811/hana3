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
import { ItemLayout } from './components/items_v1/ItemLayout';
import {Items} from './components/items_v1/Items';
import {Item} from './components/items_v1/Item';
import { ItemEditV2, ItemLayoutV2, ItemV2, ItemsV2} from './components/items_v2/itemV2';

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

          <Route path='/v1/items' element={<ItemLayout />}>
            <Route index element={<Items/>}/>
            <Route path=':id' element={<Item />} />
          </Route>

          <Route path='/v2/items' element={<ItemLayoutV2 />}>
            <Route index element={<ItemsV2/>}/>
            <Route path=':id' element={<ItemV2 />} />
            <Route path=':id/edit' element={<ItemEditV2 />} />
          </Route>
          
        </Routes>
      </SessionProvider>
    </>
  );
}
export default App;