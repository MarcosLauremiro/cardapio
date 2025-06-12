import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Dashboard } from "../pages/dashboard";
import { Layout } from "../components/LayoutComponent";
import { Home } from "../pages/home";
import { Products } from "../pages/Product";
import { Account } from "../pages/account";
import { History } from "../pages/history";
import { Menu } from "../pages/menu";

export const RoutesMain = () => {
	return (
		<Routes>
			<Route
				path="/home"
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="" element={<Dashboard />} />
			<Route path="/plan" element={<Dashboard />} />
			<Route
				path="/accout"
				element={
					<Layout>
						<Account />
					</Layout>
				}
			/>
			<Route
				path="/history"
				element={
					<Layout>
						<History />
					</Layout>
				}
			/>
			<Route
				path="/products"
				element={
					<Layout>
						<Products />
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
			<Route path="*" element={<h1>Page Not Found 404</h1>} />
		</Routes>
	);
};
