import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../redux/actions/userActions";
import LoadingBox from "../components/loadingBox";
import MessageBox from "../components/messageBox";

function RegisterScreen(props) {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get("redirect");
	const redirect = redirectInUrl ? redirectInUrl : "/";

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const dispatch = useDispatch();

	const submitHandler = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords don't match");
		} else {
			dispatch(register(name, email, password));
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, navigate, redirect]);

	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div>
					<h1>Create Account</h1>
				</div>

				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant="danger">{error}</MessageBox>}

				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						placeholder="Enter name"
						required
						onChange={(e) => setName(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						id="email"
						placeholder="Enter email"
						required
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Enter password"
						required
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						placeholder="Confirm password"
						required
						onChange={(e) => setConfirmPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label />
					<button className="primary" type="submit">
						Register
					</button>
				</div>
				<div>
					<label />
					<div>
						Already have an account?{" "}
						<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegisterScreen;
