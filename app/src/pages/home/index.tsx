import { useState } from "react";
import { FiHome } from "react-icons/fi";

type Pedido = {
	id: number;
	cliente: string;
	item: string;
};

export const Home = () => {
	// Exemplo de dados iniciais (você pode trocar por fetch/axios/etc)
	const [pendentes] = useState<Pedido[]>([
		{ id: 1, cliente: "João", item: "Hambúrguer" },
		{ id: 2, cliente: "Maria", item: "Pizza" },
	]);
	const [emPreparo] = useState<Pedido[]>([
		{ id: 3, cliente: "Carlos", item: "Salada" },
	]);
	const [prontos] = useState<Pedido[]>([
		{ id: 4, cliente: "Ana", item: "Sushi" },
	]);

	return (
		<div className="flex flex-col gap-5 h-full p-6 bg-gray-100">
			<div className="">
				<h1 className="title text-[20px] font-semibold flex items-center gap-2">
					<FiHome />
					Home
				</h1>
				<p className="text ">Acompanhe os pedidos dos clientes</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Coluna PENDENTES */}
				<div className="bg-white rounded-lg shadow p-4 flex flex-col">
					<h2 className="text-lg font-medium mb-3 text-gray-700">Pendente</h2>
					<div className="flex-1 space-y-3 overflow-y-auto">
						{pendentes.map((pedido) => (
							<div
								key={pedido.id}
								className="border border-gray-200 rounded-md p-3 bg-yellow-50 hover:bg-yellow-100 transition"
							>
								<p className="font-semibold text-gray-800">#{pedido.id}</p>
								<p className="text-gray-600">Cliente: {pedido.cliente}</p>
								<p className="text-gray-600">Item: {pedido.item}</p>
							</div>
						))}
						{pendentes.length === 0 && (
							<p className="text-gray-500 text-sm">Nenhum pedido pendente.</p>
						)}
					</div>
				</div>

				{/* Coluna EM PREPARO */}
				<div className="bg-white rounded-lg shadow p-4 flex flex-col">
					<h2 className="text-lg font-medium mb-3 text-gray-700">Em Preparo</h2>
					<div className="flex-1 space-y-3 overflow-y-auto">
						{emPreparo.map((pedido) => (
							<div
								key={pedido.id}
								className="border border-gray-200 rounded-md p-3 bg-blue-50 hover:bg-blue-100 transition"
							>
								<p className="font-semibold text-gray-800">#{pedido.id}</p>
								<p className="text-gray-600">Cliente: {pedido.cliente}</p>
								<p className="text-gray-600">Item: {pedido.item}</p>
							</div>
						))}
						{emPreparo.length === 0 && (
							<p className="text-gray-500 text-sm">Nenhum pedido em preparo.</p>
						)}
					</div>
				</div>

				{/* Coluna PRONTOS */}
				<div className="bg-white rounded-lg shadow p-4 flex flex-col">
					<h2 className="text-lg font-medium mb-3 text-gray-700">Pronto</h2>
					<div className="flex-1 space-y-3 overflow-y-auto">
						{prontos.map((pedido) => (
							<div
								key={pedido.id}
								className="border border-gray-200 rounded-md p-3 bg-green-50 hover:bg-green-100 transition"
							>
								<p className="font-semibold text-gray-800">#{pedido.id}</p>
								<p className="text-gray-600">Cliente: {pedido.cliente}</p>
								<p className="text-gray-600">Item: {pedido.item}</p>
							</div>
						))}
						{prontos.length === 0 && (
							<p className="text-gray-500 text-sm">Nenhum pedido pronto.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
