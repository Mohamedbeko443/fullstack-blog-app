import request from "../../utils/request";
import { categoryActions } from "../slices/categorySlice";
import { toast } from 'react-toastify';




// fetch all categories
export function fetchCategories() {
    return async (dispatch) => {
        try{
            const { data } = await request.get("/api/categories");
            dispatch(categoryActions.setCategories(data));
            }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong!");
            console.log(err);
        }
    }
}

