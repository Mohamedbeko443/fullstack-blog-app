import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import "./form.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getResetPassword, resetPassword } from "../../redux/apiCalls/passwordApiCall";


export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isError } = useSelector(store => store.password);
    const { userId , token } = useParams();


    useEffect(() => {
        dispatch(getResetPassword(userId , token))
    },[dispatch , userId , token])


    function handleSubmit(e) {
        e.preventDefault();

        if (!password.trim()) return toast.error("password is required!");

        dispatch(resetPassword(password , { userId , token }))
    }

    if(isError)
    {
        return (
            <section className="form-container">
                <h1>Not Found</h1>
            </section>
        )
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
