import React, { useState, useEffect, useRef, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import user_icon from "./Assets/person.png";
import password_icon from "./Assets/password.png";
import img from "./Assets/bg.jpg";
import Loading from './Loading';
import "./Base.css";
import axios from 'axios';
import UserContext from '../UserContext';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const emailRefR = useRef();
  const passwordRefR = useRef();
  const navigate = useNavigate();
  const server = "http://localhost:3001";
  const { setUsername } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setLoggedIn(false);
    };

    fetchData();
  }, []);

  const transit = (e) => {
    // Your transition logic here
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email1 = emailRefR.current.value;
    const password1 = passwordRefR.current.value;
    const user = { username: email1, password: password1 };

    try {
      const res = await axios.post(`${server}/users/login`, user);
      console.log('done');
      console.log(res);
      setUsername(res.data.username);
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      {/* Loading component */}
      {/* <CSSTransition
        in={loading}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <Loading />
      </CSSTransition> */}

      {/* Login form */}
      {/* <CSSTransition
        in={!loading && !loggedIn}
        timeout={1}
        classNames="fade"
        unmountOnExit
      > */}
        <div
          className="w-full h-screen flex items-center justify-center bg-cover bg-no-repeat custom-cursor"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="box-border-effect bg-opacity-80 p-8 rounded-lg shadow-lg">
            <form action="/home" className="border-effect">
              <div className="pt-6">
                <p className="text-4xl text-gray-800">Sign In</p>
              </div>
              <div className="flex items-center pt-5 pb-4">
                {/* Font Awesome icon */}
                <FontAwesomeIcon icon={faUser} className="mr-2 text-black text-2xl" />
                <input className='pl-1 w-full py-2 bg-transparent border-b border-gray-800 focus:outline-none' type="text" placeholder="Email" ref={emailRefR}/>
              </div>
              <div className="flex items-center pt-1 pb-3">
                {/* Font Awesome icon */}
                <FontAwesomeIcon icon={faLock} className="mr-2 text-black text-2xl" />
                <input className="pl-1 w-full py-2 bg-transparent border-b border-gray-800 focus:outline-none" type="password" placeholder="Password" ref={passwordRefR}/>
              </div>
              <div className="text-xl font-medium">
                <button type="button" onClick={handleLogin} className="py-2 px-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none mt-2">Login</button>
              </div>
              <p className="pt-4 text-xl flex justify-center text-gray-800">
                Don't have an account?
                <a
                  href="/signup"
                  onClick={(event) => {
                    transit(event);
                  }}
                  className="ml-1 text-yellow-600"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      {/* </CSSTransition> */}

      {/* Home component  */}
      {/* <CSSTransition
        in={loggedIn}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <Home />
      </CSSTransition> */}
    </section>
  );
};

export default Login;
