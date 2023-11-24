import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../UserContext';
import './Base.css';

function Home2() {
  const img = "https://wallpaperaccess.com/full/4683506.jpg";
  const [isJoinPopupOpen, setJoinPopupOpen] = useState(false);
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const { username, setUsername, setPresenter, socket } = useContext(UserContext);
  const openJoinPopup = () => setJoinPopupOpen(true);
  const closeJoinPopup = () => setJoinPopupOpen(false);
  const openCreatePopup = () => setCreatePopupOpen(true);
  const closeCreatePopup = () => setCreatePopupOpen(false);
  const roomref = useRef();
  const { roomId, setRoomId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username]);

  useEffect(() => {
    socket.on("User-Joined", (data) => {
      if (data.success) {
        setPresenter(data.data.presenter);
        navigate(`/game/${roomId}`);
      }
    });
  }, [socket]);

  const handleCreateRoom = (e) => {
    const roomData = {
      username,
      roomId,
      host: true,
      presenter: true,
    };
    socket.emit("Join-User", roomData);
  };

  const handleJoinRoom = () => {
    const roomData = {
      username,
      roomId,
      host: false,
      presenter: false,
    };
    socket.emit("Join-User", roomData);
  };

  const generateuuid = () => {
    setRoomId(uuid());
  };

  const handleCopyCode = () => {
    const copyText = document.getElementById("roomCode");
    copyText.select();
    document.execCommand("copy");
  };
  const handleroomchange=()=>{
    setRoomId(roomref.current.value)
  }

  const uuid = () => {
    var s4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return s4() + "-" + s4() + "-" + s4() + "-" + s4();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${img})` }}>
      <div className='md:h-2/3 flex flex-col items-center justify-center w-3/4 px-1 py-1 border-2 border-teal-200 opacity-80 bg-black'>
        <div className='z-10 flex flex-wrap justify-center relative text-white text-4xl cipher-animation pb-1'>
          INKCRYPT
        </div>
        <div className='text-3xl text-yellow-400 pb-3'>Draw your world with us</div>

        <div className='text-justify text-[#ffffff] px-4'>
          Imagine a canvas as big as the world. That's us. At our community, you'll find artists, dreamers, professionals, stick-figure masters, and many more. It's a riot of creativity. Create, share, comment, bookmark. It's the wild frontier of sketching. No username? No problem! We welcome 'Anonymous Picassos' too. It's the world of anything goes doodles.
        </div>

        <div className='text-[#ffffff] text-xl'>
          <span className="text-writing-effect pt-5 pb-2">Ready to INKCRYPT!</span>
          <br />

          <div className='flex items-center justify-center'>
            <input type="submit" className="button" value="Join Room" onClick={openJoinPopup} />

            <div className={`popup ${isJoinPopupOpen ? 'open-popup' : ''}`}>
              <button type="button" className="close-button" onClick={closeJoinPopup}> X </button>
              <div className='popup-header'>Join Room</div>
              <label htmlFor="roomn" className="label">Room ID: </label>
              <input type="text" id="roomn" name="roomn" placeholder='Enter Room ID' className="input" ref={roomref} onChange={handleroomchange}></input>
              <button className="popup-button" type="button" onClick={handleJoinRoom}>Join Room</button>
            </div>

            <input type="submit" className="button" value="Create Room" onClick={openCreatePopup} />

            <div className={`popup ${isCreatePopupOpen ? 'open-popup' : 'invisible'}`}>
              <button type="button" className="close-button" onClick={closeCreatePopup}> X </button>
              <div className='popup-header'>Create Room</div>
              <label htmlFor="roomn" className="label">Room Name:</label>
              <div className="flex items-center">
                <input type="text" id="roomn" name="roomn" placeholder='Room ID' value={roomId} className="input" readOnly />
                <button type="button" className="generate-button" onClick={generateuuid}>Generate</button>
              </div>
              <button type="button" className="popup-button" onClick={handleCreateRoom}>Create Room</button>
            </div>
          </div>

          <button type="button" className="py-2 px-4 mt-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-md transition duration-300 ease-in-out" onClick={() => setUsername(null)}>
            Logout
          </button>
        </div>
      </div>
      <div className='absolute top-0 left-0'>
        {/* <MouseParticleTrail /> */}
      </div>
    </div>
  );
}

export default Home2;
