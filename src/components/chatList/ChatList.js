import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import './chatList.scss'

const ChatList = () => {
  const [chats, setChats] = useState({});

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats'));
    if (savedChats) {
      setChats(savedChats);
    }
  }, []);

  const handleDeleteChat = (chatId) => {
    const updatedChats = { ...chats };

    delete updatedChats[chatId];
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
  };

  return (
    <div className='chat-page'>
      <div className='chat-page-banner'>
        <h1>Sayer</h1>
        <p>World's most used time waster</p>
      </div>
      <ul className='chat-list'>
        {Object.keys(chats).map(chatId => (
            <li key={chatId}>
              <Link to={`/chat/${chatId}`}>{chats[chatId].name}</Link>
              <span className='msgs'>{chats[chatId].messages.length}</span>
              <button className='delete-btn' onClick={() => handleDeleteChat(chatId)}><MdDeleteForever /></button>
            </li>
        ))}
      </ul>
      <Link className='add-chat-btn' to="/create-chat"><FaPlus /></Link>
    </div>
  )
}

export default ChatList;