import { ArrowRight, UserPlus } from 'lucide-react'

export default function HeaderRight() {
    return (
        <div className="header-right">
            <button className="header-right-link">
                <ArrowRight className='icon' />
                <span>Login</span>
            </button>
            <button className="header-right-link">
                <UserPlus className='icon' />
                <span>Register</span>
            </button>
        </div>
    )
}
