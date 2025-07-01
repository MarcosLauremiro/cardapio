import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Layout } from "../components/LayoutComponent";
import { Orders } from "../pages/orders";
import { Account } from "../pages/account";
import { History } from "../pages/history";
import { Menu } from "../pages/menu";
import { ProtectRoutes } from "./ProtectRoutes";
import { PricingPlans } from "../pages/plan";
import { setListUser } from "../slices/auth";
import { useGetUserQuery } from "../slices/user";
import { useAppSelector } from "../store/hooks";
import CompleteRegister from "../components/CompleteRegisterComponent";

interface MiddlewareProps {
	children: React.ReactNode;
}

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

	if (data?.status === "pending" || user?.user?.status === "pending") {
		return <Navigate to="/plan" replace />;
	}

	return <>{children}</>;
};

export const RoutesMain = () => {
	const routesWithLayout = [
		{ path: "/home", component: Orders, protected: true, useMiddleware: false },
		{
			path: "/account",
			component: Account,
			protected: true,
			useMiddleware: false,
		},
		{
			path: "/history",
			component: History,
			protected: true,
			useMiddleware: false,
		},
		{ path: "/menu", component: Menu, protected: true, useMiddleware: false },
		{
			path: "/cardapio",
			component: Menu,
			protected: true,
			useMiddleware: false,
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
			path: "/register/:id",
			component: CompleteRegister,
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
