import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/product";
import LoadingBox from "../components/loadingBox";
import MessageBox from "../components/messageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import { listTopSellers } from "../redux/actions/userActions";
import { Link, useParams } from "react-router-dom";

function HomeScreen() {
	const { pageNumber = 1 } = useParams();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const userTopSellerList = useSelector((state) => state.userTopSellerList);
	const {
		loading: loadingSellers,
		error: errorSellers,
		users: sellers,
	} = userTopSellerList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts({pageNumber}));
		dispatch(listTopSellers());
	}, [dispatch, pageNumber]);

	return (
		<div>
			<h2>Top Sellers</h2>
			{loadingSellers ? (
				<LoadingBox />
			) : errorSellers ? (
				<MessageBox variant="danger">{errorSellers}</MessageBox>
			) : (
				<>
					{sellers.length === 0 && <MessageBox>No Sellers Found</MessageBox>}

					<Carousel
						showArrows={true}
						autoPlay
						showThumbs={false}
						showStatus={false}
						infiniteLoop={true}
						interval="3000"
						useKeyboardArrows={true}
					>
						{sellers.map((seller) => (
							<div key={seller._id} className="">
								<Link to={`/seller/${seller._id}`}>
									<img src={seller.seller.logo} alt={seller.seller.name} />
									<p className="legend">
										<strong>{seller.seller.name}</strong>
									</p>
								</Link>
							</div>
						))}
					</Carousel>
					{/* <Carousel showArrows autoPlay showThumbs={false}>
						{products.map((seller) => (
							<div key={seller._id}>
								<Link to={`/seller/${seller._id}`}>
									<img src={seller.image} alt={seller.name} />
									<p className="legend">{seller.name}</p> 
								</Link>
							</div>
						))}
					</Carousel> */}
				</>
			)}

			<h2>Featured Products</h2>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					{products.length === 0 && <MessageBox>No Products Found</MessageBox>}
					<div className="row center">
						{products.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
					<div className="row center pagination">
						{[...Array(pages).keys()].map((x) => (
							<Link
								className={x + 1 === page ? "active" : ""}
								key={x + 1}
								to={`/pageNumber/${x + 1}`}
							>
								{x + 1}
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default HomeScreen;
