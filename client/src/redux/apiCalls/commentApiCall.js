import request from "../../utils/request";
import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice"
import { toast } from 'react-toastify';




// create comment
export function createComment(newComment) {
    return async (dispatch , getState) => {
        try{
            const { data } = await request.post("/api/comments" , newComment , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
                dispatch(postActions.addCommentToPost(data));
            }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong!");
            console.log(err);
        }
    }
}

// update comment
export function updateComment(comment , commentId) {
    return async (dispatch , getState) => {
        try{
            const { data } = await request.put(`/api/comments/${commentId}` , comment , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
                dispatch(postActions.updateCommentPost(data));
            }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong!");
            console.log(err);
        }
    }
}

// delete comment
export function deleteComment(commentId) {
    return async (dispatch , getState) => {
        try{
            await request.delete(`/api/comments/${commentId}`  , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
                dispatch(commentActions.deleteComment(commentId));
                dispatch(postActions.deleteCommentFromPost(commentId));
            }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong!");
            console.log(err);
        }
    }
}

// get all comments
export function fetchAllComments() {
    return async (dispatch , getState) => {
        try{
            const { data } = await request.get("/api/comments/"  , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
                dispatch(commentActions.setComment(data));
                toast.success("comment deleted successfully.");
                console.log("done");
            }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong!");
            console.log(err);
        }
    }
}

