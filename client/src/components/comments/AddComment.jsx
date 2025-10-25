import "./add-comment.css"
import { useState } from "react"
import { toast } from "react-toastify"


export default function AddComment() {
    const [text , setText] = useState("");


    function handleSubmit(e)
    {
        e.preventDefault();

        if(!text.trim()) return toast.error("Please write something.");

        console.log({ text });
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
