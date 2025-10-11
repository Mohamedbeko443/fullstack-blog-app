import { Pencil , X , TextAlignJustify } from "lucide-react";

export default function HeaderLeft({toggle , setToggle}) {
    return (
        <div className="header-left">
            <div className="header-logo">
                <strong>BLOG</strong>
                <Pencil className="pencil-icon" />
            </div>
            <div onClick={() => setToggle(prev => !prev)} className="header-menu">
                {toggle ? <X color='white' className='x-icon' size={"40px"} cursor={"pointer"} /> : <TextAlignJustify className='header-menu' display={"none"} size={"30px"} cursor={"pointer"} color='white' />}
            </div>
        </div>
    )
}
