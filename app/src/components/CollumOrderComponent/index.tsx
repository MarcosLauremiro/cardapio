import { CardOrder } from "../CardOrderComponent";
import { useDroppable } from "@dnd-kit/core";
import type { Order } from "../../types/order.type";
import { FiClock, FiChevronLeft, FiCheckCircle } from "react-icons/fi";

interface ColumnProps {
	title: string;
	orders: Order[];
	status: "WAITING" | "IN_PRODUCTION" | "DONE";
	onSelectOrder: (order: Order) => void;
	bgColorClass?: string;
	hoverBgClass?: string;
	bgCollun?: string;
}

const getColumnConfig = (status: "WAITING" | "IN_PRODUCTION" | "DONE") => {
	switch (status) {
		case "WAITING":
			return {
				bgColor: "bg-orange-50",
				borderColor: "border-orange-200",
				titleColor: "text-orange-700",
				icon: <FiClock className="w-5 h-5" />,
				badgeColor: "bg-orange-500",
			};
		case "IN_PRODUCTION":
			return {
				bgColor: "bg-blue-50",
				borderColor: "border-blue-200",
				titleColor: "text-blue-700",
				icon: <FiChevronLeft className="w-5 h-5" />,
				badgeColor: "bg-blue-500",
			};
		case "DONE":
			return {
				bgColor: "bg-green-50",
				borderColor: "border-green-200",
				titleColor: "text-green-700",
				icon: <FiCheckCircle className="w-5 h-5" />,
				badgeColor: "bg-green-500",
			};
		default:
			return {
				bgColor: "bg-gray-50",
				borderColor: "border-gray-200",
				titleColor: "text-gray-700",
				icon: <FiClock className="w-5 h-5" />,
				badgeColor: "bg-gray-500",
			};
	}
};

export const Column = ({
	title,
	orders,
	status,
	onSelectOrder,
}: ColumnProps) => {
	const { setNodeRef } = useDroppable({
		id: status,
	});

	const config = getColumnConfig(status);

	return (
		<div
			ref={setNodeRef}
			className={`
				flex-1 min-w-[320px] max-w-[400px]
				${config.bgColor} ${config.borderColor}
				border-2 rounded-xl shadow-lg
				transition-all duration-300 ease-in-out
				hover:shadow-xl hover:scale-[1.02]
			`}
		>
			{/* Header da Coluna */}
			<div className="p-6 border-b border-gray-200/50">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div
							className={`${config.badgeColor} p-2 rounded-lg text-white shadow-md`}
						>
							{config.icon}
						</div>
						<div>
							<h2 className={`font-bold text-xl ${config.titleColor}`}>
								{title}
							</h2>
							<p className="text-sm text-gray-500">
								{orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
							</p>
						</div>
					</div>

					{/* Badge com contador */}
					<div
						className={`
						${config.badgeColor} text-white
						rounded-full w-8 h-8
						flex items-center justify-center
						font-bold text-sm shadow-md
					`}
					>
						{orders.length}
					</div>
				</div>
			</div>

			{/* Conteúdo da Coluna */}
			<div className="p-4">
				<CardOrder
					title={title}
					orders={orders}
					onSelectOrder={onSelectOrder}
					columnId={status}
					status={status}
				/>
			</div>
		</div>
	);
};
