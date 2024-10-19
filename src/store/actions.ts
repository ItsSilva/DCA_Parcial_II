import { Actions } from '../types/store';
import { Screens } from '../types/store';
import { getProducts } from "../service/getProducts"

export const changeBackground = (payload: any) => {
	return {
		action: Actions.CHANGEBACKGROUND,
		payload,
	};
};

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const removeFromCart = (payload: any) => {
    return {
        action: Actions.REMOVE_FROM_CART,
        payload: payload,
    };
};
export const getProductsState = async () => {
    const data = await getProducts()
    console.log(data, "data");
    
    return {
        action: Actions.GET_PRODUCTS,
        payload: data,
    };
};

export const addTask = (payload: any) => {
    return {
        action: Actions.ADD_TASK,
        payload: payload,
    };
};