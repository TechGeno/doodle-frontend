import { Link } from "react-router-dom";
import pup from '../src/pages/Assets/pup.jpg';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2 h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${pup})` }}></div>

      <div className="w-1/2 p-8">
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <Link to='/'>Home</Link>
        <br/>
        <Link to='/login'>Login</Link>
        <br/>
        <Link to='/signup'>Sign up</Link>
        <br/>
        <Link to='/contact'>Contact us</Link>
        <br/>
      </div>
    </div>
  );
}
