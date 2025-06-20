import { NavLink } from "react-router-dom";
import {
	FiHome,
	FiClock,
	FiClipboard,
	FiUser,
	FiChevronLeft,
	FiChevronRight,
} from "react-icons/fi";
import { GrConfigure } from "react-icons/gr";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useState } from "react";

export const MenuSide: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const links = [
		{ to: "/", label: "Home", icon: <FiHome /> },
		{ to: "/history", label: "Histórico", icon: <FiClock /> },
		{ to: "/cardapio", label: "Cardapio", icon: <FiClipboard /> },
		{ to: "/menu", label: "?????", icon: <MdOutlineRestaurantMenu /> },
	];

	const bottomLinks = [
		{ to: "/account", label: "Minha Conta", icon: <FiUser /> },
		{ to: "/configure", label: "Ajustes", icon: <GrConfigure /> },
	];

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<aside
			className={`
				flex flex-col justify-between h-screen bg-gradient-to-b from-gray-900 to-gray-800
				shadow-2xl transition-all duration-300 ease-in-out relative
				${isCollapsed ? "w-20" : "w-64"}
			`}
		>
			<button
				onClick={toggleCollapse}
				className="absolute -right-3 top-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 z-10"
				aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
			>
				{isCollapsed ? (
					<FiChevronRight className="w-4 h-4" />
				) : (
					<FiChevronLeft className="w-4 h-4" />
				)}
			</button>

			<div className="p-6">
				<NavLink to="/" className="flex items-center justify-center group">
					{isCollapsed ? (
						<div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
							<span className="text-white font-bold text-xl">D</span>
						</div>
					) : (
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
								<span className="text-white font-bold text-xl">D</span>
							</div>
							<div className="text-white">
								<h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
									Digital
								</h1>
								<p className="text-sm text-gray-400">Painel</p>
							</div>
						</div>
					)}
				</NavLink>
			</div>

			<nav className="flex-grow px-4">
				<ul className="space-y-2">
					{links.map(({ to, label, icon }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out
									${
										isActive
											? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 border-l-4 border-emerald-400"
											: "text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1"
									}
									${isCollapsed ? "justify-center" : ""}
									`
								}
								title={isCollapsed ? label : undefined}
							>
								<span
									className={`text-xl transition-transform duration-200 group-hover:scale-110 ${
										isCollapsed ? "" : "flex-shrink-0"
									}`}
								>
									{icon}
								</span>
								{!isCollapsed && (
									<span className="font-medium text-sm tracking-wide">
										{label}
									</span>
								)}

								{!isCollapsed && (
									<div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
										<div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
									</div>
								)}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<footer className="p-4 border-t border-gray-700">
				<ul className="space-y-2">
					{bottomLinks.map(({ to, label, icon }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out
									${
										isActive
											? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 border-l-4 border-emerald-400"
											: "text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1"
									}
									${isCollapsed ? "justify-center" : ""}
									`
								}
								title={isCollapsed ? label : undefined}
							>
								<span
									className={`text-xl transition-transform duration-200 group-hover:scale-110 ${
										isCollapsed ? "" : "flex-shrink-0"
									}`}
								>
									{icon}
								</span>
								{!isCollapsed && (
									<span className="font-medium text-sm tracking-wide">
										{label}
									</span>
								)}

								{!isCollapsed && (
									<div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
										<div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
									</div>
								)}
							</NavLink>
						</li>
					))}
				</ul>

				{!isCollapsed && (
					<div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
								<FiUser className="w-4 h-4 text-white" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-white truncate">Admin</p>
								<p className="text-xs text-gray-400 truncate">Restaurante DP</p>
							</div>
						</div>
					</div>
				)}
			</footer>
		</aside>
	);
};
