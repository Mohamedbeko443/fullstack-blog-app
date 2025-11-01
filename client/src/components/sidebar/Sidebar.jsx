import { Link } from "react-router-dom"
import "./sidebar.css"

export default function Sidebar({ categories }) {
    return (
        <div className='sidebar'>
            <h5 className="sidebar-title">CATEGORIES</h5>
            <ul className="sidebar-links">
                {
                    categories.map(category => (
                        <Link key={category._id} className="sidebar-link" to={`/posts/categories/${category.title}`}>{category.title}</Link>
                    ))
                }
            </ul>
        </div>
    )
}
