import type { Order } from "../../types/order.type";

interface OrderDetailModalProps {
	order: Order;
	closeModal: () => void;
}

export const OrderDetailModal = ({
	order,
	closeModal,
}: OrderDetailModalProps) => {
	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-[#00000062]  bg-opacity-50 z-50"
			onClick={closeModal}
		>
			<div
				className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Cabeçalho */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Mesa: {order.table}</h2>
					<button
						onClick={closeModal}
						className="text-gray-500 hover:text-gray-700"
					>
						✕
					</button>
				</div>

				{/* Conteúdo */}
				<div className="space-y-2">
					<p>
						<span className="font-medium">ID do pedido:</span> #{order.id}
					</p>
					<p>
						<span className="font-medium">Cliente:</span> {order.customerName}
					</p>

					{order.products.map((product) => (
						<p>
							<span className="font-medium">Item:</span> {product.product.name}
						</p>
					))}
				</div>

				{/* Botão de fechar */}
				<div className="mt-6 text-right">
					<button
						onClick={closeModal}
						className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
					>
						Fechar
					</button>
				</div>
			</div>
		</div>
	);
};
