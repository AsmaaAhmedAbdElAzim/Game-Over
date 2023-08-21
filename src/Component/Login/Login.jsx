import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import Axios from 'axios';
import Joi from 'joi'
import { Helmet } from 'react-helmet';

export default function Login({saveTokenUser}) {
  let [user,setUser]=useState({
   
    email:"",
    password:"",
    
  })
  let [error,seterror]=useState('');
  
  const [loding, setLoding] = useState(false);
  const [errorList, seterrorList] = useState([]);
  let navigat = useNavigate();
  
  function getUserData(e){
    let myUser= {...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
    console.log(myUser);
    
  }
  
  async function sendDataToApi(){
    let {data} =await Axios.post('https://movies-api.routemisr.com/signin',user)
    if(data.message === 'success'){
      setLoding(false)
      localStorage.setItem('userTokenInStor', data.token);
      saveTokenUser()
      navigat('/home')
      
    }
    else{
      setLoding(false)
        seterror(data.message)
    }
  }
  
  
  function submitFormlogin(e){
    e.preventDefault();
    setLoding(true);
    
    let validtion = validationForm();
    console.log(validtion);
    if( validtion.error){
      seterrorList(validtion.error.details)
    }
    else
    {
      sendDataToApi();
    }
    
  }
  function validationForm(){
    let regular = Joi.object({
     
      email: Joi.string().email({tlds:{allow :['com','net']}}),
      password: Joi.string().pattern(/^[a-z]{3,9}@[0-9]{3}$/)
    });
    return regular.validate(user,{abortEarly:false}); 
  }
  
  
    return <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Game Over</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <div className="registerContainer container ">
        <div className="row g-0 ">
          <div className="col-md-6">
            <div className="regsterImg">
  
            </div>
          </div>
  
          <div className="col-md-6">
          <div className="rgesterForm p-5">
            <h2 className='text-center'>Log in to GameOver</h2>
            <form onSubmit={submitFormlogin} className='mt-5'>
            {error?<small className=" text-danger">{error}</small>:''}
          
              
              <input onChange={getUserData} type="email" name='email'placeholder='Email Address' id='email' className='form-control myInput my-2 py-2'/>
              <small className='d-block text-danger'>{errorList.filter((error)=> error.context.label === 'email')[0]?.message}</small>
              
              <input onChange={getUserData} type="password" name='password'placeholder='Password' id='password' className='form-control myInput my-2 py-2'/>
              {errorList.map((error,index)=>{if (error.context.label === 'password'){
              return <small key={index} className='text-danger d-block '>password by should start with upperCase then 3 to 8 lowerrCase</small>
            }else{ return ''}})}
              <div onChange={getUserData} className="submitBtn m-auto my-3">
                <button className='btn submit text-white'>
                  {loding?<i className='fas fa-spinner fa-spin'></i>:'logIn'}</button>
              </div>
  
              <div><p className='text-center'>Forgot Password?</p></div>
              <hr />
              <div><p className='text-center'>Not a member yet?<Link to='/register'>Creat Account </Link></p></div>
              
            </form>
  
          </div>
        </div>
  
        </div>
        
  
  
      </div>
    </>

          }
