import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";
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

