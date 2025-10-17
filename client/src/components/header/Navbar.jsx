import { BadgePlus, ChartColumn, House, Notebook } from 'lucide-react'
import { Link } from "react-router-dom"

export default function Navbar({ toggle, setToggle }) {
    const links = [
        {
            name: "Home",
            to: "/",
            icon: <House/>,
        },
        {
            name: "Posts",
            to: "/posts",
            icon: <Notebook/>
        },
        {
            name: "Create",
            to: "/posts/create-post",
            icon: <BadgePlus/>
        },
        {
            name: "Admin Dashboard",
            to: "/dashboard",
            icon: <ChartColumn/>
        },
    ]
    return (
        <nav style={{ clipPath: toggle && "polygon(0 0 , 100% 0 , 100% 100% , 0 100%)" }} className="navbar">
            <ul className="nav-links">
                {
                    links.map(link => (
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
