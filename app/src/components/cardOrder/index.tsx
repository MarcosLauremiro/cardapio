import { CiClock1 } from "react-icons/ci";
import type { Order } from "../../types/order.type";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CardOrderProps {
	title: string;
	orders: Order[];
	onSelectOrder: (order: Order) => void;
	emptyMessage?: string;
	bgColorClass?: string;
	hoverBgClass?: string;
	columnId?: string;
}

interface DraggableOrderCardProps {
	order: Order;
	onSelectOrder: (order: Order) => void;
	bgColorClass?: string;
	hoverBgClass?: string;
	columnId?: string;
}

const DraggableOrderCard = ({
	order,
	onSelectOrder,
	hoverBgClass = "hover:bg-gray-100",
	columnId,
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
			className={`border border-[var(--gray-200)] rounded-md p-3 ${hoverBgClass} transition cursor-grab active:cursor-grabbing flex flex-col gap-2`}
		>
			<div className="flex items-center gap-3 border-b border-[var(--gray-300)] pb-4">
				<div className="flex items-center justify-center rounded-full bg-[var(--color-info)] w-8 h-8">
					<span className="text-white">{order.table}</span>
				</div>
				<p className="font-semibold text-[18px] text-[var(--color-info)]">
					Mesa: {order.table}
				</p>
			</div>
			<div>
				<span className="text-[13px] font-light">Cliente: </span>
				<p className="font-semibold">{order.customerName}</p>
			</div>
			<ul className="border-b border-gray-300 pb-4">
				<span className="text-[13px] font-light">Itens: </span>
				{order.products.map((prod) => (
					<li key={prod.product.id} className="flex items-center gap-2">
						<div className="rounded-full bg-[var(--color-info)] w-1 h-1"></div>{" "}
						{prod.product.name}
					</li>
				))}
			</ul>
			<div className="flex items-center justify-between ">
				<span className="text-gray-500 text-[12px]">
					{order.createdAt.toLocaleString()}
				</span>
				<button className="bg-[var(--color-info)] text-[var(--color-text-inverted)] py-1 px-4 rounded-2xl">
					Ver
				</button>
			</div>
		</div>
	);
};

export const CardOrder = ({
	title,
	orders,
	onSelectOrder,
	emptyMessage = "Nenhum pedido.",
	hoverBgClass = "hover:bg-gray-100",
	columnId,
}: CardOrderProps) => {
	return (
		<div
			className={`rounded-lg shadow flex flex-col bg-[var(--gray-50)]`}
			id={columnId}
		>
			<div className="flex items-center gap-2 justify-center py-6">
				<h2 className=" flex items-center gap-2">
					<CiClock1 /> {title}
				</h2>
				<span className="font-semibold">({orders.length})</span>
			</div>

			<div className="flex-1 space-y-3 overflow-y-auto p-4">
				{orders.length > 0 ? (
					orders.map((order) => (
						<DraggableOrderCard
							key={order.id || order.table + order.createdAt.toISOString()}
							order={order}
							onSelectOrder={onSelectOrder}
							hoverBgClass={hoverBgClass}
							columnId={columnId}
						/>
					))
				) : (
					<p className="text-[var(--gray-500)] text-sm">{emptyMessage}</p>
				)}
			</div>
		</div>
	);
};
