import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Layout } from "../components/LayoutComponent";
import { Home } from "../pages/home";
import { Products } from "../pages/Product";
import { Account } from "../pages/account";
import { History } from "../pages/history";
import { Menu } from "../pages/menu";
import { ProtectRoutes } from "./ProtectRoutes";
import { PricingPlans } from "../pages/plan";
import { ForgotPassword } from "../pages/forgot";

export const RoutesMain = () => {
	// type UserStatus =
	// 	| "pending"
	// 	| "active"
	// 	| "inactive"
	// 	| "suspended"
	// 	| "canceled"
	// 	| undefined;
	// const { data, isLoading, isError } = useGetUserQuery();

	// const middlewarePlan = () => {
	// 	const status = data?.status as UserStatus;
	// 	if (
	// 		status === "inactive" ||
	// 		status === "suspended" ||
	// 		status === "canceled"
	// 	) {
	// 		return <Navigate to="/plan" replace />;
	// 	}
	// };

	const routesWithLayout = [
		{ path: "/home", component: Home, protected: true },
		{ path: "/accout", component: Account, protected: true },
		{ path: "/history", component: History, protected: true },
		{ path: "/menu", component: Menu, protected: true },
		{ path: "/products", component: Products, protected: true },
	];

	const routesWithoutLayout = [
		{ path: "/login", component: Login, protected: false },
		{ path: "/register", component: Register, protected: false },
		{ path: "/plan", component: PricingPlans, protected: true },
		{ path: "/forgot-password", component: ForgotPassword, protected: false },
	];

	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />

			{routesWithoutLayout.map(
				({ path, component: Component, protected: isProtected }) =>
					isProtected ? (
						<Route key={path} element={<ProtectRoutes />}>
							<Route path={path} element={<Component />} />
						</Route>
					) : (
						<Route key={path} path={path} element={<Component />} />
					)
			)}

			{routesWithLayout.map(
				({ path, component: Component, protected: isProtected }) =>
					isProtected ? (
						<Route key={path} element={<ProtectRoutes />}>
							<Route
								path={path}
								element={
									<Layout>
										<Component />
									</Layout>
								}
							/>
						</Route>
					) : (
						<Route
							key={path}
							path={path}
							element={
								<Layout>
									<Component />
								</Layout>
							}
						/>
					)
			)}

			<Route path="*" element={<h1>Page Not Found 404</h1>} />
		</Routes>
	);
};
