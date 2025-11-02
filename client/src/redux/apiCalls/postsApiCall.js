import { toast } from "react-toastify";
import request from "../../utils/request";
import { postActions } from "../slices/postSlice"




// get paginated posts
export function fetchPosts(page) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/posts?pageNumber=${page}`);
            dispatch(postActions.setPosts(data));
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}

// get posts count
export function fetchPostsCount() {
    return async (dispatch) => {
        try{
            const { data } = await request.get("/api/posts/count");
            dispatch(postActions.setPostsCount(data));
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}


// get posts per category 
export function fetchPostsPerCat(category) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCate(data));
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}


// create post
export function createPost(newPost) {
    return async (dispatch , getState) => {
        try{
            dispatch(postActions.setLoading());
            await request.post("/api/posts" , newPost , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(postActions.setIsPostCreated());
            setTimeout(() => dispatch(postActions.clearIsPostCreated()) , 2000);
            console.log("post created");
            
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
            dispatch(postActions.clearLoading());
        }
    }
}


