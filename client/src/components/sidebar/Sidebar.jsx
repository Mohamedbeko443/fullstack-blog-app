import { Link } from "react-router-dom"
import "./sidebar.css"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

export default function Sidebar() {
    const dispatch = useDispatch();
    const { categories } = useSelector(store => store.category);

    useEffect(() => {
        dispatch(fetchCategories());
    },[dispatch])

    return (
        <div className='sidebar'>
            <h5 className="sidebar-title">CATEGORIES</h5>
            <ul className="sidebar-links">
                {
                    categories.map(category => (
                        <Link key={category?._id} className="sidebar-link" to={`/posts/categories/${category?.title}`}>{category?.title}</Link>
                    ))
                }
            </ul>
        </div>
    )
}
