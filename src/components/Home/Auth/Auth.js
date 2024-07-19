import React, { useState } from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './Auth.css';
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className='auth-component'>
        <div className='btn-grp'>
          <button className='btn' onClick={() => {setIsSignIn(true)}}>SIGN IN</button>
          <button className='btn' onClick ={() => {setIsSignIn(false)}}>SIGN UP</button>
        </div>
        <br></br>
        {isSignIn ? <SignInForm /> : <SignUpForm />}
    </div>
  )
}
export default Auth
