import { useState } from "react"
import "./form.css"
import { toast } from "react-toastify";


export default function ForgotPassword() {
    const [email, setEmail] = useState("");


    function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim()) return toast.error("email is required!");

        console.log({ email });
    }


    return (
        <section className='form-container'>
            <h1 className="form-title">Forgot Password</h1>

            <form onSubmit={handleSubmit} className="form">

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

                <button className='form-btn' type='submit'> Submit </button>
            </form>
        </section>
    )
}
