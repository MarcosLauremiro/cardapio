import { useState } from "react";
import { useUpdateSubscriptionMutation } from "../../slices/user";
import type { Plan } from "../Plans";
import toast from "react-hot-toast";

interface ModalGetPlanProps {
	selectedPlan: Plan;
	setIsModalOpen: () => void;
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

export function ModalGetPlan({
	selectedPlan,
	setIsModalOpen,
}: ModalGetPlanProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [subscribe] = useUpdateSubscriptionMutation();
	const [formData, setFormData] = useState<SubscriptionFormData>({
		name: "",
		email: "",
		phone: "",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
		cardName: "",
	});

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
			await subscribe({
				planId: selectedPlan?.id,
				planName: selectedPlan?.name,
			});

			console.log("Assinatura processada:", { plan: selectedPlan, formData });

			setIsModalOpen();
			setFormData({
				name: "",
				email: "",
				phone: "",
				cardNumber: "",
				expiryDate: "",
				cvv: "",
				cardName: "",
			});

			console.log(formData);

			toast.success("Assinatura realizada com sucesso!");
		} catch (error) {
			console.error("Erro na assinatura:", error);
			toast.error("Erro ao processar assinatura. Tente novamente.");
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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					{/* Header do Modal */}
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-2xl font-bold text-gray-900">
							Assinar {selectedPlan.name}
						</h3>
						<button
							onClick={() => setIsModalOpen()}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
								<p className="text-sm text-gray-600">{selectedPlan.period}</p>
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
								Seu Nome Completo
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
								Seu Email
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
								Telefone / WhatsApp
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
								onClick={() => setIsModalOpen()}
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
	);
}
