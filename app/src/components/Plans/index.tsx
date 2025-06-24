import { useState } from "react";
import { ModalGetPlan } from "../ModalGetPlan";

export interface Plan {
	id: string;
	name: string;
	price: number;
	originalPrice: number;
	discount: string;
	period: string;
	features: string[];
	isPopular?: boolean;
	buttonText: string;
	isActive?: boolean;
}

interface PlansProps {
	isActive?: string;
}

export function Plans({ isActive = "premium" }: PlansProps) {
	const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const plans: Plan[] = [
		{
			id: "basic",
			name: "Plano Básico",
			price: 59,
			originalPrice: 99,
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

	return (
		<>
			<div className="">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-3 gap-8 mb-16">
						{plans.map((plan) =>
							plan.id === isActive ? (
								<div
									key={plan.id}
									className={`relative bg-gray-50 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${"ring-2 ring-blue-600 transform scale-105"}`}
								>
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
											Ativo
										</span>
									</div>
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
									<div className="text-center w-full py-4 rounded-xl font-semibold transition-all duration-200 bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-[1.02]">
										Ativo
									</div>
								</div>
							) : (
								<div
									key={plan.id}
									className={`relative bg-gray-50 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
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
							)
						)}
					</div>
				</div>

				{isModalOpen && selectedPlan && (
					<ModalGetPlan
						selectedPlan={selectedPlan}
						setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
					/>
				)}
			</div>
		</>
	);
}
