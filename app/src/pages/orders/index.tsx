import { useState } from "react";

import type { Order } from "../../types/order.type";

import { FiFilter, FiSearch, FiRefreshCw } from "react-icons/fi";

export const Orders = () => {
	const [orders] = useState<Order[]>([
		{
			id: "order_001",
			table: "Mesa 05",
			status: "WAITING",
			createdAt: new Date("2025-06-30T10:30:00"),
			products: [
				{
					product: {
						name: "Pizza de quatro queijos",
						category: "112",
						ingredients: [{ name: "queijo 1", icon: "🧀" }],
						price: 59.49,
					},
					quantity: 2,
				},
				{
					product: {
						name: "Pizza de calabresa",
						category: "11e3rwed",
						ingredients: [{ name: "queijo 3", icon: "🧀" }],
						price: 59.49,
					},
					quantity: 3,
				},
			],
			userId: "user_001",
			customerName: "João Silva",
			customerPhone: "(11) 99999-1234",
			delivery: {
				isDelivery: false,
				address: {
					street: "rua dos sabias",
					number: "333",
					neighborhood: "Passaros",
					city: "rio de janeiro",
					state: "RJ",
					zipCode: "555555",
					complement: "",
				},
				deliveryFee: 0,
				estimatedTime: "1",
			},
			canceled: false,
			oderNumber: 1001,
		},
		{
			id: "order_002",
			table: "Mesa 05",
			status: "WAITING",
			createdAt: new Date("2025-06-30T10:30:00"),
			products: [
				{
					product: {
						name: "Pizza de quatro queijos",
						category: "112",
						ingredients: [{ name: "queijo 1", icon: "🧀" }],
						price: 59.49,
					},
					quantity: 2,
				},
				{
					product: {
						name: "Pizza de calabresa",
						category: "11e3rwed",
						ingredients: [{ name: "queijo 3", icon: "🧀" }],
						price: 59.49,
					},
					quantity: 3,
				},
			],
			userId: "user_001",
			customerName: "João Silva",
			customerPhone: "(11) 99999-1234",
			delivery: {
				isDelivery: false,
				address: {
					street: "rua dos sabias",
					number: "333",
					neighborhood: "Passaros",
					city: "rio de janeiro",
					state: "RJ",
					zipCode: "555555",
					complement: "",
				},
				deliveryFee: 0,
				estimatedTime: "1",
			},
			canceled: false,
			oderNumber: 1001,
		},
	]);

	const totalOrders = orders.length;
	const avgWaitTime =
		orders.length > 0
			? Math.round(
					orders.reduce((acc, order) => {
						const waitTime =
							(new Date().getTime() - order.createdAt.getTime()) / (1000 * 60);
						return acc + waitTime;
					}, 0) / orders.length
			  )
			: 0;

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mb-8">
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold text-gray-800 mb-2">
							Gerenciamento de Pedidos
						</h1>
						<p className="text-gray-600">
							Acompanhe o status dos pedidos em tempo real
						</p>
					</div>
					<div className="flex gap-4">
						<div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
							<div className="text-2xl font-bold text-emerald-600">
								{totalOrders}
							</div>
							<div className="text-sm text-gray-500">Total de Pedidos</div>
						</div>
						<div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
							<div className="text-2xl font-bold text-blue-600">
								{avgWaitTime}min
							</div>
							<div className="text-sm text-gray-500">Tempo Médio</div>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap gap-3 mt-6">
					<button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
						<FiSearch className="w-4 h-4" />
						Buscar Pedidos
					</button>
					<button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
						<FiFilter className="w-4 h-4" />
						Filtros
					</button>
					<button className="flex items-center gap-2 bg-emerald-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-emerald-700 transition-colors">
						<FiRefreshCw className="w-4 h-4" />
						Atualizar
					</button>
				</div>
			</div>

			<div className="grid grid-cols-2">
				<div className="col-start-1 w-1/2 gap-2 bg-amber-300">
					{orders.map((order) => (
						<div className="bg-gray-400">
							<h1>
								#{order.oderNumber} {order.customerName}
							</h1>
							<div>
								{order.products.map((product) => (
									<div className="flex gap-4">
										<p>{product.product.name}</p>
										<span>x{product.quantity}</span>
									</div>
								))}
							</div>
							<span>{order.status}</span>
						</div>
					))}
				</div>

				<div>

				</div>
			</div>
		</div>
	);
};
