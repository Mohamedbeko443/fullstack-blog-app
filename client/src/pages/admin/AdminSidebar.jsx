import { LayoutDashboard , Users , FileChartColumn , Tags , MessageCircleMore    } from 'lucide-react';
import { Link } from "react-router-dom";

export default function AdminSidebar() {

    return (
        <div className="admin-sidebar">
            <Link to={"/admin-dashboard"} className="admin-sidebar-title">
                    <LayoutDashboard className='icon' />
                    Dashboard
            </Link>

            <ul className='admin-dashboard-list'>
                <Link className='admin-sidebar-link' to={"/admin-dashboard/users-table"}>  <Users className='link-icon' /> Users </Link>
                <Link className='admin-sidebar-link'  to={"/admin-dashboard/posts-table"}>  <FileChartColumn className='link-icon' /> Posts </Link>
                <Link to={"/admin-dashboard/categories-table"} className='admin-sidebar-link' >  <Tags className='link-icon' /> Categories </Link>
                <Link to={"/admin-dashboard/comments-table"} className='admin-sidebar-link'>  <MessageCircleMore className='link-icon' /> Comments </Link>
            </ul>
        </div>
    );
}
