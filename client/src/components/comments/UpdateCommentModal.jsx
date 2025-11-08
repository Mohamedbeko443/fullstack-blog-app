

import { useEffect, useState } from "react";
import "./update-comment.css"
import { CircleX } from 'lucide-react';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";


export default function UpdateCommentModal({ setOpen , commentForUpdate}) {
    const [text, setText] = useState(commentForUpdate?.text);
    const dispatch = useDispatch();
    console.log(text);

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

        dispatch(updateComment(  { text } , commentForUpdate?._id));
        setOpen(false);
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
