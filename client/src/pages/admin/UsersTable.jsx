import { Link } from "react-router-dom";
import "./admin-table.css"
import AdminSidebar from './AdminSidebar';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getUsersProfile } from "../../redux/apiCalls/profileApiCall";




export default function UsersTable() {
    const dispatch = useDispatch();
    const { profiles , isProfileDeleted } = useSelector(store => store.profile);


    useEffect(() => {
        dispatch(getUsersProfile());
    }, [dispatch , isProfileDeleted])

    function deleteUserHandler(userId) {
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
               dispatch(deleteProfile(userId))
            }
        })
    }


    return (
        <section className='table-container'>
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th> Count </th>
                            <th> User </th>
                            <th> Email </th>
                            <th> Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {profiles?.map((item , index) => (
                            <tr key={item?._id} >
                                <td> {index + 1} </td>
                                <td>
                                    <div className="table-image">
                                        <img className="table-user-image" src={item?.profilePhoto?.url} alt="profile img" />
                                        <span className="table-username" > {item?.username}</span>
                                    </div>
                                </td>
                                <td> {item?.email} </td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link className="table-action-link" to={`/profile/${item?._id}`}>
                                                View Profile
                                            </Link>
                                        </button>
                                        <button onClick={() => deleteUserHandler(item?._id)} >Delete User</button>
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
