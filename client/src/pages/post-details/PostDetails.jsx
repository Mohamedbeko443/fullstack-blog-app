import { Link, useParams } from "react-router-dom"
import { posts } from "../../dummyData"
import { ThumbsUp , Pencil , Trash2  , Image   } from 'lucide-react';
import "./post-details.css"
import { useEffect , useState } from "react";
import  { toast  } from "react-toastify"


export default function PostDetails() {
    const { id } = useParams();
    const [file , setFile] = useState(null);

    const post = posts.find(post => post._id === parseInt(id));

    useEffect(()=> {
        window.scrollTo(0,0);
    } , [])


    function handleSubmit(e) {
        e.preventDefault();


        if(!file) return toast.warning("there is NO file")


        alert("image uploaded successfully")
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

                <div>
                        <Pencil />
                        <Trash2 />
                </div>
            </div>

            <div>
                add comment form
            </div>

            <div>comment list</div>

        </section>
    )
}
