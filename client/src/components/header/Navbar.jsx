import { BadgePlus, ChartColumn, House, Notebook } from 'lucide-react'
import React from 'react'

export default function Navbar({ toggle, setToggle }) {
    return (
        <nav style={{ clipPath: toggle && "polygon(0 0 , 100% 0 , 100% 100% , 0 100%)" }} className="navbar">
            <ul className="nav-links">
                <li onClick={() => setToggle(false)} className="nav-link">
                    <House />
                    <span>Home</span>
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <Notebook />
                    <span>Posts</span>
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <BadgePlus />
                    Create
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <ChartColumn />
                    Admin Dashboard
                </li>
            </ul>
        </nav>
    )
}
