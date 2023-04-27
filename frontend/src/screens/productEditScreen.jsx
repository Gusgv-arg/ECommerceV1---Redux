import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import LoadingBox from "../components/loadingBox";
import MessageBox from "../components/messageBox";
import { detailsProduct, updateProduct } from "../redux/actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../redux/constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductEditScreen(props) {
	const navigate = useNavigate();

	const params = useParams();
	const { id: productId } = params;

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState("");
	const [brand, setBrand] = useState("");
	const [description, setDescription] = useState("");

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	const dispatch = useDispatch();

	useEffect(() => {
		if (successUpdate) {
			navigate("/productlist");
		}
		if (!product || product._id !== productId || successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			dispatch(detailsProduct(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setCategory(product.category);
			setStock(product.stock);
			setBrand(product.brand);
			setDescription(product.description);
		}
	}, [product, productId, dispatch, successUpdate, navigate]);

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				category,
				brand,
				stock,
				description,
			})
		);
	};

	const [loadingUpload, setLoadingUpload] = useState(false);
	const [errorUpload, setErrorUpload] = useState("");

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const bodyFormData = new FormData();
		bodyFormData.append("image", file);
		setLoadingUpload(true);
		try {
			const { data } = await Axios.post("/api/uploads", bodyFormData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${userInfo.token}`,
				},
			});
			setImage(data);
			setLoadingUpload(false);
		} catch (error) {
			setErrorUpload(error.message);
			setLoadingUpload(false);
		}
	};

	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Edit Product {productId}</h1>
				</div>
				{loadingUpdate && <LoadingBox></LoadingBox>}
				{errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<>
						<div>
							<label htmlFor="name">Name</label>
							<input
								id="name"
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="price">Price</label>
							<input
								id="price"
								type="text"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="image">Image</label>
							<input
								id="image"
								type="text"
								placeholder="Enter image"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="imageFile">Image File</label>
							<input
								type="file"
								id="imageFile"
								label="Choose Image"
								onChange={uploadFileHandler}
							></input>
							{loadingUpload && <LoadingBox></LoadingBox>}
							{errorUpload && (
								<MessageBox variant="danger">{errorUpload}</MessageBox>
							)}
						</div>
						<div>
							<label htmlFor="category">Category</label>
							<input
								id="category"
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="brand">Brand</label>
							<input
								id="brand"
								type="text"
								placeholder="Enter Brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="stock">Stock</label>
							<input
								id="stock"
								type="text"
								placeholder="Enter stock"
								value={stock}
								onChange={(e) => setStock(e.target.value)}
							></input>
						</div>

						<div>
							<label htmlFor="description">Description</label>
							<textarea
								id="description"
								type="text"
								rows="3"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
						<div>
							<label></label>
							<button className="primary" type="submit">
								Update
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	);
}
