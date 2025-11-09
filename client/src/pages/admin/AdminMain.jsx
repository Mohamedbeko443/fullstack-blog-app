import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard , Users , FileChartColumn , Tags , MessageCircleMore    } from 'lucide-react';
import AddCategoryForm from './AddCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';
import { getUsersCount } from '../../redux/apiCalls/profileApiCall';
import { fetchPostsCount } from '../../redux/apiCalls/postsApiCall';


export default function AdminMain() {
  const dispatch = useDispatch();
  const { categories } = useSelector(store => store.category);
  const { usersCount } = useSelector(store => store.profile);
  const { postsCount } = useSelector(store => store.post);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(fetchPostsCount());
  },[dispatch])

  return (
    <div className='admin-main'>
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className='admin-card-title'>Users</h5>
          <div className="admin-card-count">{usersCount?.count}</div>
          <div className="admin-card-link-wrapper">
            <Link className='admin-card-link' to={"/admin-dashboard/users-table"}> See All Users </Link>
            <div className="admin-card-icon">   <Users /> </div>
          </div>
        </div>

        <div className="admin-main-card">
          <h5 className='admin-card-title'>Posts</h5>
          <div className="admin-card-count">{postsCount}</div>
          <div className="admin-card-link-wrapper">
            <Link className='admin-card-link' to={"/admin-dashboard/posts-table"}> See All Posts </Link>
            <div className="admin-card-icon">   <FileChartColumn /> </div>
          </div>
        </div>

        <div className="admin-main-card">
          <h5 className='admin-card-title'>Categories</h5>
          <div className="admin-card-count">{categories.length}</div>
          <div className="admin-card-link-wrapper">
            <Link className='admin-card-link' to={"/admin-dashboard/categories-table"}> See All Categories </Link>
            <div className="admin-card-icon">   <Tags /> </div>
          </div>
        </div>

        <div className="admin-main-card">
          <h5 className='admin-card-title'>Comments</h5>
          <div className="admin-card-count">1200</div>
          <div className="admin-card-link-wrapper">
            <Link className='admin-card-link' to={"/admin-dashboard/comments-table"}> See All Comments </Link>
            <div className="admin-card-icon">   <MessageCircleMore /> </div>
          </div>
        </div>

      </div>

      <AddCategoryForm/>
    </div>
  )
}
