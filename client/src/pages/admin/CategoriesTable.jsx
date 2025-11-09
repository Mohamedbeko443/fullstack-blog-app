import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css"
import AdminSidebar from './AdminSidebar';
import Swal from "sweetalert2";
import { useEffect } from "react";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";



export default function CategoriesTable() {
    const dispatch = useDispatch();
    const { categories } = useSelector(store => store.category);


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    function deleteCategoryHandler(categoryId) {
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
                dispatch(deleteCategory(categoryId));
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
                        {categories?.map((item , index) => (
                            <tr key={item} >
                                <td> {index + 1} </td>
                                <td>
                                    <b>{item?.title}</b>
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={() => deleteCategoryHandler(item?._id)} >Delete Category</button>
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
