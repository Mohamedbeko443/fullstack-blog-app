import { Pencil, Trash2 } from "lucide-react"
import "./comment-list.css"
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateCommentModal from './UpdateCommentModal';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

export default function CommentList({ comments }) {
    const [open, setOpen] = useState(false);
    const [updatedComment , setUpdatedComment] = useState(null);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();


    function handleUpdateComment(comment) {
        setUpdatedComment(comment);
        setOpen(true);
    }

    function deleteCommentHandler(id) {
        Swal.fire({
            title: "Are you sure",
            text: "once deleted, you will not be able to recover this comment",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteComment(id));
            }
        })
    }

    return (
        <div className='comment-list'>
            <h4 className="comment-list-count">{comments?.length} Comments</h4>
            {comments?.map(comment => (
                <div key={comment._id} className="comment-item">
                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            {comment.username}
                        </div>
                        <div className="comment-item-time">
                            {
                                formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
                            }
                        </div>
                    </div>
                    <p className="comment-item-text">
                        {comment.text}
                    </p>
                    {
                        user?._id === comment?.user && (
                            <div className="comment-item-icon-wrapper">
                                <Pencil onClick={() => handleUpdateComment(comment)} cursor={"pointer"} color="yellowgreen" />
                                <Trash2 onClick={() => deleteCommentHandler(comment?._id)} color="red" cursor={"pointer"} />
                            </div>
                        )
                    }
                </div>
            ))}
            {open && <UpdateCommentModal  commentForUpdate={updatedComment} setOpen={setOpen} />}
        </div>
    )
}
