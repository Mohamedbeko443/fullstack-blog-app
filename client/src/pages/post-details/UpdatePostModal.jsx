
import { useEffect, useState } from "react";
import "./update-post.css"
import { CircleX } from 'lucide-react';
import { toast } from "react-toastify";


export default function UpdatePostModal({ setOpen, post }) {
    const [title, setTitle] = useState(post.title);
    const [category, setCategory] = useState(post.category);
    const [des, setDes] = useState(post.description);


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

        if (!title.trim()) return toast.error("Post title is required");
        if (!category.trim()) return toast.error("category  is required!");
        if (!des.trim()) return toast.error("description  is required!");

        console.log({title , category , des});

    }


    return (
        <div onClick={() => setOpen(false)} className="update-post">
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="update-post-form">
                <abbr title="close"  >
                    <CircleX onClick={() => setOpen(false)} className="update-post-form-close" />
                </abbr>
                <h1 className="update-post-title">Update post</h1>
                <input
                    type="text"
                    className="update-post-input"
                    placeholder="title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="update-post-input">
                    <option disabled value="">Select a Category</option>
                    <option value="music">Music</option>
                    <option value="coffee">Coffee</option>
                </select>
                <textarea value={des} onChange={(e) => setDes(e.target.value)} placeholder="description..." className="update-post-textarea" rows={5}></textarea>
                <button className="update-post-btn" type="submit"> Update post </button>
            </form>
        </div>
    )
}
