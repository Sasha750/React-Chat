import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { HiArrowLongLeft } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";

import './createChat.scss';

const CreateChat = ({onCreateChat}) => {
  const [chatName, setChatName] = useState('');

  const handleChatName = (event) => {
    setChatName(event.target.value);
  };

  const createChat = () => {
    const chatId = uuidv4();
    onCreateChat({ id: chatId, name: chatName.trim() });
    setChatName('');
  };

  return (
    <div className='create-chat-page'>
      <div className='new-chat-banner'>
        <Link className='back-to-home-btn' to="/"><HiArrowLongLeft /></Link>
        <h2>Create new item</h2>
      </div>
      <div className='new-chat-block'>
        <input
          type="text"
          value={chatName}
          onChange={handleChatName}
          placeholder='New item title...'
        />
        <button onClick={createChat}><MdKeyboardArrowRight /></button>
      </div>
    </div>
  )
}

export default CreateChat;