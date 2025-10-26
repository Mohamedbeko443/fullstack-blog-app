import "./admin-table.css"
import AdminSidebar from './AdminSidebar';
import Swal from "sweetalert2";



export default function CategoriesTable() {


    function deleteCategoryHandler() {
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
                    'Category has been deleted.',
                    'success'
                );
            }
        })
    }


    return (
        <section className='table-container'>
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th> Count </th>
                            <th> Category Title </th>
                            <th> Action </th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1,2,3].map((item) => (
                            <tr key={item} >
                                <td> {item} </td>
                                <td>
                                    <b>musci</b>
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={deleteCategoryHandler} >Delete Category</button>
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
