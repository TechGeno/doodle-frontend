import React, { useContext, useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client'
import UserContext from '../UserContext';
function Chat({socket}) {
  useEffect(()=>{
    socket.on('recieve',m=>{
      setmessage((prev)=>[...prev,{name:m.user,text:m.messag}]);
    })
  },[socket])

  
  const {username}=useContext(UserContext);
  const [mess,setmess]=useState("");
  const [message,setmessage]=useState([]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      Addtext()
    }
  }
  const handlechange = event => {
   
    setmess(event.target.value);
  };
   const Addtext=async(e)=>{
    
    if(mess===""){
      return;
    }
    
    await socket.emit('send',{messag:mess,user:username});
    setmessage((prev)=>[...prev,{name:username,text:mess}]);
    setmess("");
  }
  
  return (
    <div className='bg-gray-200 w-1/2 h-1/3 mt-1 mx-1 md:h-full md:w-1/4 relative'>
      <div>
      <div className='w-full max-h-full absolute bottom-0 right-0 pb-[34px] overflow-y-auto'>
       {message.map((obj)=>
        <div className='text-left bg-gray-100 mb-[4px]'>&nbsp; {obj.name} : {obj.text}</div>
       )}
        </div>
      </div>
      <div className='w-full absolute bottom-0 right-0 '>
      <input className='rounded border-2 border-gray-800 w-4/5 md:h-[35px] ' placeholder="Tap to guess" type="text" value={mess} onChange={handlechange} onKeyDown={handleKeyDown}></input>
      <button className='text-[#ffffff] rounded bg-blue-700 w-1/5 hover:bg-blue-900 md:h-[35px]' onClick={Addtext} >Send</button>
      </div>

    </div>
  )
}

export default Chat;
