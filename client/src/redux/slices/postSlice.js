import { createSlice } from "@reduxjs/toolkit"


const profileSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        postsCount: null,
        postsCate: [],
        loading: false , 
        isPostCreated: false,
        post: null
    },
    
    reducers: {
        setPosts(state , action) {
            state.posts = action.payload
        },
        setPostsCount(state , action) {
            state.postsCount = action.payload
        },
        setPostsCate(state , action) {
            state.postsCate = action.payload
        },
        setLoading(state){
            state.loading = true
        },
        clearLoading(state){
            state.loading = false;
        },
        setIsPostCreated(state) {
            state.isPostCreated = true;
            state.loading = false
        },
        clearIsPostCreated(state) {
            state.isPostCreated = false
        },
        setPost(state , action) {
            state.post = action.payload;
        },
        setLike(state , action) {
            state.post.likes = action.payload.likes;
        },
        deletePost(state  , action) {
            const id = action.payload;
            state.posts = state.posts.filter(post => post._id !== id);
        },
        addCommentToPost(state , action) {
            state.post.comments.push(action.payload);
        },
        updateCommentPost(state , action){
            state.post.comments = state.post.comments.map(comment =>  comment._id === action.payload._id ? action.payload : comment )
        },
        deleteCommentFromPost(state , action) {
            state.post.comments = state.post.comments.filter(comment => comment._id !== action.payload);
        }
    }
})



const postReducer = profileSlice.reducer ;
const postActions = profileSlice.actions;


export { postActions , postReducer }