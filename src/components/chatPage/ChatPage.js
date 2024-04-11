import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLongLeft } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";
import user from '../../img/user.png';

import './chatPage.scss';

const ChatPage = ({match}) => {
  const chatId = useParams();

  const [chatName, setChatName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats'));
    
    if (savedChats && savedChats[chatId.chatId]) {
      setChatName(savedChats[chatId.chatId].name);
      setMessages(savedChats[chatId.chatId].messages || []);
    }
  }, [chatId]);

  console.log(chatName);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    const savedChats = JSON.parse(localStorage.getItem('chats'));
    savedChats[chatId.chatId].messages = updatedMessages;
    localStorage.setItem('chats', JSON.stringify(savedChats));
    setNewMessage('');
  };

  return (
    <div className='chat-page'>
      <div className='chat-banner'>
        <Link className='back-to-home-btn' to="/"><HiArrowLongLeft /></Link>
        <h2>{chatName}</h2>
      </div>
      <div className='chat-msgs'>
        {messages.map((message, index) => (
          <div className='msg-item' key={index}>
            <img src={user} />
            <p>{message}</p>
            </div>
        ))}
      </div>
      <div className='add-chat-msg-block'>
        <input
            type="text"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="New comment goes here..."
        />
        <button onClick={handleSendMessage}><MdKeyboardArrowRight /></button>
      </div>
    </div>
  )
}

export default ChatPage;