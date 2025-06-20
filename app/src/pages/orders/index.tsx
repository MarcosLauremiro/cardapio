import { useState } from "react";
import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import type { Order } from "../../types/order.type";
import { Column } from "../../components/CollumOrderComponent";
import { FiFilter, FiSearch, FiRefreshCw } from "react-icons/fi";

export const Orders = () => {
	const [orders, setOrders] = useState<Order[]>([
		{
			id: "1",
			table: "01",
			status: "WAITING",
			createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutos atrás
			products: [
				{
					id: "p1",
					product: {
						_id: "prods",
						name: "Hambúrguer Clássico",
						description: "hamburger com queijo",
						imagePath: "url",
						price: 20,
						ingredients: [{ name: "queijo", icon: "🧀" }],
						category: "123456",
						establishment: "12345676543",
						active: true,
					},
					quantity: 2,
				},
				{
					id: "p12",
					product: {
						_id: "prods2",
						name: "Batata Frita",
						description: "batata frita crocante",
						imagePath: "url",
						price: 12,
						ingredients: [{ name: "batata", icon: "🥔" }],
						category: "123456",
						establishment: "12345676543",
						active: true,
					},
					quantity: 1,
				},
			],
			establishment: "Restaurante Exemplo",
			customerName: "João Silva",
			canceled: false,
		},
		{
			id: "2",
			table: "02",
			status: "IN_PRODUCTION",
			createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutos atrás
			products: [
				{
					id: "p169",
					product: {
						_id: "prods3",
						name: "Pizza Margherita",
						description: "pizza com molho de tomate e queijo",
						imagePath: "url",
						price: 35,
						ingredients: [
							{ name: "queijo", icon: "🧀" },
							{ name: "tomate", icon: "🍅" },
						],
						category: "123456",
						establishment: "12345676543",
						active: true,
					},
					quantity: 1,
				},
			],
			establishment: "Restaurante Exemplo",
			customerName: "Maria Souza",
			canceled: false,
		},
		{
			id: "3",
			table: "03",
			status: "DONE",
			createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
			products: [
				{
					id: "p1673",
					product: {
						_id: "prods4",
						name: "Salada Caesar",
						description: "salada com frango grelhado",
						imagePath: "url",
						price: 18,
						ingredients: [
							{ name: "alface", icon: "🥬" },
							{ name: "frango", icon: "🐔" },
						],
						category: "123456",
						establishment: "12345676543",
						active: true,
					},
					quantity: 1,
				},
			],
			establishment: "Restaurante Exemplo",
			customerName: "Pedro Santos",
			canceled: false,
		},
	]);

	const [activeOrder, setActiveOrder] = useState<Order | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const waitingOrders = orders.filter((order) => order.status === "WAITING");
	const inProductionOrders = orders.filter(
		(order) => order.status === "IN_PRODUCTION"
	);
	const doneOrders = orders.filter((order) => order.status === "DONE");

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const orderId = active.id as string;
		const draggedOrder = orders.find(
			(order) =>
				order.id === orderId ||
				order.table + order.createdAt.toISOString() === orderId
		);

		if (draggedOrder) {
			setActiveOrder(draggedOrder);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveOrder(null);

		const { active, over } = event;

		if (!over) return;

		const activeOrderId = active.id as string;
		const overColumnId = over.id as string;

		if (overColumnId !== active.data.current?.fromColumn) {
			setOrders((prevOrders) => {
				return prevOrders.map((order) => {
					if (
						order.id === activeOrderId ||
						order.table + order.createdAt.toISOString() === activeOrderId
					) {
						return {
							...order,
							status: overColumnId as "WAITING" | "IN_PRODUCTION" | "DONE",
						};
					}
					return order;
				});
			});
		}
	};

	const handleSelectOrder = (order: Order) => {
		console.log("Pedido selecionado:", order);
	};

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
			{/* Header da Página */}
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

					{/* Estatísticas Rápidas */}
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

				{/* Barra de Ferramentas */}
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

			{/* Kanban Board */}
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="flex flex-col xl:flex-row gap-6 overflow-x-auto pb-4">
					<Column
						title="Aguardando"
						orders={waitingOrders}
						status="WAITING"
						onSelectOrder={handleSelectOrder}
					/>

					<Column
						title="Em Preparo"
						orders={inProductionOrders}
						status="IN_PRODUCTION"
						onSelectOrder={handleSelectOrder}
					/>

					<Column
						title="Pronto"
						orders={doneOrders}
						status="DONE"
						onSelectOrder={handleSelectOrder}
					/>
				</div>

				{/* Drag Overlay */}
				{activeOrder &&
					document.body &&
					createPortal(
						<DragOverlay>
							<div className="bg-white rounded-xl shadow-2xl border-2 border-emerald-500 p-5 w-80 transform rotate-3">
								<div className="flex items-center gap-3 mb-4">
									<div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
										{activeOrder.table}
									</div>
									<div>
										<h3 className="font-bold text-lg text-gray-800">
											Mesa {activeOrder.table}
										</h3>
										<p className="text-sm text-gray-500">
											{activeOrder.customerName}
										</p>
									</div>
								</div>
								<div className="text-sm text-gray-600">
									{activeOrder.products.length}{" "}
									{activeOrder.products.length === 1 ? "item" : "itens"}
								</div>
							</div>
						</DragOverlay>,
						document.body
					)}
			</DndContext>
		</div>
	);
};
