import { useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	Navigate,
} from 'react-router-dom';
import LoginPage from './pages/Login-Page';
import NavBar from './components/Nav-Bar';
import MainPage from './pages/Main-Page';
import SignupPage from './pages/Signup-Page';

const Protected = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('TOKEN')
	);

	return isAuthenticated ? (
		<>
			<NavBar />
			<Outlet />
		</>
	) : (
		<Navigate to="/login" />
	);
};

const AccessLoginPageHandler = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('TOKEN')
	);

	return isAuthenticated ? <Navigate to="/" /> : <LoginPage />;
};

const AccessSignupPageHandler = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('TOKEN')
	);

	return isAuthenticated ? <Navigate to="/" /> : <SignupPage />;
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Protected />}
				>
					<Route
						index
						element={<MainPage />}
					/>
				</Route>
				<Route
					path="/login"
					element={<AccessLoginPageHandler />}
				/>
				<Route
					path="/signup"
					element={<AccessSignupPageHandler />}
				/>
				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
