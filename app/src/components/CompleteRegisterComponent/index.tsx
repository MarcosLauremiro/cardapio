import { useState } from "react";
import {
	FiChevronLeft,
	FiChevronRight,
	FiCheckCircle,
	FiUser,
	FiCalendar,
	FiMapPin,
	FiPhone,
	FiFileText,
	FiCreditCard,
	FiHome,
	FiClock,
} from "react-icons/fi";
import type { Address, InfoAccount, Schedule } from "../../types/User";
import {
	useSetScheduleMutation,
	useUpdateAddressMutation,
	useUpdateBusinessInfoMutation,
} from "../../slices/user";

export default function CompleteRegister() {
	const [currentStep, setCurrentStep] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [infos, setInfos] = useState<InfoAccount>({
		phone: "",
		cnpj: "",
		cpf: "",
		description: "",
		delivery: false,
	});
	const [schedules, setSchedules] = useState<Schedule[]>([
		{ dayWeek: 0, opening: "08:00", closed: "18:00", close: true }, // Domingo
		{ dayWeek: 1, opening: "08:00", closed: "18:00", close: false }, // Segunda
		{ dayWeek: 2, opening: "08:00", closed: "18:00", close: false }, // Terça
		{ dayWeek: 3, opening: "08:00", closed: "18:00", close: false }, // Quarta
		{ dayWeek: 4, opening: "08:00", closed: "18:00", close: false }, // Quinta
		{ dayWeek: 5, opening: "08:00", closed: "18:00", close: false }, // Sexta
		{ dayWeek: 6, opening: "08:00", closed: "18:00", close: true }, // Sábado
	]);
	const [address, setAddress] = useState<Address>({
		street: "",
		number: "",
		complement: "",
		neighborhood: "",
		city: "",
		state: "",
		zipCode: "",
		coordinates: {
			latitude: 0,
			longitude: 0,
		},
	});

	const [updateInfos] = useUpdateBusinessInfoMutation();
	const [setSchedule] = useSetScheduleMutation();
	const [updateAddress] = useUpdateAddressMutation();

	const steps = [
		{ id: 0, title: "Informações", icon: FiUser },
		{ id: 1, title: "Horários", icon: FiCalendar },
		{ id: 2, title: "Endereço", icon: FiMapPin },
	];

	const dayNames = [
		"Domingo",
		"Segunda",
		"Terça",
		"Quarta",
		"Quinta",
		"Sexta",
		"Sábado",
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			await updateInfos(infos);
			await setSchedule(schedules);
			await updateAddress(address);
		} catch (error) {
			console.error(`Erro ao completar registro`, error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateSchedule = (
		dayWeek: number,
		field: keyof Schedule,
		value: string | boolean
	) => {
		setSchedules((prev) =>
			prev.map((schedule) =>
				schedule.dayWeek === dayWeek
					? { ...schedule, [field]: value }
					: schedule
			)
		);
	};

	const isStepValid = () => {
		switch (currentStep) {
			case 0:
				return infos.phone && infos.cnpj && infos.cpf && infos.description;
			case 1:
				return schedules.some((s) => !s.close);
			case 2:
				return (
					address.street &&
					address.number &&
					address.neighborhood &&
					address.city &&
					address.state
				);
			default:
				return false;
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 0:
				return (
					<div className="space-y-6">
						<div className="text-center mb-8">
							<div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<FiUser className="w-8 h-8 text-emerald-600" />
							</div>
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								Informações do Negócio
							</h2>
							<p className="text-gray-600">
								Conte-nos mais sobre seu restaurante
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<FiPhone className="inline w-4 h-4 mr-2" />
									Telefone *
								</label>
								<input
									type="tel"
									value={infos.phone}
									onChange={(e) =>
										setInfos({ ...infos, phone: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="(00) 00000-0000"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<FiFileText className="inline w-4 h-4 mr-2" />
									CNPJ *
								</label>
								<input
									type="text"
									value={infos.cnpj}
									onChange={(e) => setInfos({ ...infos, cnpj: e.target.value })}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="00.000.000/0000-00"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<FiCreditCard className="inline w-4 h-4 mr-2" />
									CPF *
								</label>
								<input
									type="text"
									value={infos.cpf}
									onChange={(e) => setInfos({ ...infos, cpf: e.target.value })}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="000.000.000-00"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								<FiFileText className="inline w-4 h-4 mr-2" />
								Descrição do Negócio *
							</label>
							<textarea
								value={infos.description}
								onChange={(e) =>
									setInfos({ ...infos, description: e.target.value })
								}
								rows={4}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
								placeholder="Descreva seu negócio, especialidades, ambiente..."
							/>
						</div>

						<div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
							<div className="flex items-center">
								<input
									type="checkbox"
									id="delivery"
									checked={infos.delivery}
									onChange={(e) =>
										setInfos({ ...infos, delivery: e.target.checked })
									}
									className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="delivery"
									className="ml-3 block text-sm font-medium text-gray-700"
								>
									Oferece serviço de delivery
								</label>
							</div>
							<p className="text-xs text-gray-500 mt-1 ml-7">
								Marque esta opção se seu restaurante faz entregas
							</p>
						</div>
					</div>
				);

			case 1:
				return (
					<div className="space-y-6">
						<div className="text-center mb-8">
							<div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<FiCalendar className="w-8 h-8 text-emerald-600" />
							</div>
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								Horários de Funcionamento
							</h2>
							<p className="text-gray-600">
								Configure os horários de abertura e fechamento
							</p>
						</div>

						<div className="space-y-4">
							{schedules.map((schedule) => (
								<div
									key={schedule.dayWeek}
									className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className="w-20">
												<span className="font-medium text-gray-800">
													{dayNames[schedule.dayWeek]}
												</span>
											</div>

											<div className="flex items-center space-x-2">
												<input
													type="checkbox"
													checked={!schedule.close}
													onChange={(e) =>
														updateSchedule(
															schedule.dayWeek,
															"close",
															!e.target.checked
														)
													}
													className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
												/>
												<span className="text-sm text-gray-600">Aberto</span>
											</div>
										</div>

										{!schedule.close && (
											<div className="flex items-center space-x-4">
												<div>
													<label className="block text-xs text-gray-500 mb-1">
														<FiClock className="inline w-3 h-3 mr-1" />
														Abertura
													</label>
													<input
														type="time"
														value={schedule.opening}
														onChange={(e) =>
															updateSchedule(
																schedule.dayWeek,
																"opening",
																e.target.value
															)
														}
														className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
													/>
												</div>
												<div>
													<label className="block text-xs text-gray-500 mb-1">
														<FiClock className="inline w-3 h-3 mr-1" />
														Fechamento
													</label>
													<input
														type="time"
														value={schedule.closed}
														onChange={(e) =>
															updateSchedule(
																schedule.dayWeek,
																"closed",
																e.target.value
															)
														}
														className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
													/>
												</div>
											</div>
										)}

										{schedule.close && (
											<span className="text-sm text-gray-400 italic">
												Fechado
											</span>
										)}
									</div>
								</div>
							))}
						</div>

						<div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
							<p className="text-sm text-blue-800">
								<FiClock className="inline w-4 h-4 mr-2" />
								Dica: Certifique-se de que pelo menos um dia da semana esteja
								marcado como aberto.
							</p>
						</div>
					</div>
				);

			case 2:
				return (
					<div className="space-y-6">
						<div className="text-center mb-8">
							<div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<FiMapPin className="w-8 h-8 text-emerald-600" />
							</div>
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								Endereço do Estabelecimento
							</h2>
							<p className="text-gray-600">
								Informe a localização do seu restaurante
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									<FiHome className="inline w-4 h-4 mr-2" />
									Rua *
								</label>
								<input
									type="text"
									value={address.street}
									onChange={(e) =>
										setAddress({ ...address, street: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="Nome da rua"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Número *
								</label>
								<input
									type="text"
									value={address.number}
									onChange={(e) =>
										setAddress({ ...address, number: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="123"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Complemento
								</label>
								<input
									type="text"
									value={address.complement}
									onChange={(e) =>
										setAddress({ ...address, complement: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="Apto, sala, etc."
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Bairro *
								</label>
								<input
									type="text"
									value={address.neighborhood}
									onChange={(e) =>
										setAddress({ ...address, neighborhood: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="Nome do bairro"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Cidade *
								</label>
								<input
									type="text"
									value={address.city}
									onChange={(e) =>
										setAddress({ ...address, city: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="Nome da cidade"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Estado *
								</label>
								<input
									type="text"
									value={address.state}
									onChange={(e) =>
										setAddress({ ...address, state: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="SP"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									CEP
								</label>
								<input
									type="text"
									value={address.zipCode}
									onChange={(e) =>
										setAddress({ ...address, zipCode: e.target.value })
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
									placeholder="00000-000"
								/>
							</div>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				{/* Header com Gradiente */}
				<div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 shadow-lg text-white mb-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold mb-2">Complete seu Registro</h1>
						<p className="text-emerald-100">
							Preencha as informações para finalizar sua conta e começar a usar
							nossa plataforma
						</p>
					</div>
				</div>

				{/* Progress Steps Modernizados */}
				<div className="flex items-center justify-center mb-8">
					{steps.map((step, index) => {
						const Icon = step.icon;
						const isCompleted = index < currentStep;
						const isCurrent = index === currentStep;

						return (
							<div key={step.id} className="flex items-center">
								<div className="flex flex-col items-center">
									<div
										className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
											isCompleted
												? "bg-emerald-600 border-emerald-600 text-white shadow-lg"
												: isCurrent
												? "bg-emerald-600 border-emerald-600 text-white shadow-lg"
												: "bg-white border-gray-300 text-gray-400"
										}`}
									>
										{isCompleted ? (
											<FiCheckCircle className="w-6 h-6" />
										) : (
											<Icon className="w-6 h-6" />
										)}
									</div>
									<div className="mt-2 text-center">
										<p
											className={`text-sm font-medium ${
												isCurrent
													? "text-emerald-600"
													: isCompleted
													? "text-emerald-600"
													: "text-gray-400"
											}`}
										>
											{step.title}
										</p>
									</div>
								</div>
								{index < steps.length - 1 && (
									<div
										className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
											isCompleted ? "bg-emerald-600" : "bg-gray-300"
										}`}
									/>
								)}
							</div>
						);
					})}
				</div>

				{/* Form Content */}
				<div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
					{renderStepContent()}
				</div>

				{/* Navigation */}
				<div className="flex justify-between">
					<button
						onClick={handlePrevious}
						disabled={currentStep === 0}
						className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
							currentStep === 0
								? "bg-gray-200 text-gray-400 cursor-not-allowed"
								: "bg-gray-600 text-white hover:bg-gray-700 shadow-sm hover:shadow-md"
						}`}
					>
						<FiChevronLeft className="w-5 h-5 mr-2" />
						Anterior
					</button>

					{currentStep === steps.length - 1 ? (
						<button
							onClick={handleSubmit}
							disabled={!isStepValid() || isLoading}
							className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
								!isStepValid() || isLoading
									? "bg-gray-200 text-gray-400 cursor-not-allowed"
									: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md"
							}`}
						>
							{isLoading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
									Salvando...
								</>
							) : (
								<>
									<FiCheckCircle className="w-5 h-5 mr-2" />
									Finalizar Registro
								</>
							)}
						</button>
					) : (
						<button
							onClick={handleNext}
							disabled={!isStepValid()}
							className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
								!isStepValid()
									? "bg-gray-200 text-gray-400 cursor-not-allowed"
									: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md"
							}`}
						>
							Próximo
							<FiChevronRight className="w-5 h-5 ml-2" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
