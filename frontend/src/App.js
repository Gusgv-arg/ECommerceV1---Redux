import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import ProductScreen from "./screens/productScreen";
import HomeScreen from "./screens/homeScreen";
import CartScreen from "./screens/cartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/signinScreen";
import { signout } from "./redux/actions/userActions";
import RegisterScreen from "./screens/registerScreen";
import ShippingAdrressScreen from "./screens/shippingAdrressScreen";
import PaymentMethodScreen from "./screens/paymentMethodScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen";
import OrderScreen from "./screens/orderScreen";
import ProfileScreen from "./screens/profileScreen";
import OrderHistoryScreen from "./screens/orderHistoryScreen";
import PrivateRoute from "./components/privateRoute";
import AdminRoute from "./components/adminRoute";
import ProductListScreen from "./screens/productListScreen";
import ProductEditScreen from "./screens/productEditScreen";
import OrderListScreen from "./screens/orderListScreen";
import UserListScreen from "./screens/userListScreen";
import UserEditScreen from "./screens/userEditScreen";
import SellerRoute from "./components/sellerRoute";
import SellerScreen from "./screens/sellerScreen";
import SearchBox from "./components/searchBox";
import SearchScreen from "./screens/searchScreen";
import { listProductsCategories } from "./redux/actions/productActions";
import LoadingBox from "./components/loadingBox";
import MessageBox from "./components/messageBox";
import DashboardScreen from "./screens/dashboardScreen";
//import { Routes } from "../node_modules/react-router-dom/dist/index";
import { Routes } from "react-router-dom";

function App() {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const dispatch = useDispatch();

	const signOutHandler = () => {
		dispatch(signout());
	};

	const productCategoryList = useSelector((state) => state.productCategoryList);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList;

	useEffect(() => {
		dispatch(listProductsCategories());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<button
							type="button"
							className="open-sidebar"
							onClick={() => setSidebarIsOpen(true)}
						>
							<i className="fa fa-bars"></i>
						</button>
						<Link to="/" className="brand">
							E-Commerce
						</Link>
					</div>
					<div>
						<SearchBox />
					</div>

					<div>
						<Link to="/cart">
							<i className="fa fa-shopping-cart" />
							{cartItems.length > 0 && (
								<span className="badge">{cartItems.length}</span>
							)}
						</Link>
						{userInfo ? (
							<div className="dropdown">
								<Link to="#">
									{userInfo.name} <i className="fa fa-caret-down"></i>{" "}
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/profile">User Profile</Link>
									</li>
									<li>
										<Link to="/orderhistory">Order History</Link>
									</li>
									<li>
										<Link to="#signout" onClick={signOutHandler}>
											Sign Out
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/signin">Sign In</Link>
						)}

						{userInfo && userInfo.isSeller && (
							<div className="dropdown">
								<Link to="#admin">
									Seller Admin Panel <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/productlist/seller">Products</Link>
									</li>
									<li>
										<Link to="/orderlist/seller">Orders</Link>
									</li>
								</ul>
							</div>
						)}

						{userInfo && userInfo.isAdmin && (
							<div className="dropdown">
								<Link to="#admin">
									Admin Panel <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/dashboard">Dashboard</Link>
									</li>
									<li>
										<Link to="/productlist">Products</Link>
									</li>
									<li>
										<Link to="/orderlist">Orders</Link>
									</li>
									<li>
										<Link to="/userlist">Users</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>

				<aside className={sidebarIsOpen ? "open" : ""}>
					<ul className="categories">
						<li>
							<strong>Categories</strong>
							<button
								onClick={() => setSidebarIsOpen(false)}
								className="close-sidebar"
								type="button"
							>
								<i className="fa fa-close"></i>
							</button>
						</li>
						{loadingCategories ? (
							<LoadingBox></LoadingBox>
						) : errorCategories ? (
							<MessageBox variant="danger">{errorCategories}</MessageBox>
						) : (
							categories.map((c) => (
								<li key={c}>
									<Link
										to={`/search/category/${c}`}
										onClick={() => setSidebarIsOpen(false)}
									>
										{c}
									</Link>
								</li>
							))
						)}
					</ul>
				</aside>

				<main>
					<Routes>
						<Route path="/seller/:id" element={<SellerScreen />}></Route>
						<Route path="/cart" element={<CartScreen />}></Route>
						<Route path="/cart/:id" element={<CartScreen />}></Route>
						<Route
							path="/product/:id"
							element={<ProductScreen />}
							exact
						></Route>
						<Route
							path="/product/:id/edit"
							element={<ProductEditScreen />}
							exact
						></Route>
						<Route path="/signin" element={<SigninScreen />}></Route>
						<Route path="/register" element={<RegisterScreen />}></Route>
						<Route path="/shipping" element={<ShippingAdrressScreen />}></Route>
						<Route path="/payment" element={<PaymentMethodScreen />}></Route>
						<Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
						<Route path="/order/:id" element={<OrderScreen />}></Route>
						<Route
							path="/search/name"
							element={<SearchScreen />}
							exact
						></Route>
						<Route
							path="/search/name/:name"
							element={<SearchScreen />}
							exact
						></Route>
						<Route
							path="/search/category/:category?"
							element={<SearchScreen />}
							exact
						></Route>
						<Route
							path="/search/category/:category/name/:name"
							element={<SearchScreen />}
							exact
						></Route>
						<Route
							path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
							element={<SearchScreen />}
							exact
						></Route>

						<Route
							path="/orderhistory"
							element={<OrderHistoryScreen />}
						></Route>

						<Route
							path="/profile"
							element={
								<PrivateRoute>
									<ProfileScreen />
								</PrivateRoute>
							}
						/>

						<Route
							path="/productlist"
							element={
								<AdminRoute>
									<ProductListScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/productlist/pageNumber/:pageNumber"
							element={
								<AdminRoute>
									<ProductListScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/orderlist"
							element={
								<AdminRoute>
									<OrderListScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/orderlist/pageNumber/:pageNumber"
							element={
								<AdminRoute>
									<OrderListScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/userlist"
							element={
								<AdminRoute>
									<UserListScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/userlist/pageNumber/:pageNumber"
							element={
								<AdminRoute>
									<UserListScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/user/:id/edit"
							element={
								<AdminRoute>
									<UserEditScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/dashboard"
							element={
								<AdminRoute>
									<DashboardScreen />
								</AdminRoute>
							}
						/>

						<Route
							path="/productlist/seller"
							element={
								<SellerRoute>
									<ProductListScreen />
								</SellerRoute>
							}
						/>

						<Route
							path="/orderlist/seller"
							element={
								<SellerRoute>
									<OrderListScreen />
								</SellerRoute>
							}
						/>

						<Route path="/" element={<HomeScreen />} exact></Route>
						
						<Route
							path="/pageNumber/:pageNumber"
							element={<HomeScreen />}							
						></Route>
					</Routes>
				</main>

				<footer className="row center">All rights reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
