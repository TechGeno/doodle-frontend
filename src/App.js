import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home'
import Home2 from './pages/Home2'
import Game from './pages/Game'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile';
import NotFound from './NotFound';
import {UserProvider} from './UserContext'
function App() {
  return (
    <UserProvider>
    <div className="App">  
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/game/:roomId" element={<Game />} />
            <Route path="/home" element={<Home2 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
    </UserProvider>
  );
}

export default App;
