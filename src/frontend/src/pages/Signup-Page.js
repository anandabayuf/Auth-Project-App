import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../api/Authentication';
import Loader from '../components/Loader';
import signupIllustration from '../assets/signup.jpg';
import MessageToast from '../components/Message-Toast';

export default function SignupPage() {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		passwordconfirm: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		title: '',
		message: '',
	});

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setUser({
			...user,
			[key]: value,
		});
	};

	const handleSignUp = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		const { passwordconfirm, ...data } = user;
		// console.log(data);
		const response = await signUp(data);

		setTimeout(() => {
			setIsLoading(false);
			if (response.status.includes('201')) {
				setToastState({
					...toastState,
					show: true,
					title: 'SUCCESS',
					message: response.message + ' \n' + 'Login To Continue',
				});
				setUser({
					username: '',
					email: '',
					password: '',
					passwordconfirm: '',
				});
			} else {
				setToastState({
					...toastState,
					show: true,
					title: 'ERROR',
					message: response.message,
				});
			}
			setTimeout(() => {
				setToastState({
					...toastState,
					show: false,
					title: '',
					message: '',
				});
			}, 5000);
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
						src={signupIllustration}
						className="figure-img img-fluid rounded"
						alt="login-illustration"
					/>
				</div>
				<div className="col-md-6 col-sm-12">
					<h3
						className="mb-md-5 mb-sm-3"
						style={style.title}
					>
						Sign Up Auth Project App
					</h3>
					<form onSubmit={handleSignUp}>
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
								value={user.username || ''}
								onChange={handleChange}
								placeholder="input your username"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="email"
								className="form-label"
								style={style.label}
							>
								Email
							</label>
							<input
								type="text"
								className="form-control"
								id="email"
								name="email"
								style={style.input}
								value={user.email || ''}
								onChange={handleChange}
								placeholder="input your email"
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
								value={user.password || ''}
								onChange={handleChange}
								placeholder="input your password"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="form-label"
								style={style.label}
							>
								Password Confirmation
							</label>
							<input
								type="password"
								className="form-control"
								id="passwordconfirm"
								name="passwordconfirm"
								autoComplete="on"
								style={style.input}
								value={user.passwordconfirm || ''}
								onChange={handleChange}
								placeholder="re-input your password"
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
										user.username === '' ||
										user.role === '' ||
										user.email === '' ||
										user.password === '' ||
										user.passwordconfirm === '' ||
										user.password !== user.passwordconfirm
									}
								>
									Sign Up
								</button>
							</div>
						)}
					</form>
					<div
						className="mt-md-5 mt-sm-3 text-center"
						style={style.signUpText}
					>
						Already have an account?{' '}
						<Link
							to="/login"
							style={style.link}
						>
							Login
						</Link>
					</div>
				</div>
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
		</div>
	);
}
