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
import { Column } from "../../components/column";

export const Home = () => {
	const [orders, setOrders] = useState<Order[]>([
		{
			id: "1",
			table: "01",
			status: "WAITING",
			createdAt: new Date(),
			products: [
				{
					id: "p1",
					product: { id: "prod1", name: "X-Burger" },
					quantity: 2,
				},
				{
					id: "p2",
					product: { id: "prod1", name: "X-Burger" },
					quantity: 2,
				},
				{
					id: "p3",
					product: { id: "prod1", name: "X-Burger" },
					quantity: 2,
				},
				{
					id: "p4",
					product: { id: "prod1", name: "X-Burger" },
					quantity: 2,
				},
				{
					id: "p5",
					product: { id: "prod1", name: "X-Burger" },
					quantity: 2,
				},
				{
					id: "p6",
					product: { id: "prod1", name: "X-Burger" },
					quantity: 2,
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
			createdAt: new Date(),
			products: [
				{
					id: "p2",
					product: { id: "prod2", name: "Batata Frita" },
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
			createdAt: new Date(),
			products: [
				{
					id: "p3",
					product: { id: "prod3", name: "Refrigerante" },
					quantity: 3,
				},
			],
			establishment: "Restaurante Exemplo",
			customerName: "Pedro Santos",
			canceled: false,
		},
	]);

	const [activeOrder, setActiveOrder] = useState<Order | null>(null);
	console.log(activeOrder);

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

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="flex gap-6 p-6 h-full bg-gray-100">
				<Column
					title="Espera"
					orders={waitingOrders}
					status="WAITING"
					onSelectOrder={handleSelectOrder}
					hoverBgClass="hover:bg-gray-100"
				/>

				<Column
					title="Preparo"
					orders={inProductionOrders}
					status="IN_PRODUCTION"
					onSelectOrder={handleSelectOrder}
					hoverBgClass="hover:bg-blue-100"
				/>

				<Column
					title="Pronto"
					orders={doneOrders}
					status="DONE"
					onSelectOrder={handleSelectOrder}
					hoverBgClass="hover:bg-green-100"
				/>

				{activeOrder &&
					document.body &&
					createPortal(
						<DragOverlay>
							<div className="border border-gray-200 rounded-md p-3 transition cursor-pointer flex flex-col gap-2 w-64">
								<div className="flex items-center gap-3 border-b border-gray-300 pb-4">
									<div className="flex items-center justify-center rounded-full bg-green-700 w-8 h-8">
										<span className="text-white">{activeOrder.table}</span>
									</div>
									<p className="font-semibold text-[18px] text-green-700">
										Mesa: {activeOrder.table}
									</p>
								</div>
								<div>
									<small className="">Cliente: </small>
									<p className="font-semibold">{activeOrder.customerName}</p>
								</div>
							</div>
						</DragOverlay>,
						document.body
					)}
			</div>
		</DndContext>
	);
};
