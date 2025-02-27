import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { userRegister } from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Login.css';

function Register() {

  const navigate = useNavigate()

  //errors

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  


const fncRegister =(evt: React.FormEvent)=> {
  setEmailError('')
  setPasswordError('')
  evt.preventDefault() // fomun submit ini cancel eder.(Sahe tek edilmez)

  if(name === ''){
    alert('Name is required')
  }else if(email === ''){
    alert('Email is required')
  }else if(password === ''){
    alert('Password is required')
  }else if(password2 === ''){
    alert('Password2 is required')
  }else if(password !== password2){
    alert('Passwords does not match')
  }else {
    
    userRegister (name, email, password).then(response => {
      const status = response.status 
      const Userdata = response.data
    
      if(status === 201){
        toast.success('User has been created')
        setTimeout(() => {
          navigate('/') 
        }, 3000);
      
      }
        else {
          alert('User already exists')  
        }
    }).catch(error => { 
      const paswordError = error.response.data.errors.password
      const emailError = error.response.data.errors.email
      //console.log(error)
      setEmailError (emailError)
      setPasswordError(paswordError)

  

    })
  }

}

  return (
    <>
    <ToastContainer />
     <div className='row'>
<div className='col-12 col-md-3 col-lg-4'></div>
<div className='col-12 col-md-6 col-lg-4'>
  <div className="login-container">
<img className='w-50 d-block mx-auto' src="/Images/register.png" alt="Register" />
<form onSubmit={fncRegister}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input onChange={(evt)=>setName(evt.target.value) }required type ="text" className="form-control" id="name" /> 
     
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={(evt)=>setEmail(evt.target.value) } required type ="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div className="text-danger">{emailError}</div>



  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(evt)=>setPassword(evt.target.value) } required type ="password" className="form-control" id="exampleInputPassword1"/>
    <div className="text-danger">{passwordError}</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label">Password Again</label>
    <input onChange={(evt)=>setPassword2(evt.target.value) } required type ="password" className="form-control" id="exampleInputPassword2"/>
  </div>

 
  <div className='d-flex justify-content-between'>
  <button type="submit" className="btn btn-primary"><i className="fa fa-user-plus"></i> Register</button>
  <NavLink to='/' className='btn btn-danger'><i className="fa fa-times"> </i>Cancel</NavLink>

   </div>
</form>
</div>
<div className='col-12 col-md-3 col-lg-4'></div>
</div>
</div>
    </>
  )
}

export default Register