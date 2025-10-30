import { useState } from "react"
import "./form.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";


export default function Register() {
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleSubmit(e){
    e.preventDefault();

    if(!username.trim()) return toast.error("username is required!");
    if(!email.trim()) return toast.error("email is required!");
    if(!password.trim()) return toast.error("password is required!");

    dispatch(registerUser({username , email , password}, navigate))
  }

 

  return (
    <section className='form-container'>
      <h1 className="form-title">Create new account</h1>

      <form onSubmit={handleSubmit}  className="form">

        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            type="text" 
            className='form-input'
            id='username'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className='form-input'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className='form-input'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className='form-btn' type='submit'> Register </button>
      </form>

      <div className="form-footer">
          Already have an account? <Link to={'/login'} >Login</Link>
      </div>
    </section>
  )
}
