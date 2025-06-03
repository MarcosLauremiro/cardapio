import { NavLink } from "react-router-dom";
import {
	FiHome,
	FiClock,
	FiClipboard,
	FiUsers,
	FiUser,
	FiLogOut,
} from "react-icons/fi";

export const MenuSide: React.FC = () => {
	const links = [
		{ to: "/", label: "Home", icon: <FiHome /> },
		{ to: "/historico", label: "Histórico", icon: <FiClock /> },
		{ to: "/menu", label: "Cardápio", icon: <FiClipboard /> },
		{ to: "/usuarios", label: "Usuários", icon: <FiUsers /> },
	];

	const bottomLinks = [
		{ to: "/minha-conta", label: "Minha Conta", icon: <FiUser /> },
		{ to: "/sair", label: "Sair", icon: <FiLogOut /> },
	];

	return (
		<aside
			className="flex flex-col justify-between h-screen w-28 p-4"
			style={{ backgroundColor: "var(--color-primary)" }}
		>
			{/* Logo */}
			<NavLink to="/" className="mb-8 flex items-center justify-center">
				<h1 className="h-12 w-auto text-3xl font-light title">
					<span className="font-bold">D</span>P
				</h1>
			</NavLink>

			{/* Main Menu */}
			<nav className="flex-grow">
				<ul className="space-y-2">
					{links.map(({ to, label, icon }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`flex flex-col items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                   text-[var(--color-text)] hover:bg-[var(--color-primary-dark)]
                   ${
											isActive
												? "bg-[var(--color-primary-dark)] font-semibold"
												: ""
										}`
								}
							>
								<span className="text-lg">{icon}</span>
								<span className="text-sm">{label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			{/* Bottom Menu */}
			<footer>
				<ul className="space-y-2">
					{bottomLinks.map(({ to, label, icon }) => (
						<li key={to}>
							<NavLink
								to={to}
								className="flex flex-col items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                           text-[var(--color-text)] hover:bg-[var(--color-primary-dark)]"
							>
								<span className="text-lg">{icon}</span>
								<span className="text-sm">{label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</footer>
		</aside>
	);
};
