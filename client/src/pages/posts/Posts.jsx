import "./postPage.css"
import PostList from "../../components/posts/PostList"
import Sidebar from "../../components/sidebar/Sidebar"
import Pagination from './../../components/pagination/Pagination';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPostsCount } from "../../redux/apiCalls/postsApiCall";


export default function Posts() {
  const [page , setPage] = useState(1);
  const dispatch = useDispatch();
  const { postsCount , posts } = useSelector(store => store.post);
  const limit = 3 ;
  const pages = Math.ceil(postsCount / limit);


  useEffect(() => {
    dispatch(fetchPosts(page));
    window.scrollTo(0,0);
  }, [dispatch , page])

  useEffect(() => {
    dispatch(fetchPostsCount());
  }, [dispatch])

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar  />
      </section>
      <Pagination page={page} totalPages={pages} setPage={setPage} />
    </>
  )
}
