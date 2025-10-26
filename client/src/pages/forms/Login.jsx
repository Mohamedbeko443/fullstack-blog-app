import { useState } from "react"
import "./form.css"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";


export default function Login() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");


  function handleSubmit(e){
    e.preventDefault();

    if(!email.trim()) return toast.error("email is required!");
    if(!password.trim()) return toast.error("password is required!");

    console.log({ email , password});
  }


  return (
    <section className='form-container'>
      <h1 className="form-title">Login to your account</h1>

      <form onSubmit={handleSubmit}  className="form">

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

        <button className='form-btn' type='submit'> Login </button>
      </form>

      <div className="form-footer">
          forgot your password? <Link to={'/forgot-password'} >Forgot Password</Link>
      </div>
    </section>
  )
}
