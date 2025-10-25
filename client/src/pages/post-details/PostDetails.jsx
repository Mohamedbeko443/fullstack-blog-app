import { Link, useParams } from "react-router-dom"
import { posts } from "../../dummyData"
import { ThumbsUp , Pencil , Trash2  , Image   } from 'lucide-react';
import "./post-details.css"
import { useEffect , useState } from "react";
import  { toast  } from "react-toastify"
import AddComment from './../../components/comments/AddComment';
import CommentList from './../../components/comments/CommentList';
import Swal from "sweetalert2";

import UpdatePostModal from './UpdatePostModal';


export default function PostDetails() {

    const { id } = useParams();
    const [file , setFile] = useState(null);
    const [open , setOpen] = useState(false);

    const post = posts.find(post => post._id === parseInt(id));

    useEffect(()=> {
        window.scrollTo(0,0);
    } , [])


    function handleSubmit(e) {
        e.preventDefault();


        if(!file) return toast.warning("there is NO file")


        alert("image uploaded successfully")
    }


    function deletePostHandler()
    {
        Swal.fire({
            title: "Are you sure",
            text: "once deleted, you will not be able to recover this",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Post has been deleted.',
                    'success'
                );
            }
        })
    }

    return (
        <section className='post-details'>
            <div className="post-details-image-wrapper">
                <img src={ file ? URL.createObjectURL(file) : post.image} alt="image" className="post-details-image" />
                <form onSubmit={handleSubmit} className="update-post-image-form">
                    <label htmlFor="file" className="update-post-label">
                        {/* Image icons */}
                            <Image className="icon" />
                        Select new image
                    </label>
                    <input onChange={(e) => setFile(e.target.files[0])}  style={{display: "none"}} type="file" id="file" name="file" placeholder="" />
                    <button type="submit">upload</button>
                </form>
            </div>

            <h1 className="post-details-title">{post.title}</h1>
            <div className="post-details-user-info">
                <img src={post.user.image} alt="user image" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={"/profile/1"} >{post.user.username}</Link>
                    </strong>
                    <span>{post.createdAt}</span>
                </div>
            </div>

            <p className="post-details-description">
                {post.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, enim voluptatibus eligendi et doloribus similique praesentium, ex quisquam deleniti, aliquam repellendus! Dolor voluptates necessitatibus
                repellat at! Eius suscipit dolor eaque?
            </p>

            <div className="post-details-icon-wrapper">
                <div>
                    <ThumbsUp cursor={"pointer"} />
                    <small>{post.likes.length} likes</small>
                </div>

                <div style={{ display:"flex" , padding: '7px', gap: "12px" }} >
                        <Pencil cursor={"pointer"} onClick={() => setOpen(true)}  color="yellowgreen" />
                        <Trash2 color="red" cursor={"pointer"} onClick={deletePostHandler} />
                </div>
            </div>

            <AddComment/>
            <CommentList/>

            {open && <UpdatePostModal post={post} setOpen={setOpen} />}
        </section>
    )
}
