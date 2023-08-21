import React from 'react'
import Login from '../Login/Login'


export default function ProtectedRoute({userToken,saveTokenUser,children}) {
  
  if(userToken === null)
  {
    
    return <Login saveTokenUser={saveTokenUser}/>
  }
  else{
    return children
  }
  
 
}





