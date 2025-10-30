import { ArrowRight, UserPlus , CircleUserRound , ArrowLeft   } from 'lucide-react'
import { Link } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"
import { useState } from 'react';
import { logoutUser } from '../../redux/apiCalls/authApiCall';

export default function HeaderRight() {
    const { user } = useSelector(store => store.auth);
    const [dropdown , setDropdown] = useState(false);
    const dispatch = useDispatch();

    function handleLogout(){
        setDropdown(false);
        dispatch(logoutUser());
    }

    return (
        <div className="header-right">
            {user ? (
                <>
                    <div className="header-right-user-info">
                        <span onClick={() => setDropdown(prev => !prev)} className="header-right-username">{user.username}</span>
                        <img className="header-right-user-photo" src={user?.profilePhoto.url} alt="user photo" />
                        {dropdown && 
                            (
                                <div className="header-right-dropdown">
                            <Link onClick={() => setDropdown(false)} to={`/profile/${user?._id}`} className="header-dropdown-item" >
                                <CircleUserRound style={{marginTop: "3px", marginRight:"5px"}} />
                                <span>Profile</span>
                            </Link>
                            <div onClick={handleLogout} className="header-dropdown-item">
                                <ArrowLeft style={{marginTop: "5px", marginRight:"5px"}} />
                                <span>Logout</span>
                            </div>
                        </div>
                            )
                        }
                    </div>
                </>
            ) : (
                <>
                    <Link to="/login" className="header-right-link">
                        <ArrowRight className='icon' />
                        <span>Login</span>
                    </Link>
                    <Link to="/register" className="header-right-link">
                        <UserPlus className='icon' />
                        <span>Register</span>
                    </Link>
                </>
            )}
        </div>
    )
}
