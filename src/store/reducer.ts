import { Actions } from '../types/store';

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case Actions.CHANGEBACKGROUND:
			return {
				...currentState,
				backgroundColor: payload,
			};

		case Actions.NAVIGATE:
			return {
				...currentState,
				screen: payload,
			};

			case Actions.REMOVE_FROM_CART: {
                const cartItems = [...currentState.products];
				console.log("PAYLOAD", payload);
				
				console.log(currentState.products);
                const indexToRemove = cartItems.findIndex((item: any) => item.uid === payload.uid);
                
                if (indexToRemove !== -1) {
                    cartItems.splice(indexToRemove, 1);
                }
                
                return {
                    ...currentState,
                    products: cartItems,
                };
            }

			case Actions.GET_PRODUCTS:
				return {
						...currentState,
						products: payload,
					};

					case Actions.ADD_TASK:
						const newTask = {
							uid: new Date().getTime(),
							utitle: payload.utitle,
							description: payload.description,
							completedtasks: false
						};
						return {
							...currentState,
							products: [...currentState.products, newTask],
						};

		default:
			return currentState;
	}
};
