import request from "../../utils/request";
import { passwordActions } from "../slices/passwordSlice";
import { toast } from 'react-toastify';




// forgot password
export function forgotPassword(email) {
    return async () => {
        try{
            const { data } = await request.post("/api/password/reset-password-link" , {email} );
            toast.success(data?.message || "success")
        }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong.");
            console.log(err);
        }
    }
}

// get reset password
export function getResetPassword(userId , token) {
    return async (dispatch) => {
        try{
            await request.get(`api/password/reset-password/${userId}/${token}`);
        }
        catch(err){
            console.log(err);
            dispatch(passwordActions.setError());
        }
    }
}

// reset password
export function resetPassword(newPassword , user) {
    return async () => {
        try{
            const { data } =  await request.post(`api/password/reset-password/${user.userId}/${user.token}` , {
                password: newPassword
            });
            toast.success(data?.message || "your password has been reset successfully")
        }
        catch(err){
            console.log(err);
            toast.error(err?.response?.data?.message || "something went wrong");
        }
    }
}

