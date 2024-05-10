import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';
import Art from '../assets/Art.png';

function Signup() {
  const [userName, setUserName] = useState(getCookie('username'));
  const [password, setPassword] = useState(getCookie('password'));
  const [success, setSuccess] = useState(false);

  const handleUsernameChange= (e) =>{
    setUserName(e.target.value);
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value);
  }
  const navigate = useNavigate();

  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  function setCookie(name, value, daysToExpire) {
    let date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }

  const submit = (e) => {
    e.preventDefault();
    axios.post('https://s51-ipl-team.onrender.com/login', {
      name: userName,
      password: password
    }).then((response) => {
      setCookie('token', response.data.accessToken, 365);
      setCookie('username', userName, 365);
      setSuccess(true);
    }).catch((error) => { 
      console.error(error);
    });
  }

  return (
    <>
      <div id='signin_container'>
        <div id='form_bar'>
          {!success ? (
            <div className='welcome'>
              <h2>Welcome back 👋</h2>
              <p className='para2'>Today is a new day. It's your day. You shape it. <br />
                Sign in to have your own account</p>
            </div>
          ) : (
            <div className='welcome'>
              <h2>Thank you! 🎉</h2>
              <Link to="/home"><button>Go to Home Page</button></Link>
            </div>
          )}
          <div id='Body-content'>
            <div id='lform'>
              <form onSubmit={submit}>
                <div className='space-around'><label className='label1'>Username  </label>
                  <input type="text" onChange={(e) => { setUserName(e.target.value) }} id='password' /></div>
                <div className='space-around'><label>Password : </label>
                  <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} /></div>
                  {!success && <Link className='login-button' to="/">Sign In</Link>}
              </form>
            </div>
          </div>
        </div>
        <div>
          <img src={Art} alt="" className='art' />
        </div>
      </div>
    </>
  );
}

export default Signup;
