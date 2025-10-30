import { BadgePlus, ChartColumn, House, Notebook } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

export default function Navbar({ toggle, setToggle }) {
    const { user } = useSelector(store => store.auth);
    // non logged in => home , posts
    // logged in and admin => home , posts , dashboard 
    // logged in and   NOT admin => home , posts , create-post 

    const mainLinks = [
        {
            name: "Home",
            to: "/",
            icon: <House />,
        },
        {
            name: "Posts",
            to: "/posts",
            icon: <Notebook />,
        }
    ]

    const adminLinks = [
        {
            name: "Admin Dashboard",
            to: "/admin-dashboard",
            icon: <ChartColumn />,
            forAdmins: true
        },
    ]

    const userLinks = [
        {
            name: "Create",
            to: "/posts/create-post",
            icon: <BadgePlus />,
            forAdmins: false
        }
    ]
    return (
        <nav style={{ clipPath: toggle && "polygon(0 0 , 100% 0 , 100% 100% , 0 100%)" }} className="navbar">
            <ul className="nav-links">
                {
                    mainLinks.map(link => (
                        <Link key={link.name} className="nav-link" onClick={() => setToggle(false)} to={link.to}>
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))
                }

                {
                    user?.isAdmin && adminLinks.map(link => (
                        <Link key={link.name} className="nav-link" onClick={() => setToggle(false)} to={link.to}>
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))
                }

                {
                    user?.isAdmin === false && userLinks.map(link => (
                        <Link key={link.name} className="nav-link" onClick={() => setToggle(false)} to={link.to}>
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))
                }
            </ul>
        </nav>
    )
}
