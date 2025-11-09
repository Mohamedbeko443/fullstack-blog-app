import { useState } from "react"
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { createCategory } from "../../redux/apiCalls/categoryApiCall";


export default function AddCategoryForm() {
    const [title , setTitle] = useState("");
    const dispatch = useDispatch();


    function handleSubmit(e) {
        e.preventDefault();

        if(!title.trim()) return toast.error("Category Title is required!");

        dispatch(createCategory({ title }));
        setTitle("");
    }

    return (
        <div className="add-category">
            <h6 className="add-category-title">Add new Category</h6>
            <form onSubmit={handleSubmit} className="add-category-form">
                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>
                    <input 
                        type="text"
                        id="title"
                        value={title}
                        placeholder="Enter category title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className="add-category-btn" type="submit" >Add</button>
            </form>
        </div>
    )
}
