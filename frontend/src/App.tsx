import "./App.scss";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
	Route,
	RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import { UserProvider } from "./contexts/UserContext";
import * as React from "react";
import Contribution from "./pages/Contribution/Contribution";
import { default as BackOfficeHomePage } from "./backOffice/pages/HomePage/BackOfficeHomePage";

const Root = () => {
	return (
		<UserProvider>
			<Outlet /> {/* Outlet is where the child routes will be rendered */}
		</UserProvider>
	);
};

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<Root />}>
					<Route index element={<HomePage />} />
					<Route path="/contribution" element={<Contribution />} />
					<Route path="/dashboard" element={<BackOfficeHomePage />} />
				</Route>
				<Route path="/auth">
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</>
		)
	);

	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}

export default App;
