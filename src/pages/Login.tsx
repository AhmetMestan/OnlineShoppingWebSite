import React, { useState } from 'react'
import { NavLink, replace, useNavigate } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { userLogin } from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [passwod, setPasswod] = useState('')

const fncLogin =(evt: React.FormEvent)=> {
  evt.preventDefault() // fomun submit ini cancel eder.(Sahe tek edilmez)
userLogin (email, passwod).then(response => {
  const status = response.status 
  const Userdata = response.data
  if(status === 200){
    localStorage.setItem('token', Userdata.data.access_token)
    localStorage.setItem('name', Userdata.data.user.name)
    localStorage.setItem('role', Userdata.data.user.role)
    localStorage.setItem('id', Userdata.data.user.id.toString())
    toast.success('Login is successful! Please wait...')
    setTimeout(() => {
      navigate('/products',{replace: true})}, 2000);
    
  } else {
    alert('invalid email or password')
  }
}).catch(error => { 
  console.log(error)
  alert(error.response.data.message)
})
}

  return (
    <>
    <ToastContainer />
    <div className='row'>
<div className='col-12 col-md-3 col-lg-4'></div>

<div className='col-12 col-md-6 col-lg-4'>

<div className="login-container">
<img className='w-50 d-block mx-auto'  src="/Images/Login.png" alt="Örnek Resim" />
<form onSubmit={fncLogin}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={(evt)=> setEmail(evt.target.value)} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onChange={(evt)=> setPasswod(evt.target.value)}required type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
 <div className='d-flex justify-content-between'>
 <button type="submit" className="btn btn-primary"><i className="fa fa-sign-in"></i> Login</button>
 <NavLink to='/register' className='btn btn-success'><i className="fa fa-user-plus"></i> Register</NavLink>
 </div>
 
</form>

</div>
<div className='col-12 col-md-3 col-lg-4'></div>

    </div>
    </div>
    
    </>
  )
}

export default Login