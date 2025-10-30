import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice"
import { toast } from 'react-toastify';




// get user profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));
        }
        catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}

// upload profile photo
export function uploadProfilePhoto(newPhoto) {
    return async (dispatch , getState) => {
        try{
            const state = getState();
            const { data } = await request.post("/api/users/profile/profile-photo-upload" , newPhoto , {
                headers: {
                    Authorization: "Bearer " + state.auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            dispatch(authActions.setUserProfile(data.profilePhoto));

            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto = data?.profilePhoto ; 
            localStorage.setItem("userInfo" , JSON.stringify(user));
            toast.success(data.message);
        }
        catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}

// update profile
export function updateProfile(userId , profile) {
    return async (dispatch , getState) => {
        try{
            const state = getState();
            const { data } = await request.put(`/api/users/profile/${userId}` , profile , {
                headers: {
                    Authorization: "Bearer " + state.auth.user.token,
                }
            });
            dispatch(profileActions.updateProfile(data));
            dispatch(authActions.setUsername(data.username));

            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = data?.username ; 
            localStorage.setItem("userInfo" , JSON.stringify(user));
            toast.success(data?.message || "your profile has been updated successfully.");
        } 
        catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}

