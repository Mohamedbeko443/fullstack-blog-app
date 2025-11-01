import { Link, useParams } from "react-router-dom"
import "./category.css"
import PostList from './../../components/posts/PostList';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchPostsPerCat } from "../../redux/apiCalls/postsApiCall";

export default function Category() {
    const { category } = useParams();
    const dispatch = useDispatch();
    const { postsCate } = useSelector(store => store.post);


    useEffect(() => {
        dispatch(fetchPostsPerCat(category));
        window.scrollTo(0, 0);
    }, [dispatch, category])

    return (
        <section className="category">
            {postsCate.length === 0 ? (
                <>
                    <h1 className="category-not-found">Posts with <span>{category}</span> category not found </h1>
                    <Link to={"/posts"} className="category-not-found-link" > Go to posts page </Link>
                </>
            ) : (
                <>
                    <h1 className="category-title">
                        Posts based on {category}</h1>
                    <PostList posts={postsCate} />
                </>
            )}

        </section>
    )
}
