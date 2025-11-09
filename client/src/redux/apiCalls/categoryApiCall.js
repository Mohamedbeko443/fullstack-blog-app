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

// create category
export function createCategory(newCategory) {
    return async (dispatch , getState) => {
        try{
            const { data } = await request.post("/api/categories" , newCategory , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            } );
            dispatch(categoryActions.addCategory(data));
            toast.success("category has been created successfully.");
            }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong!");
            console.log(err);
        }
    }
}


// delete category
export function deleteCategory(categoryId) {
    return async (dispatch , getState) => {
        try{
            await request.delete(`/api/categories/${categoryId}`  , {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            } );
            dispatch(categoryActions.deleteCategory(categoryId));
            toast.success("category has been deleted successfully.");
            }
        catch(err){
            toast.error(err?.response?.data?.message || "something went wrong!");
            console.log(err);
        }
    }
}

