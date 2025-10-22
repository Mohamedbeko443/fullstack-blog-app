import { useState } from "react"
import "./create-post.css";
import {toast } from "react-toastify"


export default function CreatePost() {

    const [title , setTitle] = useState("");
    const [des , setDes] = useState("");
    const [category , setCategory] = useState("");
    const [file , setFile] = useState(null);


    function handleSubmit(e) {
      e.preventDefault();

      if(!title.trim()) return toast.error("Post title is required");
      if(!category.trim()) return toast.error("category  is required!");
      if(!des.trim()) return toast.error("description  is required!");
      if(!file) return toast.error("file is required!");


      const formData = new FormData();
      formData.append("image" , file);
      formData.append("title" , title);
      formData.append("description" , des);
      formData.append("category" , category);
      
      // send form data to server

      console.log({title , des , category , file});
    }


  return (
    <section className=' create-post'>
      <h1 className="create-post-title">
        Create New Post
      </h1>

    <form onSubmit={handleSubmit}  className="create-post-form">

        <input type="text"
          placeholder='Post Title' 
          className='create-post-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} className='create-post-input'>
            <option disabled value="">
              Select A Category
            </option>
            <option value="music">Music</option>
            <option value="coffee">Coffee</option>
          </select>

          <textarea 
            className='create-post-textarea'
            rows="5"
            placeholder='Post Description'
              value={des}
              onChange={(e) => setDes(e.target.value)}
            >
            </textarea>

        <input 
          type="file" 
          name='file' 
          id='file' 
          className='create-post-upload' 
          onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit" className='create-post-btn'> Create</button>

    </form>

    </section>
  )
}
