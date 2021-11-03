import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div className="">
          <input
            type="text"
            className="joinInput"
            placeholder="Name"
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="text"
            className="joinInput mt-20"
            placeholder="Room"
            onChange={(ev) => setRoom(ev.target.value)}
          />
          <Link
            onClick={(ev) => (!name || !room ? ev.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="button mt-20" type="submit">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
