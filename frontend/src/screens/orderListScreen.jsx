import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingBox from "../components/loadingBox";
import MessageBox from "../components/messageBox";
import { deleteOrder, listOrders } from "../redux/actions/orderActions";
import { ORDER_DELETE_RESET } from "../redux/constants/orderConstants";

export default function OrderListScreen(props) {
	const navigate = useNavigate()
	
	const { pageNumber = 1 } = useParams();

	const {pathname} = useLocation()
	const sellerMode = pathname.indexOf("/seller") >= 0;

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders, page, pages } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = orderDelete;

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: ORDER_DELETE_RESET });
		dispatch(
			listOrders({ seller: sellerMode ? userInfo._id : "", pageNumber })
		);
	}, [dispatch, successDelete, sellerMode, userInfo._id, pageNumber]);

	const deleteHandler = (order) => {
		if (window.confirm("Are you sure to delete order?")) {
			dispatch(deleteOrder(order._id));
		}
	};

	return (
		<div>
			<div>
				<h1>Orders</h1>

				{loadingDelete && <LoadingBox></LoadingBox>}
				{errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<>
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>USER</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.user.name}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{order.totalPrice.toFixed(2)}</td>
										<td>
											{order.isPaid ? order.paidAt.substring(0, 10) : "No"}
										</td>
										<td>
											{order.isDelivered
												? order.deliveredAt.substring(0, 10)
												: "No"}
										</td>
										<td>
											<button
												type="button"
												className="small"
												onClick={() => {
													navigate(`/order/${order._id}`);
												}}
											>
												Details
											</button>
											<button
												type="button"
												className="small"
												onClick={() => deleteHandler(order)}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="row center pagination">
							{[...Array(pages).keys()].map((x) => (
								<Link
									className={x + 1 === page ? "active" : ""}
									key={x + 1}
									to={`/orderlist/pageNumber/${x + 1}`}
								>
									{x + 1}
								</Link>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
