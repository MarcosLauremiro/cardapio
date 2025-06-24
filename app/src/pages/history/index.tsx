import { useState, useMemo } from "react";
import {
	FiSearch,
	FiDownload,
	FiRefreshCw,
	FiClipboard,
	FiDollarSign,
	FiCheckCircle,
	FiXCircle,
	FiEye,
	FiUser,
	FiShoppingBag,
	FiCalendar,
	FiX,
} from "react-icons/fi";

// Tipos para o histórico de pedidos
interface HistoryOrder {
	id: string;
	table: string;
	customerName: string;
	createdAt: Date;
	completedAt?: Date;
	canceledAt?: Date;
	status: "COMPLETED" | "CANCELED";
	totalValue: number;
	preparationTime: number; // em minutos
	paymentMethod: string;
	products: Array<{
		id: string;
		name: string;
		quantity: number;
		price: number;
	}>;
	notes?: string;
}

export function History() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter] = useState<"ALL" | "COMPLETED" | "CANCELED">("ALL");
	const [dateFilter, setDateFilter] = useState<
		"TODAY" | "WEEK" | "MONTH" | "ALL"
	>("ALL");
	const [selectedOrder, setSelectedOrder] = useState<HistoryOrder | null>(null);

	// Dados mock para o histórico
	const historyOrders: HistoryOrder[] = useMemo(
		() => [
			{
				id: "H001",
				table: "01",
				customerName: "João Silva",
				createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
				completedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
				status: "COMPLETED",
				totalValue: 45.5,
				preparationTime: 25,
				paymentMethod: "Cartão de Crédito",
				products: [
					{ id: "p1", name: "Hambúrguer Clássico", quantity: 2, price: 20.0 },
					{ id: "p2", name: "Batata Frita", quantity: 1, price: 5.5 },
				],
			},
			{
				id: "H002",
				table: "03",
				customerName: "Maria Santos",
				createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
				completedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
				status: "COMPLETED",
				totalValue: 32.0,
				preparationTime: 18,
				paymentMethod: "PIX",
				products: [
					{ id: "p3", name: "Pizza Margherita", quantity: 1, price: 32.0 },
				],
			},
			{
				id: "H003",
				table: "05",
				customerName: "Pedro Costa",
				createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
				canceledAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000),
				status: "CANCELED",
				totalValue: 28.0,
				preparationTime: 0,
				paymentMethod: "Dinheiro",
				products: [
					{ id: "p4", name: "Salada Caesar", quantity: 2, price: 14.0 },
				],
				notes: "Cliente desistiu do pedido",
			},
			{
				id: "H004",
				table: "02",
				customerName: "Ana Oliveira",
				createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 horas atrás
				completedAt: new Date(Date.now() - 7.5 * 60 * 60 * 1000),
				status: "COMPLETED",
				totalValue: 67.5,
				preparationTime: 35,
				paymentMethod: "Cartão de Débito",
				products: [
					{ id: "p5", name: "Hambúrguer Premium", quantity: 1, price: 35.0 },
					{ id: "p6", name: "Refrigerante", quantity: 2, price: 8.0 },
					{ id: "p7", name: "Sobremesa", quantity: 1, price: 16.5 },
				],
			},
		],
		[]
	);

	// Filtrar pedidos
	const filteredOrders = useMemo(() => {
		return historyOrders.filter((order) => {
			// Filtro de busca
			const matchesSearch =
				order.table.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.id.toLowerCase().includes(searchTerm.toLowerCase());

			// Filtro de status
			const matchesStatus =
				statusFilter === "ALL" || order.status === statusFilter;

			// Filtro de data (simplificado)
			const matchesDate = dateFilter === "ALL"; // Por simplicidade, mostrando todos

			return matchesSearch && matchesStatus && matchesDate;
		});
	}, [historyOrders, searchTerm, statusFilter, dateFilter]);

	// Calcular métricas
	const metrics = useMemo(() => {
		const completedOrders = historyOrders.filter(
			(order) => order.status === "COMPLETED"
		);
		const canceledOrders = historyOrders.filter(
			(order) => order.status === "CANCELED"
		);
		const totalRevenue = completedOrders.reduce(
			(sum, order) => sum + order.totalValue,
			0
		);
		const avgPreparationTime =
			completedOrders.length > 0
				? Math.round(
						completedOrders.reduce(
							(sum, order) => sum + order.preparationTime,
							0
						) / completedOrders.length
				  )
				: 0;

		return {
			totalOrders: historyOrders.length,
			completedOrders: completedOrders.length,
			canceledOrders: canceledOrders.length,
			totalRevenue,
			avgPreparationTime,
		};
	}, [historyOrders]);

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* Header da Página */}
			<div className="mb-8">
				<div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-lg text-white">
					<h1 className="text-3xl font-bold mb-2">Histórico de Pedidos</h1>
					<p className="text-emerald-100">
						Visualize e gerencie todos os pedidos passados do seu restaurante
					</p>
				</div>
			</div>

			{/* Métricas Rápidas */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500">
								Total de Pedidos
							</p>
							<p className="text-2xl font-bold text-gray-800">
								{metrics.totalOrders}
							</p>
						</div>
						<div className="bg-emerald-100 p-3 rounded-lg">
							<FiClipboard className="w-6 h-6 text-emerald-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500">Receita Total</p>
							<p className="text-2xl font-bold text-gray-800">
								{formatCurrency(metrics.totalRevenue)}
							</p>
						</div>
						<div className="bg-green-100 p-3 rounded-lg">
							<FiDollarSign className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500">Concluídos</p>
							<p className="text-2xl font-bold text-gray-800">
								{metrics.completedOrders}
							</p>
						</div>
						<div className="bg-green-100 p-3 rounded-lg">
							<FiCheckCircle className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500">Cancelados</p>
							<p className="text-2xl font-bold text-gray-800">
								{metrics.canceledOrders}
							</p>
						</div>
						<div className="bg-red-100 p-3 rounded-lg">
							<FiXCircle className="w-6 h-6 text-red-600" />
						</div>
					</div>
				</div>
			</div>

			{/* Barra de Ferramentas */}
			<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-8">
				<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
					{/* Busca */}
					<div className="relative flex-1 max-w-md">
						<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<input
							type="text"
							placeholder="Buscar por mesa, cliente ou ID..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>

					{/* Filtros */}
					<div className="flex flex-wrap gap-3">
						{/* Filtro de Status */}
						<select
							value={statusFilter}
							onChange={(e) =>
								setDateFilter(e.target.value as typeof dateFilter)
							}
							className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
						>
							<option value="ALL">Todos os Status</option>
							<option value="COMPLETED">Concluídos</option>
							<option value="CANCELED">Cancelados</option>
						</select>

						{/* Filtro de Data */}
						<select
							value={dateFilter}
							onChange={(e) =>
								setDateFilter(e.target.value as typeof dateFilter)
							}
							className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
						>
							<option value="ALL">Todos os Períodos</option>
							<option value="TODAY">Hoje</option>
							<option value="WEEK">Últimos 7 dias</option>
							<option value="MONTH">Últimos 30 dias</option>
						</select>

						{/* Botões de Ação */}
						<button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
							<FiDownload className="w-4 h-4" />
							Exportar
						</button>

						<button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
							<FiRefreshCw className="w-4 h-4" />
							Atualizar
						</button>
					</div>
				</div>
			</div>

			{/* Lista de Pedidos */}
			<div className="bg-white rounded-xl shadow-md border border-gray-200">
				<div className="p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-800">
						Pedidos ({filteredOrders.length})
					</h2>
				</div>

				<div className="divide-y divide-gray-200">
					{filteredOrders.length > 0 ? (
						filteredOrders.map((order) => (
							<div
								key={order.id}
								className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
								onClick={() => setSelectedOrder(order)}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										{/* Status Badge */}
										<div
											className={`
											w-3 h-3 rounded-full
											${order.status === "COMPLETED" ? "bg-green-500" : "bg-red-500"}
										`}
										/>

										{/* Informações Principais */}
										<div>
											<div className="flex items-center gap-3 mb-1">
												<span className="font-semibold text-lg text-gray-800">
													Mesa {order.table}
												</span>
												<span className="text-sm text-gray-500">
													#{order.id}
												</span>
											</div>
											<div className="flex items-center gap-4 text-sm text-gray-600">
												<span className="flex items-center gap-1">
													<FiUser className="w-4 h-4" />
													{order.customerName}
												</span>
												<span className="flex items-center gap-1">
													<FiCalendar className="w-4 h-4" />
													{formatDate(order.createdAt)} às{" "}
													{formatTime(order.createdAt)}
												</span>
												<span className="flex items-center gap-1">
													<FiShoppingBag className="w-4 h-4" />
													{order.products.length}{" "}
													{order.products.length === 1 ? "item" : "itens"}
												</span>
											</div>
										</div>
									</div>

									{/* Valor e Ações */}
									<div className="flex items-center gap-4">
										<div className="text-right">
											<p className="text-xl font-bold text-gray-800">
												{formatCurrency(order.totalValue)}
											</p>
											<p
												className={`text-sm font-medium ${
													order.status === "COMPLETED"
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{order.status === "COMPLETED"
													? "Concluído"
													: "Cancelado"}
											</p>
										</div>
										<button className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors">
											<FiEye className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="p-12 text-center">
							<FiClipboard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-gray-800 mb-2">
								Nenhum pedido encontrado
							</h3>
							<p className="text-gray-600">
								Tente ajustar os filtros ou termos de busca.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Modal de Detalhes do Pedido */}
			{selectedOrder && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						{/* Header do Modal */}
						<div className="p-6 border-b border-gray-200 flex items-center justify-between">
							<div>
								<h2 className="text-2xl font-bold text-gray-800">
									Detalhes do Pedido #{selectedOrder.id}
								</h2>
								<p className="text-gray-600">Mesa {selectedOrder.table}</p>
							</div>
							<button
								onClick={() => setSelectedOrder(null)}
								className="text-gray-400 hover:text-gray-600 transition-colors"
							>
								<FiX className="w-6 h-6" />
							</button>
						</div>

						{/* Conteúdo do Modal */}
						<div className="p-6 space-y-6">
							{/* Informações Gerais */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="bg-gray-50 p-4 rounded-lg">
									<h3 className="font-semibold text-gray-800 mb-2">Cliente</h3>
									<p className="text-gray-600">{selectedOrder.customerName}</p>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg">
									<h3 className="font-semibold text-gray-800 mb-2">Status</h3>
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
											selectedOrder.status === "COMPLETED"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{selectedOrder.status === "COMPLETED"
											? "Concluído"
											: "Cancelado"}
									</span>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg">
									<h3 className="font-semibold text-gray-800 mb-2">
										Valor Total
									</h3>
									<p className="text-xl font-bold text-emerald-600">
										{formatCurrency(selectedOrder.totalValue)}
									</p>
								</div>
								<div className="bg-gray-50 p-4 rounded-lg">
									<h3 className="font-semibold text-gray-800 mb-2">
										Pagamento
									</h3>
									<p className="text-gray-600">{selectedOrder.paymentMethod}</p>
								</div>
							</div>

							{/* Produtos */}
							<div>
								<h3 className="font-semibold text-gray-800 mb-4">
									Itens do Pedido
								</h3>
								<div className="space-y-3">
									{selectedOrder.products.map((product) => (
										<div
											key={product.id}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<p className="font-medium text-gray-800">
													{product.name}
												</p>
												<p className="text-sm text-gray-600">
													Quantidade: {product.quantity}
												</p>
											</div>
											<p className="font-semibold text-gray-800">
												{formatCurrency(product.price * product.quantity)}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Timeline */}
							<div>
								<h3 className="font-semibold text-gray-800 mb-4">
									Timeline do Pedido
								</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										<div>
											<p className="font-medium text-gray-800">Pedido Criado</p>
											<p className="text-sm text-gray-600">
												{formatDate(selectedOrder.createdAt)} às{" "}
												{formatTime(selectedOrder.createdAt)}
											</p>
										</div>
									</div>
									{selectedOrder.completedAt && (
										<div className="flex items-center gap-3">
											<div className="w-3 h-3 bg-green-500 rounded-full"></div>
											<div>
												<p className="font-medium text-gray-800">
													Pedido Concluído
												</p>
												<p className="text-sm text-gray-600">
													{formatDate(selectedOrder.completedAt)} às{" "}
													{formatTime(selectedOrder.completedAt)}
												</p>
											</div>
										</div>
									)}
									{selectedOrder.canceledAt && (
										<div className="flex items-center gap-3">
											<div className="w-3 h-3 bg-red-500 rounded-full"></div>
											<div>
												<p className="font-medium text-gray-800">
													Pedido Cancelado
												</p>
												<p className="text-sm text-gray-600">
													{formatDate(selectedOrder.canceledAt)} às{" "}
													{formatTime(selectedOrder.canceledAt)}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Notas */}
							{selectedOrder.notes && (
								<div>
									<h3 className="font-semibold text-gray-800 mb-2">
										Observações
									</h3>
									<p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
										{selectedOrder.notes}
									</p>
								</div>
							)}
						</div>

						{/* Footer do Modal */}
						<div className="p-6 border-t border-gray-200 flex justify-end gap-3">
							<button
								onClick={() => setSelectedOrder(null)}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Fechar
							</button>
							<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
								Reimprimir Comanda
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
