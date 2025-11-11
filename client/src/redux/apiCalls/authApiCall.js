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

// register
export function registerUser(user, navigate) {
    return async (dispatch) => {
        try{
            const { data } = await request.post("/api/auth/register" , user);
            dispatch(authActions.register(data?.message));
            toast.success(data?.message || "please check your email.");
            if (navigate) {
                navigate("/login");
            }
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




// verify user account
export function verifyEmail(userId , token) {
    return async (dispatch) => {
        try{
            await request.get(`/api/auth/${userId}/verify/${token}`);
            dispatch(authActions.setIsEmailVerified());
            toast.success("your email has been verify successfully!");
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong" );
            console.log(err);
        }
    }
}


