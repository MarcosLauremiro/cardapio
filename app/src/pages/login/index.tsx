import { useState } from "react";
import { setCredentials, useLoginMutation } from "../../slices/auth";
import { useNavigate } from "react-router-dom";
import cloche from "../../assets/cloche.svg";
import { useAppDispatch } from "../../store/hooks";
interface LoginData {
	email: string;
	password: string;
}

export const Login = () => {
	const [formData, setFormData] = useState<LoginData>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<string>("");
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useAppDispatch();
	const isFormValid = formData.email && formData.password;
	const disable = !isFormValid || isLoading;
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isFormValid) {
			setErrors("email e senha obrigatórios");
			return;
		}

		try {
			setErrors("");

			const result = await login(formData).unwrap();
			dispatch(setCredentials(result));
			navigate("/home");
		} catch (error) {
			console.error("Erro no login:", error);
			setErrors("Credenciais inválidas");
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
				<div className="absolute inset-0 bg-blue-600 opacity-90"></div>

				<div className="absolute top-20 left-20 w-4 h-4 bg-orange-400 rounded-full"></div>
				<div className="absolute top-32 right-32 w-3 h-3 bg-green-400 rounded-full"></div>
				<div className="absolute bottom-40 left-16 w-5 h-5 bg-yellow-400 rounded-full"></div>
				<div className="absolute top-40 right-20 w-6 h-6 bg-red-400 rounded-full"></div>
				<div className="absolute bottom-32 right-40 w-4 h-4 bg-green-500 rounded-full"></div>

				<div className="absolute top-60 left-32 w-8 h-8 bg-purple-400 transform rotate-45"></div>
				<div className="absolute bottom-60 right-24 w-6 h-6 bg-pink-400 transform rotate-12"></div>

				<div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
					<div className="mb-8 relative">
						<div className="bg-white rounded-2xl p-6 shadow-2xl transform rotate-3 w-80">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mr-4">
									<span className="text-white font-bold">📊</span>
								</div>
								<div>
									<h3 className="text-gray-800 font-semibold">
										O seu restaurante
									</h3>
									<p className="text-gray-500 text-sm">Restaurante</p>
								</div>
							</div>
							<div className="space-y-2">
								<div className="h-2 bg-gray-200 rounded"></div>
								<div className="h-2 bg-gray-200 rounded w-3/4"></div>
								<div className="h-2 bg-gray-200 rounded w-1/2"></div>
							</div>
						</div>

						<div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl transform -rotate-6 w-64">
							<div className="flex items-center space-x-3 mb-3">
								<div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
								<div className="w-8 h-8 bg-green-500 rounded-lg"></div>
								<div className="w-8 h-8 bg-red-500 rounded-lg"></div>
							</div>
							<div className="space-y-2">
								<div className="h-1.5 bg-gray-200 rounded"></div>
								<div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
							</div>
						</div>
					</div>

					<div className="text-center mt-16">
						<h2 className="text-3xl font-bold mb-4">Pronto para mais um dia</h2>
						<h2 className="text-3xl font-bold mb-6">de sucesso na cozinha?</h2>
						<p className="text-blue-100 max-w-md mx-auto leading-relaxed">
							Seja bem vindo de volta, pronto pra mais um dia?
						</p>

						<div className="flex justify-center space-x-2 mt-8">
							<div className="w-2 h-2 bg-white rounded-full"></div>
							<div className="w-2 h-2 bg-blue-300 rounded-full"></div>
							<div className="w-2 h-2 bg-blue-300 rounded-full"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="w-full max-w-md">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
							<img src={cloche} alt="cloche logo" />
						</div>
					</div>

					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Bem vindo!
						</h1>
						<p className="text-gray-600">
							Acesse sua conta e continue gerenciando seus dados
						</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleInputChange}
								className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
								className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
								placeholder="Senha"
								required
							/>
						</div>

						<div className="text-right">
							<a
								href="/forgot-password"
								className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
							>
								Recuperar senha
							</a>
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
							{isLoading ? "Entrando..." : "Fazer Login"}
						</button>

						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center"></div>
						</div>
						<div className="text-center">
							<span className="text-gray-600">Ainda não tem conta? </span>
							<a
								href="/register"
								className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
							>
								Registrar-se
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
