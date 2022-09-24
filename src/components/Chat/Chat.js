import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const ENDPOINT = 'https://ws-react-srv.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT, {
      cors: {
        origin: 'https://ws-react-srv.herokuapp.com/',
        credentials: true,
      },
      transports: ['websocket'],
    });

    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
        />
      </div>
    </div>
  );
};

export default Chat;
