import { CardOrder } from "../CardOrderComponent";

import { useDroppable } from "@dnd-kit/core";
import type { Order } from "../../types/order.type";

interface ColumnProps {
	title: string;
	orders: Order[];
	status: "WAITING" | "IN_PRODUCTION" | "DONE";
	onSelectOrder: (order: Order) => void;
	bgColorClass?: string;
	hoverBgClass?: string;
	bgCollun?: string
}

export const Column = ({
	title,
	orders,
	status,
	onSelectOrder,
	bgColorClass = "bg-white",
	hoverBgClass = "hover:bg-gray-100",
	bgCollun = ""
}: ColumnProps) => {
	const { setNodeRef } = useDroppable({
		id: status,
	});

	return (
		<div ref={setNodeRef} className="flex-1 max-w-[400px]">
			<CardOrder
				title={title}
				orders={orders}
				onSelectOrder={onSelectOrder}
				bgColorClass={bgColorClass}
				hoverBgClass={hoverBgClass}
				columnId={status}
				bgCollun={bgCollun}
			/>
		</div>
	);
};
