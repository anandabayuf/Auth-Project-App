import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logIn } from '../api/Authentication';
import loginillustration from '../assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Loader from '../components/Loader';

export default function LoginPage() {
	const [credential, setCredential] = useState({
		username: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const [showToast, setShowToast] = useState(false);
	const [errorLoginMessage, setErrorLoginMessage] = useState('');

	const navigate = useNavigate();

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setCredential({
			...credential,
			[key]: value,
		});
	};

	const handleLogIn = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const response = await logIn(credential);
		// console.log(response);
		setTimeout(() => {
			setIsLoading(false);
			if (response.token) {
				localStorage.setItem('TOKEN', `JWT ${response.token}`);
				navigate('/');
			} else {
				setErrorLoginMessage(response.message);
				setShowToast(true);
				setTimeout(() => {
					setShowToast(false);
				}, 5000);
			}
		}, 1000);
	};

	const style = {
		page: {
			padding: '30px',
			backgroundColor: '#F9F7F7',
		},
		container: {
			width: 'auto',
			padding: '30px',
			borderRadius: '30px',
		},
		title: {
			color: '#112D4E',
		},
		label: {
			color: '#3F72AF',
		},
		input: {
			borderRadius: '10px',
			borderColor: '#DBE2EF',
			color: '#3F72AF',
		},
		button: {
			borderRadius: '15px',
			backgroundColor: '#3F72AF',
			color: '#F9F7F7',
		},
		signUpText: {
			color: '#3F72AF',
		},
		link: {
			textDecoration: 'underline',
			color: '#112D4E',
		},
		loader: {
			color: '#3F72AF',
		},
	};

	return (
		<div
			className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
			style={style.page}
		>
			<div
				className="row align-items-center"
				style={style.container}
			>
				<div className="col-md-6 col-sm-12">
					<img
						src={loginillustration}
						className="figure-img img-fluid rounded"
						alt="login-illustration"
					/>
				</div>
				<div className="col-md-6 col-sm-12">
					<h3
						className="mb-md-5 mb-sm-3"
						style={style.title}
					>
						Login Auth Project App
					</h3>
					<form onSubmit={handleLogIn}>
						<div className="mb-3">
							<label
								htmlFor="username"
								className="form-label"
								style={style.label}
							>
								Username
							</label>
							<input
								type="text"
								className="form-control"
								id="username"
								name="username"
								style={style.input}
								value={credential.username || ''}
								onChange={handleChange}
								placeholder="input your username"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="form-label"
								style={style.label}
							>
								Password
							</label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								autoComplete="on"
								style={style.input}
								value={credential.password || ''}
								onChange={handleChange}
								placeholder="input your password"
							/>
						</div>
						{isLoading ? (
							<Loader style={style} />
						) : (
							<div className="d-grid gap-2">
								<button
									type="submit"
									className="btn shadow"
									style={style.button}
									disabled={
										credential.username === '' ||
										credential.password === ''
									}
								>
									Login
								</button>
							</div>
						)}
					</form>
					<div
						className="mt-md-5 mt-sm-3 text-center"
						style={style.signUpText}
					>
						Don't have an account?{' '}
						<Link
							to="/signup"
							style={style.link}
						>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
			<ToastContainer
				className="p-3"
				position="bottom-end"
			>
				<Toast
					show={showToast}
					onClose={() => setShowToast(false)}
				>
					<Toast.Header>
						<strong className="me-auto">Error</strong>
					</Toast.Header>
					<Toast.Body>Message: {errorLoginMessage}</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
}
