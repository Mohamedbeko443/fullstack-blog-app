import "./add-comment.css"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch } from 'react-redux';
import { createComment } from "../../redux/apiCalls/commentApiCall";


export default function AddComment({ postId }) {
    const [text , setText] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(e)
    {
        e.preventDefault();

        if(!text.trim()) return toast.error("Please write something.");
        dispatch(createComment({ text , postId }))
        setText("");
    }

    return (
        <form onSubmit={handleSubmit} className='add-comment' >
            <input 
                type="text" 
                placeholder="Add a comment"
                className="add-comment-input"
                value={text}
                onChange={(e) => setText(e.target.value)}    
            />

            <button type="submit" className="add-comment-btn" >Comment</button>
        </form>
    )
}
