import { Link, useNavigate, useParams } from "react-router-dom"
import { ThumbsUp, Pencil, Trash2, Image } from 'lucide-react';
import "./post-details.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import AddComment from './../../components/comments/AddComment';
import CommentList from './../../components/comments/CommentList';
import Swal from "sweetalert2";

import UpdatePostModal from './UpdatePostModal';
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPostsById, toggleLikePost, updatePostImage } from "../../redux/apiCalls/postsApiCall";


export default function PostDetails() {
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const { post } = useSelector(store => store.post);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        dispatch(fetchPostsById(id));
        window.scrollTo(0, 0);
    }, [id, dispatch])


    function handleSubmit(e) {
        e.preventDefault();
        if (!file) return toast.warning("there is NO file")
        const formData = new FormData();
        formData.append("image" , file);

        dispatch(updatePostImage(formData , post?._id));
    }


    function deletePostHandler() {
        Swal.fire({
            title: "Are you sure",
            text: "once deleted, you will not be able to recover this post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePost(post?._id));
                navigate(`/profile/${user?._id}`);
            }
        })
    }

    return (
        <section className='post-details'>
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file) : post?.image?.url} alt="image" className="post-details-image" />

                {
                    user?._id === post?.user?._id && (
                        <form onSubmit={handleSubmit} className="update-post-image-form">
                            <label htmlFor="file" className="update-post-label">
                                {/* Image icons */}
                                <Image className="icon" />
                                Select new image
                            </label>
                            <input onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} type="file" id="file" name="file" placeholder="" />
                            <button type="submit">upload</button>
                        </form>
                    )
                }

            </div>

            <h1 className="post-details-title">{post?.title}</h1>
            <div className="post-details-user-info">
                <img src={post?.user?.profilePhoto?.url} alt="user image" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user?._id}`} >{post?.user?.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>

            <p className="post-details-description">
                {post?.description}
            </p>

            <div className="post-details-icon-wrapper">
                <div style={{ display: "flex", gap: "10px" }} >
                    {user && ( <ThumbsUp   fill={post?.likes.includes(user?._id) ? "currentColor" : "none"} onClick={() => dispatch(toggleLikePost(post?._id))} style={{ marginTop: "2px" }} cursor={"pointer"} />)}
                    <small>{post?.likes?.length} likes</small>
                </div>

                {user?._id === post?.user?._id && (
                    <div style={{ display: "flex", padding: '7px', gap: "12px" }} >
                        <Pencil cursor={"pointer"} onClick={() => setOpen(true)} color="yellowgreen" />
                        <Trash2 color="red" cursor={"pointer"} onClick={deletePostHandler} />
                    </div>
                )}
            </div>

            {user && <AddComment postId={post?._id} />}
            <CommentList comments={post?.comments} />

            {open && <UpdatePostModal post={post} setOpen={setOpen} />}
        </section>
    )
}
