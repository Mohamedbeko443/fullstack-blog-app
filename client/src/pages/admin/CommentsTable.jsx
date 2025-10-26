import "./admin-table.css"
import AdminSidebar from './AdminSidebar';
import Swal from "sweetalert2";



export default function CommentsTable() {


    function deleteCommentHandler() {
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
                Swal.fire(
                    'Deleted!',
                    'Comment has been deleted.',
                    'success'
                );
            }
        })
    }


    return (
        <section className='table-container'>
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Comments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th> Count </th>
                            <th> User </th>
                            <th> Comment </th>
                            <th> Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3, 4].map((item) => (
                            <tr key={item} >
                                <td> {item} </td>
                                <td>
                                    <div className="table-image">
                                        <img className="table-user-image" src="/images/user-avatar.png" alt="fasdf" />
                                        <span className="table-username" > Lionel</span>
                                    </div>
                                </td>
                                <td> thank you for this man  </td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={deleteCommentHandler} >Delete Comment</button>
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
