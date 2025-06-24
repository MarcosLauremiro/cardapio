import { useState, useMemo } from "react";
import {
	FiPlus,
	FiSearch,
	FiEdit,
	FiTrash,
	FiToggleLeft,
	FiToggleRight,
	FiX,
	FiSave,
	FiUser,
	FiMail,
	FiPhone,
	FiPercent,
	FiShield,
} from "react-icons/fi";

// Tipos para usuários
interface User {
	id: string;
	name: string;
	email: string;
	phone?: string;
	role: "admin" | "manager" | "waiter" | "kitchen" | "cashier";
	commission: number;
	photo?: string;
	status: "active" | "inactive";
	permissions: {
		canManageProducts: boolean;
		canManageOrders: boolean;
		canViewReports: boolean;
		canManageUsers: boolean;
	};
	createdAt: Date;
	lastLogin?: Date;
}

interface UserModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (user: Omit<User, "id" | "createdAt">) => void;
	user?: User | null;
}

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	userName: string;
}

// Componente Modal de Confirmação
const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	userName,
}: ConfirmModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl max-w-md w-full p-6">
				<h2 className="text-xl font-bold text-gray-800 mb-4">
					Confirmar Exclusão
				</h2>
				<p className="text-gray-600 mb-6">
					Tem certeza que deseja deletar o usuário <strong>{userName}</strong>?
					Esta ação não pode ser desfeita.
				</p>
				<div className="flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
					>
						Cancelar
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						Deletar
					</button>
				</div>
			</div>
		</div>
	);
};

