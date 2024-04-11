import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import '../../style/style.scss';

const ChatList = lazy(() => import('../chatList/ChatList'));
const CreateChat = lazy(() => import('../createChat/CreateChat'));
const ChatPage = lazy(() => import('../chatPage/ChatPage'));

const App = () => {

  const handleCreateChat = (newChat) => {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || {};
    savedChats[newChat.id] = { name: newChat.name, messages: [] };
    localStorage.setItem('chats', JSON.stringify(savedChats));
  };

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route exact path="/" element={<ChatList />} />
            <Route path="/create-chat" element={<CreateChat onCreateChat={handleCreateChat} />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
