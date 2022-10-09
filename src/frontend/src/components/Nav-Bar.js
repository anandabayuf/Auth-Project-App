import { Link, useNavigate } from 'react-router-dom';
import { BoxArrowRight } from 'react-bootstrap-icons';
import SideBar from './Side-Bar';
import { useState } from 'react';

export default function NavBar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const navigate = useNavigate();

	const handleSignOut = () => {
		localStorage.removeItem('TOKEN');
		navigate('/login');
	};

	const style = {
		container: {
			borderBottomRightRadius: '10px',
			borderBottomLeftRadius: '10px',
			backgroundColor: '#F9F7F7',
			padding: '10px',
		},
		title: {
			color: '#112D4E',
		},
		menuButton: {
			border: 'none',
		},
		dropdown: {
			borderColor: '#112D4E',
			borderRadius: '50px',
			backgroundColor: '#F9F7F7',
			color: '#112D4E',
		},
		dropdownContainer: {
			borderColor: '#112D4E',
			backgroundColor: '#F9F7F7',
		},
		signOutItemDropdown: {
			color: 'red',
		},
		icon: {
			color: '#112D4E',
		},
	};

	return (
		<>
			<nav
				className="navbar navbar-expand-lg fixed-top shadow"
				style={style.container}
			>
				<div className="container-fluid">
					<Link
						className="navbar-brand"
						to="/"
						style={style.title}
					>
						Auth Project App
					</Link>
					<button
						className="btn btn-outline-danger"
						style={{ borderRadius: '100px' }}
						onClick={() => handleSignOut()}
					>
						<BoxArrowRight size={16} />
					</button>
				</div>
			</nav>

			<SideBar
				show={show}
				handleClose={handleClose}
			/>
		</>
	);
}
