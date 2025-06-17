import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoutes = () => {
	const token = localStorage.getItem("@EstablishmentToken");

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};
