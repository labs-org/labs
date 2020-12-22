import axios from "axios";
import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING
} from "./types";

// const headers = {
//     'Content-Type': 'application/json'
//   }
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data,

        }));

};

export const deleteItem = (id) => dispatch => {
   axios.delete(`/${id}`).then(res => dispatch({
       type: DELETE_ITEM,
       payload: id
   }))
};

export const addItem = item => dispatch => {
    axios.post('/', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data,


        }))
    // console.log('hi')
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING,

    }
}