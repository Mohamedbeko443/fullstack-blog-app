import { createSlice } from "@reduxjs/toolkit"


const profileSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        postsCount: null,
        postsCate: []
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
    }
})



const postReducer = profileSlice.reducer ;
const postActions = profileSlice.actions;


export { postActions , postReducer }