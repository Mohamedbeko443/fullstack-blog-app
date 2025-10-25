
import { useEffect, useState } from "react";
import { CircleX } from 'lucide-react';
import "./update-profile-modal.css"


const user = {
    username: "mohamed",
    bio: "hello guys"
}

export default function UpdateProfileModal({ setOpen }) {
    const [username , setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [password, setPassword] = useState("");
    


    useEffect(() => {
        function handleCloseEvent(e) {
            if (e.key === "Escape" || e.keyCode === 27) {
                setOpen(false)
            }
        }
        document.addEventListener("keydown", handleCloseEvent);

        return () => {
            document.removeEventListener("keydown", handleCloseEvent);
        }

    }, [setOpen])


    function handleSubmit(e) {
        e.preventDefault();

        const updatedUser = {username , bio};

        if(password.trim())
        {
            updatedUser.password = password;
        }

        console.log(updatedUser);

    }


    return (
        <div onClick={() => setOpen(false)} className="update-profile">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="update-profile-form">
                <abbr title="close"  >
                    <CircleX onClick={() => setOpen(false)} className="update-profile-form-close" />
                </abbr>
                <h1 className="update-profile-title">Update profile</h1>
                <input
                    type="text"
                    className="update-profile-input"
                    placeholder="username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    className="update-profile-input"
                    placeholder="bio..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <input
                    type="password"
                    className="update-profile-input"
                    placeholder="bio..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="update-profile-btn" type="submit"> Update Profile </button>
            </form>
        </div>
    )
}
