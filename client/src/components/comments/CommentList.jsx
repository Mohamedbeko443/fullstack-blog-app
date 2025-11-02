import { Pencil, Trash2 } from "lucide-react"
import "./comment-list.css"
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateCommentModal from './UpdateCommentModal';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from "react-redux";

export default function CommentList({ comments }) {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    function deleteCommentHandler() {
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
                    'Comment has been deleted.',
                    'success'
                );
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
                                <Pencil onClick={() => setOpen(true)} cursor={"pointer"} color="yellowgreen" />
                                <Trash2 onClick={deleteCommentHandler} color="red" cursor={"pointer"} />
                            </div>
                        )
                    }
                </div>
            ))}
            {open && <UpdateCommentModal setOpen={setOpen} />}
        </div>
    )
}
