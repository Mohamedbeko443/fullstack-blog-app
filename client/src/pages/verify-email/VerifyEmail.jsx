import "./verify-email.css";
import { BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function VerifyEmail() {
    const isEmailVerified = true;
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