// Componente Modal de Usuário
const UserModal = ({ isOpen, onClose, onSave, user }: UserModalProps) => {
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		phone: user?.phone || "",
		role: user?.role || ("waiter" as const),
		commission: user?.commission || 10,
		photo: user?.photo || "",
		status: user?.status || ("active" as const),
		permissions: user?.permissions || {
			canManageProducts: false,
			canManageOrders: true,
			canViewReports: false,
			canManageUsers: false,
		},
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

	const handlePermissionChange = (
		permission: keyof typeof formData.permissions
	) => {
		setFormData((prev) => ({
			...prev,
			permissions: {
				...prev.permissions,
				[permission]: !prev.permissions[permission],
			},
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({
			...formData,
			lastLogin: user?.lastLogin,
		});
		onClose();
	};

	if (!isOpen) return null;

	const roleOptions = [
		{ value: "admin", label: "Administrador" },
		{ value: "manager", label: "Gerente" },
		{ value: "waiter", label: "Garçom" },
		{ value: "kitchen", label: "Cozinha" },
		{ value: "cashier", label: "Caixa" },
	];

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6 border-b border-gray-200 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-800">
						{user ? "Editar Usuário" : "Adicionar Usuário"}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<FiX className="w-6 h-6" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Informações Básicas */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Nome Completo *
							</label>
							<input
								type="text"
								name="name"
								required
								value={formData.name}
								onChange={handleInputChange}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								placeholder="Digite o nome completo"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								E-mail *
							</label>
							<input
								type="email"
								name="email"
								required
								value={formData.email}
								onChange={handleInputChange}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								placeholder="usuario@email.com"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Telefone
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								placeholder="+55 (11) 99999-9999"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Cargo *
							</label>
							<select
								name="role"
								required
								value={formData.role}
								onChange={handleInputChange}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
							>
								{roleOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Comissão (%)
							</label>
							<input
								type="number"
								name="commission"
								min="0"
								max="100"
								value={formData.commission}
								onChange={handleInputChange}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
								placeholder="10"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Status
							</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleInputChange}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
							>
								<option value="active">Ativo</option>
								<option value="inactive">Inativo</option>
							</select>
						</div>
					</div>

					{/* Permissões */}
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							Permissões
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{Object.entries(formData.permissions).map(([key, value]) => {
								const labels = {
									canManageProducts: "Gerenciar Produtos",
									canManageOrders: "Gerenciar Pedidos",
									canViewReports: "Ver Relatórios",
									canManageUsers: "Gerenciar Usuários",
								};
								return (
									<label key={key} className="flex items-center">
										<input
											type="checkbox"
											checked={value}
											onChange={() =>
												handlePermissionChange(
													key as keyof typeof formData.permissions
												)
											}
											className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
										/>
										<span className="ml-2 text-sm text-gray-700">
											{labels[key as keyof typeof labels]}
										</span>
									</label>
								);
							})}
						</div>
					</div>

					{/* Botões */}
					<div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
						>
							<FiSave className="w-4 h-4" />
							{user ? "Salvar Alterações" : "Adicionar Usuário"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Componente Card de Usuário
const UserCard = ({
	user,
	onEdit,
	onDelete,
	onToggleStatus,
}: {
	user: User;
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
	onToggleStatus: (user: User) => void;
}) => {
	const roleLabels = {
		admin: "Administrador",
		manager: "Gerente",
		waiter: "Garçom",
		kitchen: "Cozinha",
		cashier: "Caixa",
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const formatLastLogin = (date?: Date) => {
		if (!date) return "Nunca";
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
			{/* Header do Card */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					{user.photo ? (
						<img
							src={user.photo}
							alt={user.name}
							className="w-12 h-12 rounded-full object-cover"
						/>
					) : (
						<div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
							{getInitials(user.name)}
						</div>
					)}
					<div>
						<h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
						<p className="text-sm text-gray-600">{roleLabels[user.role]}</p>
					</div>
				</div>
				<span
					className={`px-3 py-1 rounded-full text-xs font-medium ${
						user.status === "active"
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					}`}
				>
					{user.status === "active" ? "Ativo" : "Inativo"}
				</span>
			</div>

			{/* Informações */}
			<div className="space-y-2 mb-4">
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<FiMail className="w-4 h-4" />
					<span>{user.email}</span>
				</div>
				{user.phone && (
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<FiPhone className="w-4 h-4" />
						<span>{user.phone}</span>
					</div>
				)}
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<FiPercent className="w-4 h-4" />
					<span>Comissão: {user.commission}%</span>
				</div>
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<FiUser className="w-4 h-4" />
					<span>Último login: {formatLastLogin(user.lastLogin)}</span>
				</div>
			</div>

			{/* Permissões */}
			<div className="mb-4">
				<p className="text-xs font-medium text-gray-500 mb-2">PERMISSÕES</p>
				<div className="flex flex-wrap gap-1">
					{Object.entries(user.permissions).map(([key, value]) => {
						if (!value) return null;
						const labels = {
							canManageProducts: "Produtos",
							canManageOrders: "Pedidos",
							canViewReports: "Relatórios",
							canManageUsers: "Usuários",
						};
						return (
							<span
								key={key}
								className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
							>
								{labels[key as keyof typeof labels]}
							</span>
						);
					})}
				</div>
			</div>

			{/* Ações */}
			<div className="flex justify-between items-center pt-4 border-t border-gray-200">
				<button
					onClick={() => onToggleStatus(user)}
					className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
						user.status === "active"
							? "text-red-600 hover:bg-red-50"
							: "text-green-600 hover:bg-green-50"
					}`}
				>
					{user.status === "active" ? (
						<>
							<FiToggleRight className="w-4 h-4" />
							Desativar
						</>
					) : (
						<>
							<FiToggleLeft className="w-4 h-4" />
							Ativar
						</>
					)}
				</button>
				<div className="flex gap-2">
					<button
						onClick={() => onEdit(user)}
						className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
					>
						<FiEdit className="w-4 h-4" />
					</button>
					<button
						onClick={() => onDelete(user)}
						className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
					>
						<FiTrash className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
};

// Componente Principal
export function UsersAccount() {
	const [users, setUsers] = useState<User[]>([
		{
			id: "1",
			name: "João Silva",
			email: "joao@restaurante.com",
			phone: "+55 (11) 99999-1111",
			role: "manager",
			commission: 15,
			photo: "",
			status: "active",
			permissions: {
				canManageProducts: true,
				canManageOrders: true,
				canViewReports: true,
				canManageUsers: false,
			},
			createdAt: new Date("2024-01-15"),
			lastLogin: new Date("2025-06-23T08:00:00Z"),
		},
		{
			id: "2",
			name: "Maria Santos",
			email: "maria@restaurante.com",
			phone: "+55 (11) 99999-2222",
			role: "waiter",
			commission: 10,
			status: "active",
			permissions: {
				canManageProducts: false,
				canManageOrders: true,
				canViewReports: false,
				canManageUsers: false,
			},
			createdAt: new Date("2024-02-20"),
			lastLogin: new Date("2025-06-22T18:30:00Z"),
		},
		{
			id: "3",
			name: "Pedro Costa",
			email: "pedro@restaurante.com",
			role: "kitchen",
			commission: 8,
			status: "inactive",
			permissions: {
				canManageProducts: false,
				canManageOrders: true,
				canViewReports: false,
				canManageUsers: false,
			},
			createdAt: new Date("2024-03-10"),
			lastLogin: new Date("2025-06-20T14:15:00Z"),
		},
		{
			id: "4",
			name: "Ana Oliveira",
			email: "ana@restaurante.com",
			phone: "+55 (11) 99999-4444",
			role: "admin",
			commission: 20,
			status: "active",
			permissions: {
				canManageProducts: true,
				canManageOrders: true,
				canViewReports: true,
				canManageUsers: true,
			},
			createdAt: new Date("2024-01-01"),
			lastLogin: new Date("2025-06-24T09:15:00Z"),
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [deletingUser, setDeletingUser] = useState<User | null>(null);

	// Filtrar usuários
	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			const matchesSearch =
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesRole = roleFilter === "all" || user.role === roleFilter;
			const matchesStatus =
				statusFilter === "all" || user.status === statusFilter;

			return matchesSearch && matchesRole && matchesStatus;
		});
	}, [users, searchTerm, roleFilter, statusFilter]);

	// Funções CRUD
	const handleAddUser = (userData: Omit<User, "id" | "createdAt">) => {
		const newUser: User = {
			...userData,
			id: Date.now().toString(),
			createdAt: new Date(),
		};
		setUsers((prev) => [...prev, newUser]);
	};

	const handleEditUser = (userData: Omit<User, "id" | "createdAt">) => {
		if (!editingUser) return;

		setUsers((prev) =>
			prev.map((user) =>
				user.id === editingUser.id
					? {
							...userData,
							id: editingUser.id,
							createdAt: editingUser.createdAt,
					  }
					: user
			)
		);
		setEditingUser(null);
	};

	const handleDeleteUser = () => {
		if (!deletingUser) return;

		setUsers((prev) => prev.filter((user) => user.id !== deletingUser.id));
		setDeletingUser(null);
		setIsConfirmModalOpen(false);
	};

	const handleToggleStatus = (user: User) => {
		setUsers((prev) =>
			prev.map((u) =>
				u.id === user.id
					? { ...u, status: u.status === "active" ? "inactive" : "active" }
					: u
			)
		);
	};

	// Estatísticas
	const stats = useMemo(() => {
		const activeUsers = users.filter((u) => u.status === "active").length;
		const totalUsers = users.length;
		const adminUsers = users.filter((u) => u.role === "admin").length;

		return { activeUsers, totalUsers, adminUsers };
	}, [users]);

	return (
		<main className="space-y-8 p-4">
			{/* Header */}
			<div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-lg text-white">
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold mb-2">
							Gerenciamento de Usuários
						</h1>
						<p className="text-emerald-100">
							Gerencie os usuários e suas permissões no sistema
						</p>
					</div>
					<button
						onClick={() => {
							setEditingUser(null);
							setIsUserModalOpen(true);
						}}
						className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors shadow-md"
					>
						<FiPlus className="w-5 h-5" />
						Adicionar Usuário
					</button>
				</div>
			</div>

			{/* Estatísticas */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500">
								Total de Usuários
							</p>
							<p className="text-2xl font-bold text-gray-800">
								{stats.totalUsers}
							</p>
						</div>
						<div className="bg-emerald-100 p-3 rounded-lg">
							<FiUser className="w-6 h-6 text-emerald-600" />
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500">
								Usuários Ativos
							</p>
							<p className="text-2xl font-bold text-gray-800">
								{stats.activeUsers}
							</p>
						</div>
						<div className="bg-green-100 p-3 rounded-lg">
							<FiToggleRight className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500">
								Administradores
							</p>
							<p className="text-2xl font-bold text-gray-800">
								{stats.adminUsers}
							</p>
						</div>
						<div className="bg-blue-100 p-3 rounded-lg">
							<FiShield className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</div>
			</div>

			{/* Filtros e Busca */}
			<div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
				<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
					{/* Busca */}
					<div className="relative flex-1 max-w-md">
						<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<input
							type="text"
							placeholder="Buscar por nome ou email..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>

					{/* Filtros */}
					<div className="flex gap-3">
						<select
							value={roleFilter}
							onChange={(e) => setRoleFilter(e.target.value)}
							className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
						>
							<option value="all">Todos os Cargos</option>
							<option value="admin">Administrador</option>
							<option value="manager">Gerente</option>
							<option value="waiter">Garçom</option>
							<option value="kitchen">Cozinha</option>
							<option value="cashier">Caixa</option>
						</select>

						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
						>
							<option value="all">Todos os Status</option>
							<option value="active">Ativo</option>
							<option value="inactive">Inativo</option>
						</select>
					</div>
				</div>
			</div>

			{/* Lista de Usuários */}
			<div>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Usuários ({filteredUsers.length})
				</h2>
				{filteredUsers.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredUsers.map((user) => (
							<UserCard
								key={user.id}
								user={user}
								onEdit={(user) => {
									setEditingUser(user);
									setIsUserModalOpen(true);
								}}
								onDelete={(user) => {
									setDeletingUser(user);
									setIsConfirmModalOpen(true);
								}}
								onToggleStatus={handleToggleStatus}
							/>
						))}
					</div>
				) : (
					<div className="bg-white rounded-xl p-12 text-center shadow-md border border-gray-200">
						<FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Nenhum usuário encontrado
						</h3>
						<p className="text-gray-600">
							Tente ajustar os filtros ou adicione um novo usuário.
						</p>
					</div>
				)}
			</div>

			{/* Modais */}
			<UserModal
				isOpen={isUserModalOpen}
				onClose={() => {
					setIsUserModalOpen(false);
					setEditingUser(null);
				}}
				onSave={editingUser ? handleEditUser : handleAddUser}
				user={editingUser}
			/>

			<ConfirmModal
				isOpen={isConfirmModalOpen}
				onClose={() => {
					setIsConfirmModalOpen(false);
					setDeletingUser(null);
				}}
				onConfirm={handleDeleteUser}
				userName={deletingUser?.name || ""}
			/>
		</main>
	);
}
