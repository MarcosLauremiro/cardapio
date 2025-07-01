import { useEffect, useState } from "react";
import type { Schedule, User } from "../../types/User";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import { useGetUserQuery } from "../../slices/user";

interface FormData {
	name: string;
	email: string;
	phone: string;
	website: string;
	description: string;
	street: string;
	number: string;
	complement: string;
	neighborhood: string;
	city: string;
	state: string;
	zipCode: string;
}

export function AccountInfo() {
	const [establishment, setEstablishment] = useState<User>();
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		phone: "",
		website: "",
		description: "",
		street: "",
		number: "",
		complement: "",
		neighborhood: "",
		city: "",
		state: "",
		zipCode: "",
	});
	const [editing, setEditing] = useState(false);
	const [schedule, setSchedule] = useState<Schedule[]>([]);

	const { data: user, isLoading } = useGetUserQuery();

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
		if (user) {
			setTimeout(() => {
				setEstablishment(user);
				setFormData({
					name: user.name || "",
					email: user.email || "",
					phone: user.phone || "",
					website: user.website || "",
					description: user.description || "",
					street: user.address?.street || "",
					number: user.address?.number || "",
					complement: user.address?.complement || "",
					neighborhood: user.address?.neighborhood || "",
					city: user.address?.city || "",
					state: user.address?.state || "",
					zipCode: user.address?.zipCode || "",
				});
				setSchedule(user.schedule ?? []);
			}, 500);
		}
	}, [user]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
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
		const updatedUser: Partial<User> = {
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			website: formData.website,
			description: formData.description,
			address: {
				street: formData.street,
				number: formData.number,
				complement: formData.complement,
				neighborhood: formData.neighborhood,
				city: formData.city,
				state: formData.state,
				zipCode: formData.zipCode,
			},
			schedule: schedule,
		};

		console.log("Salvando dados:", updatedUser);
		setEditing(false);
	};

	const handleCancelar = () => {
		if (establishment) {
			setFormData({
				name: establishment.name || "",
				email: establishment.email || "",
				phone: establishment.phone || "",
				website: establishment.website || "",
				description: establishment.description || "",
				street: establishment.address?.street || "",
				number: establishment.address?.number || "",
				complement: establishment.address?.complement || "",
				neighborhood: establishment.address?.neighborhood || "",
				city: establishment.address?.city || "",
				state: establishment.address?.state || "",
				zipCode: establishment.address?.zipCode || "",
			});
			setSchedule(establishment.schedule ?? []);
		}
		setEditing(false);
	};

	if (isLoading || !establishment) {
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
		value: string | number,
		name: keyof FormData,
		type: string = "text"
	) => (
		<div>
			<label className="block text-sm font-medium text-gray-600 mb-1">
				{label}:
			</label>
			{editing ? (
				type === "textarea" ? (
					<textarea
						name={name}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-vertical min-h-[100px]"
						value={value as string}
						onChange={handleInputChange}
						rows={3}
					/>
				) : (
					<input
						type={type}
						name={name}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
						value={value as string}
						onChange={handleInputChange}
					/>
				)
			) : (
				<p className="text-gray-800 font-medium">
					{value || "Não informado *"}
				</p>
			)}
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
						formData.description,
						"description",
						"textarea"
					)}
				</div>
			</section>

			{/* Seção: Contato */}
			<section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">Contato</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{renderField("E-mail", formData.email, "email", "email")}
					{renderField("Telefone", formData.phone, "phone")}
					{renderField("Website", formData.website, "website")}
				</div>
			</section>

			{/* Seção: Endereço */}
			<section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">Endereço</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{renderField("Rua", formData.street, "street")}
					{renderField("Número", formData.number, "number")}
					{renderField("Complemento", formData.complement, "complement")}
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
		</main>
	);
}
