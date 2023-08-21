// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import All from './Component/All/All';
import Categories from './Component/Categories/Categories';
import Platforms from './Component/Platforms/Platforms';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import Pc from './Component/Pc/Pc';
import Browser from './Component/Browser/Browser';
import DescriptionGame from './Component/DescriptionGame/DescriptionGame';
import Racing from './Component/Racing/Racing';
import Zompi from './Component/Zompi/Zompi';
import Shooter from './Component/Shooter/Shooter';
import Sport from './Component/Sport/Sport';
import Action from './Component/Action/Action';
import ReleaseDate from './Component/Release-date/Release-date';
import Popularity from './Component/Popularity/Popularity';
import StorBy from './Component/StorBy/StorBy';
import Relevance from './Component/Popularity/Relevance/Relevance';
import Alphabetical from './Component/Alphabetical/Alphabetical';


function App() {

  useEffect(()=>{
    if(localStorage.getItem('userTokenInStor') !== null){
      saveTokenUser();
    }
  },[])
  const [userToken, setUserToken] = useState(null);
  

function saveTokenUser(){
  let encodedToken =localStorage.getItem('userTokenInStor');
  let codedToken = jwtDecode(encodedToken);
  setUserToken(codedToken);
}


let router= createHashRouter([
  {path:'',element:<Layout userToken={userToken} setUserToken={setUserToken} />,children:[
    {path:'home' , element:<ProtectedRoute userToken={userToken} saveTokenUser={saveTokenUser}><Home userToken={userToken}/></ProtectedRoute>},
    {path:'all',element:<ProtectedRoute userToken={userToken} saveTokenUser={saveTokenUser}><All userToken={userToken}/></ProtectedRoute>},
    {path:'DescriptionGame/:id',element:<ProtectedRoute userToken={userToken} saveTokenUser={saveTokenUser}><DescriptionGame userToken={userToken}/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute userToken={userToken} saveTokenUser={saveTokenUser}><Categories userToken={userToken}/></ProtectedRoute>,children:[
      {path:'racing',element:<Racing/>},
      {path:'zompi',element:<Zompi/>},
      {path:'shooter',element:<Shooter/>},
      {path:'sport',element:<Sport/>},
      {path:'action',element:<Action/>},
    ]},
    {path:'storby',element:<ProtectedRoute userToken={userToken} saveTokenUser={saveTokenUser}><StorBy userToken={userToken}/></ProtectedRoute>,children:[
      {path:'release-date',element:<ReleaseDate/>},
      {path:'Popularity',element:<Popularity/>},
      {path:'Relevance',element:<Relevance/>},
      {path:'Alphabetical',element:<Alphabetical/>},
     
    ]},
    {path:'platforms',element:<ProtectedRoute userToken={userToken} saveTokenUser={saveTokenUser}><Platforms userToken={userToken}/></ProtectedRoute>,children:[
      {path:'pc',element:<Pc/>},
      {path:'Browser',element:<Browser/>}
    ]},
    {path:'login',element:<Login saveTokenUser={saveTokenUser} />},
    {index:true,element:<Register/>},
    {path:'*',element:<Register/>}

  ]}
])
  return <>
  <RouterProvider router={router}/>
  </>
}

export default App;
