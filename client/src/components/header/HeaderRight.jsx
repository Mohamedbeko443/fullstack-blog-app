import { ArrowRight, UserPlus } from 'lucide-react'
import { Link } from "react-router-dom"

export default function HeaderRight() {
    return (
        <div className="header-right">
            <Link to="/login" className="header-right-link">
                <ArrowRight className='icon' />
                <span>Login</span>
            </Link>
            <Link to="/register" className="header-right-link">
                <UserPlus className='icon' />
                <span>Register</span>
            </Link>
        </div>
    )
}
