import { FiEye, FiUser, FiClock, FiShoppingBag } from "react-icons/fi";
import type { Order } from "../../types/order.type";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CardOrderProps {
	title: string;
	orders: Order[];
	onSelectOrder: (order: Order) => void;
	emptyMessage?: string;
	columnId?: string;
	status:
		| "WAITING"
		| "IN_PRODUCTION"
		| "DONE"
		| "OUT_FOR_DELIVERY"
		| "DELIVERED";
}

interface DraggableOrderCardProps {
	order: Order;
	onSelectOrder: (order: Order) => void;
	columnId?: string;
	status:
		| "WAITING"
		| "IN_PRODUCTION"
		| "DONE"
		| "OUT_FOR_DELIVERY"
		| "DELIVERED";
}

const getTimeElapsed = (createdAt: Date) => {
	const now = new Date();
	const diffInMinutes = Math.floor(
		(now.getTime() - createdAt.getTime()) / (1000 * 60)
	);

	if (diffInMinutes < 60) {
		return `${diffInMinutes}min`;
	} else {
		const hours = Math.floor(diffInMinutes / 60);
		const minutes = diffInMinutes % 60;
		return `${hours}h ${minutes}min`;
	}
};

const getUrgencyLevel = (createdAt: Date, status: string) => {
	const diffInMinutes = Math.floor(
		(new Date().getTime() - createdAt.getTime()) / (1000 * 60)
	);

	if (status === "WAITING" && diffInMinutes > 15) return "high";
	if (status === "IN_PRODUCTION" && diffInMinutes > 30) return "high";
	if (diffInMinutes > 10) return "medium";
	return "low";
};

const DraggableOrderCard = ({
	order,
	onSelectOrder,
	columnId,
	status,
}: DraggableOrderCardProps) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: order.id || order.table + order.createdAt.toISOString(),
			data: {
				order,
				fromColumn: columnId,
				type: "order",
			},
		});

	const style = {
		transform: CSS.Translate.toString(transform),
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 999 : 1,
	};

	const urgencyLevel = getUrgencyLevel(order.createdAt, status);
	const timeElapsed = getTimeElapsed(order.createdAt);

	const urgencyStyles = {
		high: "border-l-4 border-red-500 bg-red-50/50",
		medium: "border-l-4 border-yellow-500 bg-yellow-50/50",
		low: "border-l-4 border-green-500",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={() => {
				if (!isDragging) {
					onSelectOrder(order);
				}
			}}
			className={`
				bg-white rounded-xl shadow-md border border-gray-200
				${urgencyStyles[urgencyLevel]}
				p-5 cursor-grab active:cursor-grabbing
				transition-all duration-300 ease-in-out
				hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]
				group
			`}
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-md">
						{order.table}
					</div>
					<div>
						<h3 className="font-bold text-lg text-gray-800">
							Mesa {order.table}
						</h3>
						<div className="flex items-center gap-1 text-sm text-gray-500">
							<FiClock className="w-3 h-3" />
							<span>{timeElapsed}</span>
						</div>
					</div>
				</div>

				{urgencyLevel === "high" && (
					<div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
						Urgente
					</div>
				)}
			</div>

			<div className="mb-4 p-3 bg-gray-50 rounded-lg">
				<div className="flex items-center gap-2 mb-1">
					<FiUser className="w-4 h-4 text-gray-500" />
					<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
						Cliente
					</span>
				</div>
				<p className="font-semibold text-gray-800">{order.customerName}</p>
			</div>

			<div className="mb-4">
				<div className="flex items-center gap-2 mb-2">
					<FiShoppingBag className="w-4 h-4 text-gray-500" />
					<span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
						Itens ({order.products.length})
					</span>
				</div>
				<ul className="space-y-1 max-h-24 overflow-y-auto">
					{order.products.slice(0, 3).map((prod) => (
						<li
							key={prod.id}
							className="flex items-center justify-between text-sm"
						>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
								<span className="text-gray-700">{prod.product.name}</span>
							</div>
							<span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
								{prod.quantity}x
							</span>
						</li>
					))}
					{order.products.length > 3 && (
						<li className="text-xs text-gray-500 italic">
							+{order.products.length - 3} itens adicionais
						</li>
					)}
				</ul>
			</div>

			<div className="flex items-center justify-between pt-3 border-t border-gray-100">
				<div className="text-xs text-gray-500">
					{order.createdAt.toLocaleTimeString("pt-BR", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</div>
				<button
					className="
						bg-emerald-600 hover:bg-emerald-700
						text-white px-4 py-2 rounded-lg
						text-sm font-medium
						transition-all duration-200
						flex items-center gap-2
						group-hover:shadow-md
						transform hover:scale-105
					"
					onClick={(e) => {
						e.stopPropagation();
						onSelectOrder(order);
					}}
				>
					<FiEye className="w-4 h-4" />
					Ver Detalhes
				</button>
			</div>
		</div>
	);
};

export const CardOrder = ({
	orders,
	onSelectOrder,
	emptyMessage = "Nenhum pedido nesta etapa.",
	columnId,
	status,
}: CardOrderProps) => {
	return (
		<div className="space-y-4">
			{orders.length > 0 ? (
				orders.map((order) => (
					<DraggableOrderCard
						key={order.id || order.table + order.createdAt.toISOString()}
						order={order}
						onSelectOrder={onSelectOrder}
						columnId={columnId}
						status={status}
					/>
				))
			) : (
				<div className="text-center py-12">
					<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<FiShoppingBag className="w-8 h-8 text-gray-400" />
					</div>
					<p className="text-gray-500 text-sm font-medium">{emptyMessage}</p>
					<p className="text-gray-400 text-xs mt-1">
						Os pedidos aparecerão aqui quando chegarem
					</p>
				</div>
			)}
		</div>
	);
};
