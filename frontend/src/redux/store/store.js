import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "../reducers/cartReducers";
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer, orderSummaryReducer } from "../reducers/orderReducer";
import {
	productCategoryListReducer,
	productCreateReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	productUpdateReducer,
	productReviewCreateReducer,
} from "../reducers/productReducer";
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userRegisterReducer,
	userSigninReducer,
	userTopSellerListReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from "../reducers/userReducer";

const initialState = {
	userSignin: {
		userInfo: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem("shippingAddress"))
			: {},
		paymentMethod: 'Paypal'
	},
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,	
	orderPay: orderPayReducer,
	userDetails: userDetailsReducer,
	orderMineList: orderMineListReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	orderList: orderListReducer,
	productDelete: productDeleteReducer,
	orderDelete: orderDeleteReducer,
	orderDeliver: orderDeliverReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userTopSellerList: userTopSellerListReducer,
	productCategoryList: productCategoryListReducer,
	productReviewCreate: productReviewCreateReducer,
	orderSummary: orderSummaryReducer,
});

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhanser(applyMiddleware(thunk))
);

export default store;
