import React from 'react'
import { Link } from 'react-router-dom';
import "./Base.css";
import MouseParticleTrail from "./MouseTrail";
function Home() {
  const img = "https://wallpaperaccess.com/full/4683506.jpg";
  
  return (
    <section>
        <div className="h-screen w-full flex items-center justify-center bg-cover bg-no-repeat relative"  style={{ backgroundImage: `url(${img})` }}>
            <div className='md:h-2/3 w-3/4 px-1 py-1 border-2 border-teal-200 flex flex-col-reverse md:flex-row opacity-80 bg-black'>
              <div className='text-[#ffffff] flex justify-center pt-2 md:w-2/3 flex-wrap'>
                <div className='text-2xl text-yellow-400 text-center'>Release Your Inner Artist</div>
                <div className='text-justify px-4'>
                  Remember when you were a kid, sketching superheroes and princess castles?
                  It was pure joy, wasn't it? Get that feeling back, with our platform that's more fun than a barrel of monkeys!
                  Scribble, doodle, hatch, or cross-hatch, it doesn't matter. Just let the magic flow from your fingertips.
                </div>
                <div className='text-[#ffffff] text-xl '>
                  <span className="text-writing-effect">
                    Join the revolution!
                  </span>
                  <br />
                  <Link to="/login" className="text-yellow-600 text-2xl z-1">
                    <input type="submit" value="Start inkCrypting"/>
                  </Link>

                </div>
              </div>
              <div className='md:flex flex-wrap justify-center md:items-center relative md:w-1/3 text-white text-4xl cipher-animation'>
                INKCRYPT
              </div>
            </div>
           
            
            <div className='absolute top-0 left-0'>
              <MouseParticleTrail />
            </div>

            <div className='indicator'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
    </section>
  );
}

export default Home;