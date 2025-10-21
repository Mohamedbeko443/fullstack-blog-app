import "./postPage.css"
import PostList from "../../components/posts/PostList"
import Sidebar from "../../components/sidebar/Sidebar"
import { posts , categories } from "../../dummyData"
import Pagination from './../../components/pagination/Pagination';
import { useEffect } from "react";


export default function Posts() {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination/>
    </>
  )
}
