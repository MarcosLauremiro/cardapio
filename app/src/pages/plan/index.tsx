import { useState } from "react";

interface Plan {
	id: string;
	name: string;
	price: number;
	originalPrice: number;
	discount: string;
	period: string;
	features: string[];
	isPopular?: boolean;
	buttonText: string;
}

interface SubscriptionFormData {
	name: string;
	email: string;
	phone: string;
	cardNumber: string;
	expiryDate: string;
	cvv: string;
	cardName: string;
}

export const PricingPlans = () => {
	const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState<SubscriptionFormData>({
		name: "",
		email: "",
		phone: "",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
		cardName: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	// const user = useGetUserQuery();
	// console.log("requisição", user);

	const plans: Plan[] = [
		{
			id: "basic",
			name: "Plano Básico",
			price: 89,
			originalPrice: 149,
			discount: "-40%",
			period: "Ago 2024 a Jan 2025",
			features: [
				"Use qualquer dispositivo para acessar",
				"4-6 PM no seu fuso horário",
				"Disponível todos os dias úteis",
			],
			buttonText: "Começar",
		},
		{
			id: "popular",
			name: "Plano Popular",
			price: 149,
			originalPrice: 249,
			discount: "-40%",
			period: "Ago 2024 a Jan 2025",
			features: [
				"Tudo do Plano Básico",
				"Disponível nos fins de semana",
				"Adicionar múltiplos usuários",
			],
			isPopular: true,
			buttonText: "Começar",
		},
		{
			id: "premium",
			name: "Plano Premium",
			price: 199,
			originalPrice: 329,
			discount: "-40%",
			period: "Ago 2024 a Jan 2025",
			features: [
				"Tudo do Plano Popular",
				"Disponível 5 horas por dia",
				"Suporte prioritário 24/7",
			],
			buttonText: "Começar",
		},
	];

	const handlePlanSelect = (plan: Plan) => {
		setSelectedPlan(plan);
		setIsModalOpen(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Simular processamento
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Aqui você faria a chamada real para a API
			console.log("Assinatura processada:", { plan: selectedPlan, formData });

			// Fechar modal e resetar
			setIsModalOpen(false);
			setFormData({
				name: "",
				email: "",
				phone: "",
				cardNumber: "",
				expiryDate: "",
				cvv: "",
				cardName: "",
			});

			alert("Assinatura realizada com sucesso!");
		} catch (error) {
			console.error("Erro na assinatura:", error);
			alert("Erro ao processar assinatura. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(" ");
		} else {
			return v;
		}
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatCardNumber(e.target.value);
		setFormData((prev) => ({
			...prev,
			cardNumber: formatted,
		}));
	};

	return (
		<>
			<div className="min-h-screen bg-gray-100 py-12 px-4">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Acesso Completo Por
						</h1>
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Menos de R$ 5 Por Dia
						</h2>
					</div>

					{/* Plans */}
					<div className="grid md:grid-cols-3 gap-8 mb-16">
						{plans.map((plan) => (
							<div
								key={plan.id}
								className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
									plan.isPopular
										? "ring-2 ring-blue-600 transform scale-105"
										: ""
								}`}
							>
								{plan.isPopular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
											Mais popular
										</span>
									</div>
								)}

								<div className="text-center mb-6">
									<h3 className="text-xl font-semibold text-gray-900 mb-4">
										{plan.name}
									</h3>
									<div className="flex items-baseline justify-center space-x-2">
										<span className="text-4xl font-bold text-gray-900">
											R${plan.price}
										</span>
										<span className="text-lg text-gray-500 line-through">
											R${plan.originalPrice}
										</span>
										<span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
											{plan.discount}
										</span>
									</div>
									<p className="text-gray-600 text-sm mt-2">{plan.period}</p>
								</div>

								<ul className="space-y-4 mb-8">
									{plan.features.map((feature, index) => (
										<li key={index} className="flex items-start space-x-3">
											<svg
												className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
											<span className="text-gray-700">{feature}</span>
										</li>
									))}
								</ul>

								<button
									onClick={() => handlePlanSelect(plan)}
									className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
										plan.isPopular
											? "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-[1.02]"
											: "bg-gray-100 text-gray-900 hover:bg-gray-200 transform hover:scale-[1.02]"
									}`}
								>
									{plan.buttonText}
								</button>
							</div>
						))}
					</div>

					{/* Security Features */}
					<div className="grid md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 shadow-lg">
						<div className="text-center">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-blue-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Acesso Ilimitado
							</h3>
							<p className="text-gray-600 text-sm">
								Todos os planos vêm com acesso ilimitado até Janeiro.
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-green-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Garantia de Reembolso
							</h3>
							<p className="text-gray-600 text-sm">
								100% de satisfação garantida ou seu dinheiro de volta.
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-purple-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Seguro & Protegido
							</h3>
							<p className="text-gray-600 text-sm">
								Segurança é nossa prioridade, tomamos medidas para manter seus
								dados seguros.
							</p>
						</div>
					</div>
				</div>

				{/* Modal de Assinatura */}
				{isModalOpen && selectedPlan && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
							<div className="p-6">
								{/* Header do Modal */}
								<div className="flex justify-between items-center mb-6">
									<h3 className="text-2xl font-bold text-gray-900">
										Assinar {selectedPlan.name}
									</h3>
									<button
										onClick={() => setIsModalOpen(false)}
										className="text-gray-400 hover:text-gray-600 transition-colors"
									>
										<svg
											className="w-6 h-6"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>

								{/* Resumo do Plano */}
								<div className="bg-blue-50 rounded-xl p-4 mb-6">
									<div className="flex justify-between items-center">
										<div>
											<h4 className="font-semibold text-gray-900">
												{selectedPlan.name}
											</h4>
											<p className="text-sm text-gray-600">
												{selectedPlan.period}
											</p>
										</div>
										<div className="text-right">
											<div className="text-2xl font-bold text-blue-600">
												R${selectedPlan.price}
											</div>
											<div className="text-sm text-gray-500 line-through">
												R${selectedPlan.originalPrice}
											</div>
										</div>
									</div>
								</div>

								{/* Formulário */}
								<form onSubmit={handleSubmit} className="space-y-4">
									{/* Dados Pessoais */}
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Nome Completo
										</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="Seu nome completo"
											required
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Email
										</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="seu@email.com"
											required
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
											className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											placeholder="(11) 99999-9999"
											required
										/>
									</div>

									{/* Dados do Cartão */}
									<div className="border-t pt-4">
										<h4 className="font-semibold text-gray-900 mb-3">
											Dados do Cartão
										</h4>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Número do Cartão
											</label>
											<input
												type="text"
												name="cardNumber"
												value={formData.cardNumber}
												onChange={handleCardNumberChange}
												className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
												placeholder="1234 5678 9012 3456"
												maxLength={19}
												required
											/>
										</div>

										<div className="grid grid-cols-2 gap-3">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Validade
												</label>
												<input
													type="text"
													name="expiryDate"
													value={formData.expiryDate}
													onChange={handleInputChange}
													className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													placeholder="MM/AA"
													maxLength={5}
													required
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-1">
													CVV
												</label>
												<input
													type="text"
													name="cvv"
													value={formData.cvv}
													onChange={handleInputChange}
													className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													placeholder="123"
													maxLength={4}
													required
												/>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Nome no Cartão
											</label>
											<input
												type="text"
												name="cardName"
												value={formData.cardName}
												onChange={handleInputChange}
												className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
												placeholder="Nome como está no cartão"
												required
											/>
										</div>
									</div>

									{/* Segurança */}
									<div className="bg-green-50 rounded-lg p-3 flex items-center space-x-2">
										<svg
											className="w-5 h-5 text-green-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="text-sm text-green-700">
											Seus dados estão protegidos com criptografia SSL
										</span>
									</div>

									{/* Botões */}
									<div className="flex space-x-3 pt-4">
										<button
											type="button"
											onClick={() => setIsModalOpen(false)}
											className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
										>
											Cancelar
										</button>
										<button
											type="submit"
											disabled={isLoading}
											className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
												isLoading
													? "bg-gray-300 text-gray-500 cursor-not-allowed"
													: "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-[1.02]"
											}`}
										>
											{isLoading
												? "Processando..."
												: `Assinar por R$${selectedPlan.price}`}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
