import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials, useRegisterMutation } from "../../slices/auth";
import { useAppDispatch } from "../../store/hooks";
import { isValidatePhone } from "../../utils/validatePhone";

interface EstablishmentRegister {
	name: string;
	email: string;
	phone: string;
	password: string;
}

export const Register = () => {
	const [formData, setFormData] = useState<EstablishmentRegister>({
		name: "",
		email: "",
		phone: "",
		password: "",
	});
	const [errors, setErrors] = useState<string>("");

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();

	const isFormValid =
		formData.name && formData.email && formData.phone && formData.password;
	const disable = !isFormValid || isLoading;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors) setErrors("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isValidatePhone(formData.phone)) {
			setErrors("Telefone inválido. Ex: (11) 91234-5678");
			return;
		}

		try {
			setErrors("");

			const result = await register(formData).unwrap();

			dispatch(
				setCredentials({
					token: result.token,
					establishment: result.establishment,
				})
			);

			navigate("/plan");
		} catch (error: unknown) {
			console.error("Erro no registro:", error);
			setErrors("Erro ao criar conta");
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
				<div className="absolute inset-0 bg-blue-600 opacity-90"></div>

				{/* Elementos decorativos */}
				<div className="absolute top-16 left-24 w-5 h-5 bg-yellow-400 rounded-full"></div>
				<div className="absolute top-28 right-28 w-4 h-4 bg-pink-400 rounded-full"></div>
				<div className="absolute bottom-36 left-20 w-6 h-6 bg-green-400 rounded-full"></div>
				<div className="absolute top-44 right-16 w-5 h-5 bg-orange-400 rounded-full"></div>
				<div className="absolute bottom-28 right-36 w-3 h-3 bg-blue-400 rounded-full"></div>
				<div className="absolute top-72 left-16 w-4 h-4 bg-red-400 rounded-full"></div>

				{/* Formas geométricas */}
				<div className="absolute top-52 left-36 w-10 h-10 bg-cyan-400 transform rotate-45"></div>
				<div className="absolute bottom-52 right-20 w-8 h-8 bg-emerald-400 transform rotate-12"></div>
				<div className="absolute top-80 right-32 w-6 h-6 bg-rose-400 transform -rotate-45"></div>

				{/* Conteúdo principal */}
				<div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
					{/* Cards de exemplo - tema restaurante */}
					<div className="mb-8 relative">
						{/* Card principal - Dashboard */}
						<div className="bg-white rounded-2xl p-6 shadow-2xl transform -rotate-2 w-80">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
									<span className="text-white font-bold">🍽️</span>
								</div>
								<div>
									<h3 className="text-gray-800 font-semibold">
										Restaurant Dashboard
									</h3>
									<p className="text-gray-500 text-sm">DigiPrato Manager</p>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-gray-600 text-sm">Pedidos Hoje</span>
									<span className="text-purple-600 font-semibold">47</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 text-sm">Receita</span>
									<span className="text-green-600 font-semibold">R$ 2.340</span>
								</div>
								<div className="h-2 bg-gray-200 rounded-full">
									<div className="h-2 bg-purple-500 rounded-full w-3/4"></div>
								</div>
							</div>
						</div>

						{/* Card secundário - Menu */}
						<div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl transform rotate-6 w-64">
							<div className="flex items-center mb-3">
								<div className="w-8 h-8 bg-orange-500 rounded-lg mr-2"></div>
								<span className="text-gray-800 font-medium text-sm">
									Menu Digital
								</span>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<div className="w-6 h-6 bg-red-100 rounded"></div>
									<div className="h-1.5 bg-gray-200 rounded flex-1"></div>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-6 h-6 bg-green-100 rounded"></div>
									<div className="h-1.5 bg-gray-200 rounded flex-1"></div>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-6 h-6 bg-blue-100 rounded"></div>
									<div className="h-1.5 bg-gray-200 rounded flex-1"></div>
								</div>
							</div>
						</div>

						<div className="absolute -top-4 -left-8 bg-white rounded-lg p-3 shadow-lg transform -rotate-12 w-48">
							<div className="text-center">
								<div className="text-2xl font-bold text-purple-600">94%</div>
								<div className="text-xs text-gray-500">Satisfação</div>
							</div>
						</div>
					</div>
					<div className="text-center mt-20">
						<h2 className="text-3xl font-bold mb-4">
							Onde grandes sabores encontram
						</h2>
						<h2 className="text-3xl font-bold mb-6">uma boa gestão</h2>
						<p className="text-purple-100 max-w-md mx-auto leading-relaxed">
							Gerencie seu restaurante de forma inteligente com nossa plataforma
							completa
						</p>
						<div className="flex justify-center space-x-2 mt-8">
							<div className="w-2 h-2 bg-purple-300 rounded-full"></div>
							<div className="w-2 h-2 bg-white rounded-full"></div>
							<div className="w-2 h-2 bg-purple-300 rounded-full"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="w-full max-w-md">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
							<svg
								className="w-8 h-8 text-purple-600"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
					</div>
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Bem vindo!
						</h1>
						<p className="text-gray-600">
							Crie sua conta e comece a gerenciar seu restaurante
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<input
								id="name"
								name="name"
								type="text"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
								placeholder="Nome do Restaurante"
								required
							/>
						</div>

						<div>
							<input
								id="phone"
								name="phone"
								type="tel"
								value={formData.phone}
								onChange={handleInputChange}
								className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
								placeholder="Telefone"
								required
							/>
						</div>
						<div>
							<input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleInputChange}
								className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
								placeholder="Email"
								required
							/>
						</div>
						<div>
							<input
								id="password"
								name="password"
								type="password"
								value={formData.password}
								onChange={handleInputChange}
								className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
								placeholder="Senha"
								required
							/>
						</div>
						{errors && (
							<div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200">
								{errors}
							</div>
						)}
						<button
							type="submit"
							disabled={disable}
							className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
								disable
									? "bg-gray-300 text-gray-500 cursor-not-allowed"
									: "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98]"
							}`}
						>
							{isLoading ? "Criando conta..." : "Fazer Registro"}
						</button>
						<div className="text-center">
							<span className="text-gray-600">Você já tem uma conta? </span>
							<a
								href="/login"
								className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
							>
								Fazer login
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
