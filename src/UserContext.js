import { createContext,useState,React } from "react";
import {io} from "socket.io-client";
const UserContext=createContext()

export function UserProvider({children}){
    const [username,setUsername]=useState(null)
    const [roomId,setRoomId]=useState("public");
    const [presenter,setPresenter]=useState(false)
    const socket=io("http://localhost:3001")
    return(
        <UserContext.Provider value={{username,setUsername,roomId,setRoomId,presenter,setPresenter,socket}}>{children}</UserContext.Provider>
    )
}
export default UserContext