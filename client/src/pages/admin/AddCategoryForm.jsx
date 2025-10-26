import { useState } from "react"
import { toast } from "react-toastify";


export default function AddCategoryForm() {
    const [title , setTitle] = useState("");


    function handleSubmit(e) {
        e.preventDefault();

        if(!title.trim()) return toast.error("Category Title is required!");

        console.log({title});
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
