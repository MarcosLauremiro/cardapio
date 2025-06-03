import { useEffect, useState } from "react";
import type {
	EstablishmentType,
	ScheduleItem,
} from "../../types/establishment.type";

export function AccountInfo() {
	const [establishment, setEstablishment] = useState<EstablishmentType | null>(
		null
	);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(false);
	const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

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
		// Mock de dados (substitua pela chamada real à API)
		const mock: EstablishmentType = {
			_id: "abc123",
			name: "Restaurante Bom Sabor",
			email: "contato@bomsabor.com",
			phone: "+55 (11) 98765-4321",
			neighborhood: "Centro",
			road: "Rua das Flores",
			city: "São Paulo",
			state: "SP",
			number: "123",
			link: "https://www.instagram.com/bomsabor",
			plan: "Plano Premium",
			paymentDate: "2025-06-15",
			createdAt: "2023-04-10T08:30:00Z",
			schedule: [
				{
					diaSemana: 1,
					abertura: "08:00",
					fechamento: "18:00",
					fechado: false,
				},
				{
					diaSemana: 2,
					abertura: "08:00",
					fechamento: "18:00",
					fechado: false,
				},
				{
					diaSemana: 3,
					abertura: "08:00",
					fechamento: "18:00",
					fechado: false,
				},
				{
					diaSemana: 4,
					abertura: "08:00",
					fechamento: "18:00",
					fechado: false,
				},
				{
					diaSemana: 5,
					abertura: "08:00",
					fechamento: "18:00",
					fechado: false,
				},
				{
					diaSemana: 6,
					abertura: "08:00",
					fechamento: "14:00",
					fechado: false,
				},
				{ diaSemana: 0, abertura: "00:00", fechamento: "00:00", fechado: true },
			],
		};

		setTimeout(() => {
			setEstablishment(mock);
			setName(mock.name);
			setEmail(mock.email);
			setPhone(mock.phone);
			setSchedule(mock.schedule);
			setLoading(false);
		}, 500);
	}, []);

	if (loading || !establishment) {
		return (
			<div className="flex justify-center items-center h-screen">
				<span className="text-gray-500">Carregando informações...</span>
			</div>
		);
	}

	function handleScheduleChange(
		index: number,
		field: keyof ScheduleItem,
		value: string | boolean
	) {
		const novaSchedule: ScheduleItem[] = [...schedule];
		novaSchedule[index] = {
			...novaSchedule[index],
			[field]: value as never,
		};
		setSchedule(novaSchedule);
	}

	function handleSalvar() {
		console.log("Salvando dados:", {
			name,
			email,
			phone,
			schedule,
		});
		setEditing(false);
	}

	return (
		<main className="flex-1 p-8">
			{/* Header com nome e contato */}
			<div className="bg-white shadow-sm rounded-lg px-6 py-6 mb-8 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
						{establishment.name.charAt(0)}
					</div>
					<div>
						<h1 className="text-2xl font-semibold text-gray-800">
							{establishment.name}
						</h1>
						<p className="text-sm text-gray-500">
							Cadastrado em{" "}
							{new Date(establishment.createdAt).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})}
						</p>
					</div>
				</div>
				<button
					onClick={() => setEditing(!editing)}
					className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
				>
					{editing ? "Cancelar" : "Editar Perfil"}
				</button>
			</div>

			{/* Seções de formulário/exibição */}
			<div className="space-y-8">
				{/* 1) Informações de contato */}
				<section className="bg-white shadow rounded-lg p-6">
					<h2 className="text-lg font-medium text-gray-700 mb-4">
						Informações de Contato
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Nome do Estabelecimento
							</label>
							{editing ? (
								<input
									type="text"
									className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							) : (
								<p className="text-gray-800">{establishment.name}</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								E-mail
							</label>
							{editing ? (
								<input
									type="email"
									className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							) : (
								<p className="text-gray-800">{establishment.email}</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Telefone
							</label>
							{editing ? (
								<input
									type="text"
									className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							) : (
								<p className="text-gray-800">{establishment.phone}</p>
							)}
						</div>
					</div>
				</section>

				{/* 2) Horário de Funcionamento */}
				<section className="bg-white shadow rounded-lg p-6">
					<h2 className="text-lg font-medium text-gray-700 mb-4">
						Horário de Funcionamento
					</h2>
					<div className="space-y-4">
						{schedule.map((item, idx) => (
							<div
								key={item.diaSemana}
								className="flex flex-col md:flex-row md:items-center md:space-x-4 border border-gray-200 rounded p-4"
							>
								<div className="w-32">
									<span className="block font-medium text-gray-600">
										{weekDaysMap[item.diaSemana]}
									</span>
								</div>
								<div className="flex items-center space-x-2 mt-2 md:mt-0">
									{editing ? (
										<>
											<label className="text-sm text-gray-500">Aberto:</label>
											<input
												type="time"
												className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200"
												value={item.abertura}
												onChange={(e) =>
													handleScheduleChange(idx, "abertura", e.target.value)
												}
											/>
											<span className="mx-2 text-gray-500">até</span>
											<input
												type="time"
												className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200"
												value={item.fechamento}
												onChange={(e) =>
													handleScheduleChange(
														idx,
														"fechamento",
														e.target.value
													)
												}
											/>
											<label className="flex items-center ml-4">
												<input
													type="checkbox"
													className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
													checked={item.fechado}
													onChange={(e) =>
														handleScheduleChange(
															idx,
															"fechado",
															e.target.checked
														)
													}
												/>
												<span className="ml-2 text-sm text-gray-600">
													Fechado
												</span>
											</label>
										</>
									) : (
										<>
											{item.fechado ? (
												<span className="text-red-500 font-medium">
													Fechado
												</span>
											) : (
												<span className="text-gray-800">
													{item.abertura} – {item.fechamento}
												</span>
											)}
										</>
									)}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Botão de Salvar Geral */}
				{editing && (
					<div className="flex justify-end">
						<button
							onClick={handleSalvar}
							className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
						>
							Salvar Alterações
						</button>
					</div>
				)}
			</div>
		</main>
	);
}
