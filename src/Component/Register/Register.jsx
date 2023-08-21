import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import Axios from 'axios';
import Joi from 'joi'
import { Helmet } from 'react-helmet';


export default function Register() {

let [user,setUser]=useState({
  first_name:"",
  last_name:"",
  email:"",
  password:"",
  age:""
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
  let {data} =await Axios.post('https://movies-api.routemisr.com/signup',user)
  if(data.message === 'success'){
    setLoding(false)
    navigat('/login')
  }
  else{
    setLoding(false)
      seterror(data.message)
  }
}


function submitFormRegister(e){
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
    first_name : Joi.string().min(3).max(10).required(),
    last_name: Joi.string().min(3).max(10).required(),
    age: Joi.number().min(10).max(70).required(),
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
          <h2 className='text-center'>Create My Account!</h2>
          <form onSubmit={submitFormRegister} className='mt-5'>
          {error?<small className=" text-danger">{error}</small>:''}
          {/* {errorList.map((error,index)=>{ if(error.context.label === 'password'){
            return <small key={index} className='text-danger d-block '>password by should start with upperCase then 3 to 8 lowerrCase</small>
          }else{
            return <small key={index} className='text-danger d-block '>{error.message}</small>}
          })} */}
            
            <div className="nameuser d-flex justify-content-between align-items-center my-2">
              <input onChange={getUserData} type="text" name='first_name'placeholder='First Name' id='first_name' className='form-control myInput me-2 py-2'/>
              <input onChange={getUserData} type="text" name='last_name'placeholder='Last Name' id='last_name' className='form-control myInput ms-2 py-2'/>
            </div>
            <div className="nameuser d-flex justify-content-between align-items-center my-2">
            <small className='d-block text-danger'>{errorList.filter((error)=> error.context.label === 'first_name')[0]?.message}</small>
            <small className='d-block text-danger'>{errorList.filter((error)=> error.context.label === 'last_name')[0]?.message}</small>
            </div>
            
            <input onChange={getUserData} type="email" name='email'placeholder='Email Address' id='email' className='form-control myInput my-2 py-2'/>
            <small className='d-block text-danger'>{errorList.filter((error)=> error.context.label === 'email')[0]?.message}</small>
            <input onChange={getUserData} type="number" name='age'placeholder='Age' id='age' className='form-control myInput my-2 py-2'/>
            <small className='d-block text-danger'>{errorList.filter((error)=> error.context.label === 'age')[0]?.message}</small>
            <input onChange={getUserData} type="password" name='password'placeholder='Password' id='password' className='form-control myInput my-2 py-2'/>
            {/* <small className='d-block text-danger'>{errorList.filter((error)=> error.context.label === 'password')[0]?.message}</small> */}
            {errorList.map((error,index)=>{if (error.context.label === 'password'){
              return <small key={index} className='text-danger d-block '>password by should start with upperCase then 3 to 8 lowerrCase</small>
            }else{ return ''}})}
            <div onChange={getUserData} className="submitBtn m-auto my-3">
              <button className='btn submit text-white'>
                {loding?<i className='fas fa-spinner fa-spin'></i>:'Creat Acount'}</button>
            </div>

            <div><p className='text-center'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p></div>
            <hr />
            <div><p className='text-center'>Already a member?<Link to='/login'>Log In </Link></p></div>
            
          </form>

        </div>
      </div>

      </div>
      


    </div>
  </>
}
