import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import { toast } from 'react-toastify';




//login
export function loginUser(user) {
    return async (dispatch) => {
        try{
            const { data } = await request.post("/api/auth/login" , user);
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo" , JSON.stringify(data));
        }
        catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }
}

//logout
export function logoutUser() {
    return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
}