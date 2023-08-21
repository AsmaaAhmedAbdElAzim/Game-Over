import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


export default function Layout({userToken ,setUserToken}) {
  let navigat = useNavigate();
  function logOut(){
    localStorage.removeItem('userTokenInStor');
    setUserToken(null);
    navigat('/login')
  
  }
  return <>
  <Navbar userToken={userToken} logOut={logOut} />
  <div className="container">
    <Outlet></Outlet>
  </div>


  </>
}
