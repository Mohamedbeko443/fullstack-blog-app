import "./verify-email.css";
import { BadgeCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";


export default function VerifyEmail() {
    const dispatch = useDispatch();
    const { isEmailVerified } = useSelector(store => store.auth);
    const { userId , token } = useParams();

    useEffect(() => {
        dispatch(verifyEmail(userId ,  token))
    },[dispatch , token , userId]);
    

    

    return (
        <section className='verify-email'>
            {
                isEmailVerified ? (
                    <>
                        <BadgeCheck size={"80px"} className="verify-email-icon" />
                        <h1 className="verify-email-title" >Your email has been successfully verified </h1>
                        <Link to={"/login"} className="verify-email-link" >  Go To Login Page </Link>
                    </>
                ) : (
                    <>
                        <h1 className="verify-email-not-found">
                            Not Found
                        </h1>
                    </>
                )
            }
        </section>
    )
}
