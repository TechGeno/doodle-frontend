import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Base.css';
import img from "./Assets/bg.jpg";

function Signup() {
  const usernameRefR = useRef();
  const emailRefR = useRef();
  const passwordRefR = useRef();
  const navigate = useNavigate();
  const server = 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRefR.current.value,
      email: emailRefR.current.value,
      password: passwordRefR.current.value,
    };

    try {
      const res = await axios.post(`${server}/users/register`, newUser);
      console.log(res);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div
        className="w-full h-screen flex items-center justify-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="box-border-effect bg-opacity-80 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="border-effect">
            <div className="text-gray-800 text-center mb-6">
              <p className="text-4xl text-gray-800">Sign Up!</p>
            </div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faUser} className="text-gray-800 mr-2" />
              <input className="pl-1 w-full py-2 bg-transparent border-b border-gray-800 focus:outline-none" type="text" placeholder="Username" ref={usernameRefR} />
            </div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-800 mr-2" />
              <input className="pl-1 w-full py-2 bg-transparent border-b border-gray-800 focus:outline-none" type="text" placeholder="Email Address" ref={emailRefR} />
            </div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faLock} className="text-gray-800 mr-2" />
              <input className="pl-1 w-full py-2 bg-transparent border-b border-gray-800 focus:outline-none" type="password" placeholder="Create Password" ref={passwordRefR} />
            </div>
            <div className="text-center mb-6">
              <button type="submit" className="py-2 px-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none">Sign up</button>
            </div>
            {/* <p className="text-gray-800 text-center">
              Have an account?{' '}
              <a
                href="/login"
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/login');
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
