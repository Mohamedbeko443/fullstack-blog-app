import { Link } from "react-router-dom";
import "./admin-table.css"
import AdminSidebar from './AdminSidebar';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, fetchAllPosts } from "../../redux/apiCalls/postsApiCall";



export default function PostsTable() {
    const dispatch = useDispatch();
    const { posts } = useSelector(store => store.post);

    useEffect(() => {
        dispatch(fetchAllPosts());
    },[dispatch]);

    function deletePostHandler(postId) {
        Swal.fire({
            title: "Are you sure",
            text: "once deleted, you will not be able to recover this account ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePost(postId));
            }
        })
    }


    return (
        <section className='table-container'>
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th> Count </th>
                            <th> User </th>
                            <th> Post Title </th>
                            <th> Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={post?._id} >
                                <td> {index + 1} </td>
                                <td>
                                    <div className="table-image">
                                        <img className="table-user-image" src={post?.user?.profilePhoto?.url} alt="profile img" />
                                        <span className="table-username" > {post?.user?.username}</span>
                                    </div>
                                </td>
                                <td> {post?.title} </td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link className="table-action-link" to={`/posts/details/${post?._id}`}>
                                                View Post
                                            </Link>
                                        </button>
                                        <button onClick={() => deletePostHandler(post?._id)} >Delete Post</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
