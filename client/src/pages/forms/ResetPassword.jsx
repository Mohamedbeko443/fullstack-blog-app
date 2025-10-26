import { useState } from "react"
import { toast } from "react-toastify";
import "./form.css"


export default function ResetPassword() {
    const [password, setPassword] = useState("");


    function handleSubmit(e) {
        e.preventDefault();

        if (!password.trim()) return toast.error("password is required!");

        console.log({ password });
    }


    return (
        <section className='form-container'>
            <h1 className="form-title">Reset Password</h1>

            <form onSubmit={handleSubmit} className="form">

                <div className="form-group">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input
                        type="password"
                        className='form-input'
                        id='password'
                        placeholder='Enter your new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className='form-btn' type='submit'> Submit </button>
            </form>

            
        </section>
    )
}
