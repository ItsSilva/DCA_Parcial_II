export type AppState = {
	screen: string;
	backgroundColor: string;
	username: string;
	id: number;
	products: any;
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
	'CHANGEBACKGROUND' = 'CHANGEBACKGROUND',
	'NAVIGATE' = 'NAVIGATE',
	"REMOVE_FROM_CART" = "REMOVE_FROM_CART",
	"GET_PRODUCTS" = "GET_PRODUCTS",
	"ADD_TASK" = "ADD_TASK",
}

export enum Screens {
	'DASHBOARD' = 'DASHBOARD',
}
