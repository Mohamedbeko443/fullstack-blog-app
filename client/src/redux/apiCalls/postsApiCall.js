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

// fetch post by id
export function fetchPostsById(id) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/posts/${id}`);
            dispatch(postActions.setPost(data));
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}

// toggle like
export function toggleLikePost(id) {
    return async (dispatch , getState) => {
        try{
            const { data } = await request.put(`/api/posts/like/${id}` , {} , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(postActions.setLike(data));
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}

// update post image
export function updatePostImage(newImage , postId) {
    return async (dispatch , getState) => {
        try{
                await request.put(`/api/posts/upload-image/${postId}` , newImage , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success("post image has been updated successfully.");
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}


// update post 
export function updatePost(newPost , postId) {
    return async (dispatch , getState) => {
        try{
                const{ data } = await request.put(`/api/posts/${postId}` , newPost , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.setPost(data));
            toast.success("your post has been updated successfully.");
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}


// delete post
export function deletePost( postId ) {
    return async (dispatch , getState) => {
        try{
                await request.delete(`/api/posts/${postId}`  , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postActions.deletePost(postId));
            toast.success("your post has been deleted successfully.");
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}


// get all posts
export function fetchAllPosts() {
    return async (dispatch) => {
        try{
            const { data } = await request.get("/api/posts");
            dispatch(postActions.setPosts(data));
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}