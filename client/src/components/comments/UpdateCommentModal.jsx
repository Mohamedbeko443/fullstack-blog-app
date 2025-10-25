

import { useEffect, useState } from "react";
import "./update-comment.css"
import { CircleX } from 'lucide-react';
import { toast } from "react-toastify";


export default function UpdateCommentModal({ setOpen }) {

    const [text, setText] = useState("this is so great");

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

        if (!text.trim()) return toast.error("comment can not be empty!");


        console.log({ text });

    }


    return (
        <div onClick={() => setOpen(false)} className="update-comment">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="update-comment-form">
                <abbr title="close"  >
                    <CircleX onClick={() => setOpen(false)} className="update-comment-form-close" />
                </abbr>
                <h1 className="update-comment-title">Edit comment</h1>
                <input
                    type="text"
                    className="update-comment-input"
                    placeholder="comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                
                <button className="update-comment-btn" type="submit"> Edit comment </button>
            </form>
        </div>
    )
}
