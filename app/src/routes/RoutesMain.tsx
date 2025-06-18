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
import { setListUser } from "../slices/auth";
import { useGetUserQuery } from "../slices/user";
import { useAppSelector } from "../store/hooks";

interface MiddlewareProps {
	children: React.ReactNode;
}

// Componente de Loading
const LoadingSpinner = () => (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
			fontSize: "18px",
		}}
	>
		<div>Carregando...</div>
	</div>
);

const Middleware = ({ children }: MiddlewareProps) => {
	const { data, error, isLoading } = useGetUserQuery();
	const user = useAppSelector(setListUser);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		console.error("Erro ao carregar usuário:", error);
		return <Navigate to="/login" replace />;
	}

	if (
		data?.status === "pending" ||
		user?.response?.user?.status === "pending"
	) {
		return <Navigate to="/plan" replace />;
	}

	return <>{children}</>;
};

export const RoutesMain = () => {
	const routesWithLayout = [
		{ path: "/home", component: Home, protected: true, useMiddleware: true },
		{
			path: "/account",
			component: Account,
			protected: true,
			useMiddleware: true,
		},
		{
			path: "/history",
			component: History,
			protected: true,
			useMiddleware: false,
		},
		{ path: "/menu", component: Menu, protected: true, useMiddleware: true },
		{
			path: "/products",
			component: Products,
			protected: true,
			useMiddleware: true,
		},
	];

	const routesWithoutLayout = [
		{
			path: "/login",
			component: Login,
			protected: false,
			useMiddleware: false,
		},
		{
			path: "/register",
			component: Register,
			protected: false,
			useMiddleware: false,
		},
		{
			path: "/plan",
			component: PricingPlans,
			protected: true,
			useMiddleware: false,
		}, // Plan não deve usar middleware
		{
			path: "/forgot-password",
			component: ForgotPassword,
			protected: false,
			useMiddleware: false,
		},
	];

	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />

			{routesWithoutLayout.map(
				({
					path,
					component: Component,
					protected: isProtected,
					useMiddleware,
				}) =>
					isProtected ? (
						<Route key={path} element={<ProtectRoutes />}>
							<Route
								path={path}
								element={
									useMiddleware ? (
										<Middleware>
											<Component />
										</Middleware>
									) : (
										<Component />
									)
								}
							/>
						</Route>
					) : (
						<Route
							key={path}
							path={path}
							element={
								useMiddleware ? (
									<Middleware>
										<Component />
									</Middleware>
								) : (
									<Component />
								)
							}
						/>
					)
			)}

			{routesWithLayout.map(
				({
					path,
					component: Component,
					protected: isProtected,
					useMiddleware,
				}) =>
					isProtected ? (
						<Route key={path} element={<ProtectRoutes />}>
							<Route
								path={path}
								element={
									useMiddleware ? (
										<Middleware>
											<Layout>
												<Component />
											</Layout>
										</Middleware>
									) : (
										<Layout>
											<Component />
										</Layout>
									)
								}
							/>
						</Route>
					) : (
						<Route
							key={path}
							path={path}
							element={
								useMiddleware ? (
									<Middleware>
										<Layout>
											<Component />
										</Layout>
									</Middleware>
								) : (
									<Layout>
										<Component />
									</Layout>
								)
							}
						/>
					)
			)}

			<Route path="*" element={<h1>Page Not Found 404</h1>} />
		</Routes>
	);
};
