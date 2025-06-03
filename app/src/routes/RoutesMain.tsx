import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Dashboard } from "../pages/dashboard";
import { Layout } from "../components/layout";
import { Home } from "../pages/home";
import { Menu } from "../pages/menu";
import { Account } from "../pages/account";

export const RoutesMain = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/home" element={<Dashboard />} />
			<Route
				path="/accout"
				element={
					<Layout>
						<Account />
					</Layout>
				}
			/>
			<Route
				path="/menu"
				element={
					<Layout>
						<Menu />
					</Layout>
				}
			/>
		</Routes>
	);
};
