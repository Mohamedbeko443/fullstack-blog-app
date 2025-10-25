import { Pencil, Trash2 } from "lucide-react"
import "./comment-list.css"
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateCommentModal from './UpdateCommentModal';


export default function CommentList() {

    const [open , setOpen] = useState(false);


    function deleteCommentHandler()
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
                        'Comment has been deleted.',
                        'success'
                    );
                }
            })
        }

    return (
        <div className='comment-list'>
            <h4 className="comment-list-count">2 Comments</h4>
            {[1, 2].map(comment => (
                <div key={comment} className="comment-item">
                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            Mo Medhat
                        </div>
                        <div className="comment-item-time">
                            2 hours ago
                        </div>
                    </div>
                    <p className="comment-item-text">
                        hello this is amazing
                    </p>
                    <div className="comment-item-icon-wrapper">
                        <Pencil onClick={() => setOpen(true)} cursor={"pointer"}  color="yellowgreen"/>
                        <Trash2 onClick={deleteCommentHandler} color="red" cursor={"pointer"} />
                    </div>
                </div>
            ))}
            {open && <UpdateCommentModal setOpen={setOpen} />}
        </div>
    )
}
