import { useState, type JSX } from "react";
import { AccountInfo } from "../../components/InfoAccountComponent"; // Assumindo que este é o AccountInfo_melhorado.tsx
import { HeaderPage } from "../../components/HeaderPages";
import { Plans } from "../../components/Plans"; // Manter como está
import { useGetUserQuery } from "../../slices/user"; // Manter como está
import { FiCreditCard, FiInfo, FiUsers, FiSettings } from "react-icons/fi";
import { UsersAccount } from "../../components/UsersAccountComponent";

interface Menu {
	id: string;
	name: string;
	icon: JSX.Element;
	page: JSX.Element;
}

export function Account() {
	const { data: user, isLoading, isError } = useGetUserQuery();

	const menu: Menu[] = [
		{ id: "01", name: "Informações", icon: <FiInfo />, page: <AccountInfo /> },
		{ id: "03", name: "Plano", icon: <FiCreditCard />, page: <Plans /> },
		{ id: "04", name: "Usuários", icon: <FiUsers />, page: <UsersAccount /> },
		{ id: "05", name: "Ajustes", icon: <FiSettings />, page: <AccountInfo /> },
	];

	const [current, setCurrent] = useState<Menu>(menu[0]); // Define a primeira aba como padrão

	const handleClick = (item: Menu) => {
		setCurrent(item);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
				<p className="ml-4 text-gray-600">Carregando página da conta...</p>
			</div>
		);
	}

	if (isError || !user) {
		return (
			<div className="flex items-center justify-center h-screen text-red-500">
				<p>Erro ao carregar informações do usuário.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<HeaderPage
				title={`Restaurante ${user?.name}`}
				description="Confira e altere informações do seu restaurante"
				profile={`${user?.name.charAt(0)}`}
			/>

			<nav className="py-6">
				<ul className="flex flex-wrap gap-3">
					{menu.map((item) => (
						<li key={item.id}>
							<button
								onClick={() => handleClick(item)}
								className={`
									flex items-center gap-2 px-4 py-2 rounded-full
									transition-all duration-300 ease-in-out
									${
										current?.id === item.id
											? "bg-emerald-600 text-white shadow-lg"
											: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:shadow-md"
									}
								`}
							>
								{item.icon}
								<span className="font-medium text-sm">{item.name}</span>
							</button>
						</li>
					))}
				</ul>
			</nav>

			<section className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
				{current?.page}
			</section>
		</div>
	);
}
