// Game.js
import React, { useContext, useEffect, useState } from 'react';
import Whiteboard from '../components/Whiteboard';
import Chat from '../components/Chat';
import Players from '../components/Players';
import { io } from 'socket.io-client';
import bg from "../pages/Assets/bg-1.jpg";
import ProgressBar from '../components/Progress';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Game() {
  const navigate = useNavigate();
  const socket = io("http://localhost:3001");
  const img = bg;
  const userC = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!userC.username) {
      navigate('/login');
    }
  }, [userC]);

  const handleStart = () => {
    setTimerStarted(true);
  };

  const handleTimeUp = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimerStarted(false); // Reset the timer after closing the modal
    // Additional logic if needed
  };

  // Handle copying room code to clipboard
  const handleCopyCode = () => {
    const codeInput = document.getElementById("roomCodeInput");

    // Select the text in the input field
    codeInput.select();

    try {
      // Attempt to copy the selected text to the clipboard
      document.execCommand("copy");
      console.log("Room code copied to clipboard");
    } catch (err) {
      console.error("Unable to copy room code to clipboard", err);
    }
  };

  return (
    <div className="h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img})` }}>
      <div className='h-10 pt-3 px-3 flex justify-between'>
        <div className='text-white text-2xl '>
          INKCRYPT
        </div>
        <div className='flex items-center'>
          <input
            type="text"
            id="roomCodeInput"
            value={userC.roomId}
            className="border-2 border-gray-300 rounded-md p-1"
            readOnly
          />
          <button onClick={handleCopyCode} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded">Copy</button>
        </div>
        {timerStarted && <ProgressBar onTimeUp={handleTimeUp} started={timerStarted} />}
        <div className='text-white'>
          {/* Replace 'Settings' with the FontAwesome icon //isnt working  :-( */}  
          <i className="fas fa-cog"></i>
        </div>
      </div>
      <div className='h-full md:h-3/4 md:flex md:flex-row'>
        <Players />
        <Whiteboard />
        <Chat socket={socket} />
      </div>
      <div className="fixed bottom-4 right-4">
        {!timerStarted && <button onClick={handleStart} className="bg-blue-500 text-white py-2 px-4 rounded">Start</button>}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <p className="text-2xl font-semibold">Time Up!</p>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
