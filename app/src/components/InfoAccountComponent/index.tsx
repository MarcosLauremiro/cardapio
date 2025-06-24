import { useEffect, useState } from "react";
import type { Schedule, User } from "../../types/User";
import { FiEdit, FiSave, FiX } from "react-icons/fi";

export function AccountInfo() {
	const [establishment, setEstablishment] = useState<User | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		whatsapp: "",
		website: "",
		instagram: "",
		facebook: "",
		street: "",
		number: "",
		neighborhood: "",
		city: "",
		state: "",
		zipCode: "",
		hasDelivery: false,
		deliveryFee: 0,
		minimumOrder: 0,
		deliveryRadius: 0,
		estimatedTime: "",
	});
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(false);
	const [schedule, setSchedule] = useState<Schedule[]>([]);

	const weekDaysMap = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];

	useEffect(() => {
		const mock: User = {
			_id: "64b7a4f9c3d6e2a5f2a1f3a7",
			name: "Delícias da Ju",
			slug: "delicias-da-ju",
			description:
				"Padaria artesanal com pães e bolos feitos com ingredientes naturais.",
			category: "bakery",
			schedule: [
				{ dayWeek: 0, opening: "08:00", closed: "14:00", close: true }, // Domingo
				{ dayWeek: 1, opening: "08:00", closed: "18:00", close: false }, // Segunda
				{ dayWeek: 2, opening: "08:00", closed: "18:00", close: false }, // Terça
				{ dayWeek: 3, opening: "08:00", closed: "18:00", close: false }, // Quarta
				{ dayWeek: 4, opening: "08:00", closed: "18:00", close: false }, // Quinta
				{ dayWeek: 5, opening: "08:00", closed: "18:00", close: false }, // Sexta
				{ dayWeek: 6, opening: "08:00", closed: "14:00", close: false }, // Sábado
			],
			email: "contato@deliciasdaju.com",
			emailVerified: true,
			phone: "+55 (11) 99999-8888",
			whatsapp: "+55 (11) 99999-8888",
			website: "https://deliciasdaju.com",
			address: {
				street: "Rua das Flores",
				number: "123",
				neighborhood: "Centro",
				city: "São Paulo",
				state: "SP",
				zipCode: "01001-000",
				coordinates: {
					latitude: -23.55052,
					longitude: -46.633308,
				},
			},
			cnpj: "12.345.678/0001-99",
			businessName: "Delícias da Ju LTDA",
			subscription: {
				planId: "basic",
				planName: "Plano Básico",
				status: "active",
				startDate: new Date("2024-01-01"),
				renewalDate: new Date("2025-01-01"),
				price: 49.9,
				autoRenewal: true,
			},
			billingInfo: {
				cardLastFour: "1234",
				cardBrand: "Visa",
				holderName: "Juliana Silva",
				billingAddress: {
					street: "Rua das Flores",
					number: "123",
					neighborhood: "Centro",
					city: "São Paulo",
					state: "SP",
					zipCode: "01001-000",
				},
			},
			status: "active",
			isApproved: true,
			features: {
				maxProducts: 100,
				maxPhotos: 20,
				canAcceptOnlineOrders: true,
				canUseAnalytics: true,
				canCustomizeTheme: true,
			},
			logo: "https://example.com/images/logo.png",
			coverImage: "https://example.com/images/cover.jpg",
			photos: [
				{ url: "https://example.com/images/loja1.jpg" },
				{ url: "https://example.com/images/loja2.jpg" },
			],
			socialMedia: {
				instagram: "https://instagram.com/deliciasdaju",
				facebook: "https://facebook.com/deliciasdaju",
			},
			deliverySettings: {
				hasDelivery: true,
				deliveryFee: 5.0,
				minimumOrder: 20,
				deliveryRadius: 10,
				estimatedTime: "30-45 min",
			},
			createdAt: new Date("2024-01-01T10:00:00Z"),
			updatedAt: new Date("2025-01-01T10:00:00Z"),
			lastLogin: new Date("2025-06-23T08:00:00Z"),
			link: "https://deliciasdaju.com",
			neighborhood: "Centro",
			road: "Rua das Flores",
			city: "São Paulo",
			state: "SP",
			number: "123",
		};

		setTimeout(() => {
			setEstablishment(mock);
			setFormData({
				name: mock.name,
				email: mock.email,
				phone: mock.phone,
				whatsapp: mock.whatsapp || "",
				website: mock.website || "",
				instagram: mock.socialMedia?.instagram || "",
				facebook: mock.socialMedia?.facebook || "",
				street: mock.address?.street || "",
				number: mock.address?.number || "",
				neighborhood: mock.address?.neighborhood || "",
				city: mock.address?.city || "",
				state: mock.address?.state || "",
				zipCode: mock.address?.zipCode || "",
				hasDelivery: mock.deliverySettings?.hasDelivery || false,
				deliveryFee: mock.deliverySettings?.deliveryFee || 0,
				minimumOrder: mock.deliverySettings?.minimumOrder || 0,
				deliveryRadius: mock.deliverySettings?.deliveryRadius || 0,
				estimatedTime: mock.deliverySettings?.estimatedTime || "",
			});
			setSchedule(mock.schedule ?? []);
			setLoading(false);
		}, 500);
	}, []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox" && "checked" in e.target
					? (e.target as HTMLInputElement).checked
					: value,
		}));
	};

	const handleScheduleChange = (
		index: number,
		field: keyof Schedule,
		value: string | boolean
	) => {
		const novaSchedule: Schedule[] = [...schedule];
		novaSchedule[index] = {
			...novaSchedule[index],
			[field]: value as never,
		};
		setSchedule(novaSchedule);
	};

	const handleSalvar = () => {
		console.log("Salvando dados:", { ...formData, schedule });
		setEditing(false);
	};

	const handleCancelar = () => {
		if (establishment) {
			setFormData({
				name: establishment.name,
				email: establishment.email,
				phone: establishment.phone,
				whatsapp: establishment.whatsapp || "",
				website: establishment.website || "",
				instagram: establishment.socialMedia?.instagram || "",
				facebook: establishment.socialMedia?.facebook || "",
				street: establishment.address?.street || "",
				number: establishment.address?.number || "",
				neighborhood: establishment.address?.neighborhood || "",
				city: establishment.address?.city || "",
				state: establishment.address?.state || "",
				zipCode: establishment.address?.zipCode || "",
				hasDelivery: establishment.deliverySettings?.hasDelivery || false,
				deliveryFee: establishment.deliverySettings?.deliveryFee || 0,
				minimumOrder: establishment.deliverySettings?.minimumOrder || 0,
				deliveryRadius: establishment.deliverySettings?.deliveryRadius || 0,
				estimatedTime: establishment.deliverySettings?.estimatedTime || "",
			});
			setSchedule(establishment.schedule ?? []);
		}
		setEditing(false);
	};

	if (loading || !establishment) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
				<p className="ml-4 text-gray-600">
					Carregando informações do restaurante...
				</p>
			</div>
		);
	}

	const renderField = (
		label: string,
		value: string | number | boolean,
		name: string,
		type: string = "text"
	) => (
		<div>
			<label className="block text-sm font-medium text-gray-600 mb-1">
				{label}:
			</label>
			{editing ? (
				<input
					type={type}
					name={name}
					className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
					value={value as string}
					onChange={handleInputChange}
				/>
			) : (
				<p className="text-gray-800 font-medium">{value || "Não informado"}</p>
			)}
		</div>
	);

	const renderCheckboxField = (label: string, value: boolean, name: string) => (
		<div className="flex items-center">
			{editing ? (
				<input
					type="checkbox"
					name={name}
					checked={value}
					onChange={handleInputChange}
					className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
				/>
			) : (
				<span
					className={`w-4 h-4 rounded-full ${
						value ? "bg-emerald-500" : "bg-gray-300"
					}`}
				/>
			)}
			<label className="ml-2 text-sm font-medium text-gray-700">{label}</label>
		</div>
	);

	return (
		<main className="space-y-8 p-4">
			{/* Botões de Ação Global */}
			<div className="flex justify-end gap-3 mb-6">
				{editing ? (
					<>
						<button
							onClick={handleCancelar}
							className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
						>
							<FiX className="w-4 h-4" />
							Cancelar
						</button>
						<button
							onClick={handleSalvar}
							className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
						>
							<FiSave className="w-4 h-4" />
							Salvar Alterações
						</button>
					</>
				) : (
					<button
						onClick={() => setEditing(true)}
						className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
					>
						<FiEdit className="w-4 h-4" />
						Editar Informações
					</button>
				)}
			</div>

			{/* Seção: Informações Básicas */}
			<section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Informações Básicas
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{renderField("Nome do Restaurante", formData.name, "name")}
					{renderField(
						"Descrição",
						establishment.description || "",
						"description",
						"textarea"
					)}
					{renderField("Categoria", establishment.category || "", "category")}
				</div>
			</section>

			{/* Seção: Contato */}
			<section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">Contato</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{renderField("E-mail", formData.email, "email", "email")}
					{renderField("Telefone", formData.phone, "phone")}
					{renderField("WhatsApp", formData.whatsapp, "whatsapp")}
					{renderField("Website", formData.website, "website")}
					{renderField("Instagram", formData.instagram, "instagram")}
					{renderField("Facebook", formData.facebook, "facebook")}
				</div>
			</section>

			{/* Seção: Endereço */}
			<section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">Endereço</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{renderField("Rua", formData.street, "street")}
					{renderField("Número", formData.number, "number")}
					{renderField("Bairro", formData.neighborhood, "neighborhood")}
					{renderField("Cidade", formData.city, "city")}
					{renderField("Estado", formData.state, "state")}
					{renderField("CEP", formData.zipCode, "zipCode")}
				</div>
			</section>

			{/* Seção: Horário de Funcionamento */}
			<section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Horário de Funcionamento
				</h2>
				<div className="space-y-4">
					{schedule.map((item, idx) => (
						<div
							key={item.dayWeek}
							className="flex flex-col md:flex-row md:items-center md:space-x-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
						>
							<div className="w-36 flex-shrink-0">
								<span className="block font-semibold text-gray-700">
									{weekDaysMap[item.dayWeek]}
								</span>
							</div>
							<div className="flex items-center space-x-4 mt-3 md:mt-0 flex-grow">
								{editing ? (
									<>
										<div className="flex items-center gap-2">
											<label className="text-sm text-gray-600">Abertura:</label>
											<input
												type="time"
												className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
												value={item.opening}
												onChange={(e) =>
													handleScheduleChange(idx, "opening", e.target.value)
												}
											/>
										</div>
										<div className="flex items-center gap-2">
											<label className="text-sm text-gray-600">
												Fechamento:
											</label>
											<input
												type="time"
												className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
												value={item.closed}
												onChange={(e) =>
													handleScheduleChange(idx, "closed", e.target.value)
												}
											/>
										</div>
										<label className="flex items-center ml-4">
											<input
												type="checkbox"
												className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
												checked={item.close}
												onChange={(e) =>
													handleScheduleChange(idx, "close", e.target.checked)
												}
											/>
											<span className="ml-2 text-sm text-gray-700">
												Fechado
											</span>
										</label>
									</>
								) : (
									<>
										{item.close ? (
											<span className="text-red-500 font-medium">Fechado</span>
										) : (
											<span className="text-gray-800 font-medium">
												{item.opening} – {item.closed}
											</span>
										)}
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Seção: Configurações de Entrega */}
			<section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Configurações de Entrega
				</h2>
				<div className="space-y-4">
					{renderCheckboxField(
						"Possui Entrega",
						formData.hasDelivery,
						"hasDelivery"
					)}
					{formData.hasDelivery && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{renderField(
								"Taxa de Entrega",
								formData.deliveryFee,
								"deliveryFee",
								"number"
							)}
							{renderField(
								"Pedido Mínimo",
								formData.minimumOrder,
								"minimumOrder",
								"number"
							)}
							{renderField(
								"Raio de Entrega (km)",
								formData.deliveryRadius,
								"deliveryRadius",
								"number"
							)}
							{renderField(
								"Tempo Estimado (ex: 30-45 min)",
								formData.estimatedTime,
								"estimatedTime"
							)}
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
