import { Pencil, TextAlignJustify, House, Notebook, BadgePlus, ChartColumn, ArrowRight, UserPlus, X } from 'lucide-react';
import "./header.css";
import { useState } from 'react';
import HeaderLeft from './HeaderLeft';
import Navbar from './Navbar';
import HeaderRight from './HeaderRight';

export default function Header() {
    const [toggle, setToggle] = useState(false);
    return (
        <header className="header">

            <HeaderLeft toggle={toggle} setToggle={setToggle} />

            <Navbar toggle={toggle} setToggle={setToggle} />

            <HeaderRight />
        </header>
    );
}
