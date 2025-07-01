import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordData {
	email: string;
}

export const ForgotPassword = () => {
	const [formData, setFormData] = useState<ForgotPasswordData>({
		email: "",
	});
	const [errors, setErrors] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [emailSent, setEmailSent] = useState<boolean>(false);
	const navigate = useNavigate();

	const isFormValid = formData.email;
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

		if (!isFormValid) {
			setErrors("Email é obrigatório");
			return;
		}

		try {
			setIsLoading(true);
			setErrors("");

			// Simular chamada da API
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Aqui você faria a chamada real para a API
			// const result = await forgotPassword(formData).unwrap();

			setEmailSent(true);
		} catch (error: unknown) {
			console.error("Erro ao enviar email:", error);
			setErrors("Erro ao enviar email de recuperação");
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackToLogin = () => {
		navigate("/login");
	};

	const handleResendEmail = async () => {
		try {
			setIsLoading(true);
			setErrors("");

			// Simular reenvio
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Aqui você faria a chamada real para reenviar
			// await forgotPassword(formData).unwrap();
		} catch (error: unknown) {
			console.error("Erro ao reenviar email:", error);
			setErrors("Erro ao reenviar email");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] relative overflow-hidden">
				<div className="absolute inset-0 bg-[var(--color-primary)] opacity-90"></div>
				<div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
					<div className="mb-8 relative">
						<div className="bg-white rounded-2xl p-6 shadow-2xl transform rotate-1 w-80">
							<div className="flex items-center mb-4">
								<div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mr-4">
									<svg
										className="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-gray-800 font-semibold">
										Secure Recovery
									</h3>
									<p className="text-gray-500 text-sm">Password Reset</p>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
									<span className="text-gray-600 text-sm">
										Email verification
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
									<span className="text-gray-600 text-sm">
										Secure link generation
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
									<span className="text-gray-600 text-sm">
										Password encryption
									</span>
								</div>
							</div>
						</div>
						<div className="absolute -bottom-4 -right-6 bg-white rounded-xl p-4 shadow-xl transform -rotate-6 w-64">
							<div className="flex items-center mb-3">
								<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-2">
									<svg
										className="w-4 h-4 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</div>
								<span className="text-gray-800 font-medium text-sm">
									Recovery Email
								</span>
							</div>
							<div className="space-y-2">
								<div className="h-1.5 bg-gray-200 rounded w-full"></div>
								<div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
								<div className="h-1.5 bg-emerald-200 rounded w-1/2"></div>
							</div>
						</div>

						{/* Card terciário - Shield */}
						<div className="absolute -top-6 -left-8 bg-white rounded-lg p-3 shadow-lg transform rotate-12 w-20 h-20">
							<div className="flex items-center justify-center h-full">
								<svg
									className="w-8 h-8 text-emerald-500"
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
						</div>
					</div>
					<div className="text-center mt-16">
						<h2 className="text-3xl font-bold mb-4">Recupere sua senha</h2>
						<h2 className="text-3xl font-bold mb-6">de forma segura</h2>
						<p className="text-emerald-100 max-w-md mx-auto leading-relaxed">
							Recupere sua senha de forma segura com nosso sistema de
							verificação por email
						</p>
						<div className="flex justify-center space-x-2 mt-8">
							<div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full"></div>
							<div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full"></div>
							<div className="w-2 h-2 bg-white rounded-full"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="w-full max-w-md">
					{!emailSent ? (
						<>
							<div className="text-center mb-8">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
									<svg
										className="w-8 h-8 text-emerald-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							</div>
							<div className="text-center mb-8">
								<h1 className="text-3xl font-bold text-gray-900 mb-2">
									Esqueceu sua senha?
								</h1>
								<p className="text-gray-600">
									Não se preocupe! Digite seu email e enviaremos um link para
									redefinir sua senha
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
										className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
										placeholder="Digite seu email"
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
											: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transform hover:scale-[1.02] active:scale-[0.98]"
									}`}
								>
									{isLoading ? "Enviando..." : "Enviar link"}
								</button>
								<div className="text-center">
									<button
										type="button"
										onClick={handleBackToLogin}
										className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition-colors flex items-center justify-center space-x-2 mx-auto"
									>
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
												clipRule="evenodd"
											/>
										</svg>
										<span>Voltar ao Login</span>
									</button>
								</div>
							</form>
						</>
					) : (
						<>
							{/* Estado de Email Enviado */}
							<div className="text-center mb-8">
								<div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
									<svg
										className="w-10 h-10 text-emerald-600"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</div>
							</div>

							{/* Título de Sucesso */}
							<div className="text-center mb-8">
								<h1 className="text-3xl font-bold text-gray-900 mb-2">
									Check Your Email!
								</h1>
								<p className="text-gray-600 mb-4">
									Enviamos um link de recuperação para
								</p>
								<p className="text-emerald-600 font-semibold text-lg">
									{formData.email}
								</p>
								<p className="text-gray-500 text-sm mt-4">
									Verifique sua caixa de entrada e spam. O link expira em 15
									minutos.
								</p>
							</div>

							{/* Ações */}
							<div className="space-y-4">
								{/* Botão Reenviar */}
								<button
									type="button"
									onClick={handleResendEmail}
									disabled={isLoading}
									className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
										isLoading
											? "bg-gray-300 text-gray-500 cursor-not-allowed"
											: "bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-[1.02] active:scale-[0.98]"
									}`}
								>
									{isLoading ? "Reenviando..." : "Resend Email"}
								</button>

								{/* Mensagem de Erro */}
								{errors && (
									<div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200">
										{errors}
									</div>
								)}

								{/* Link Voltar */}
								<div className="text-center">
									<button
										type="button"
										onClick={handleBackToLogin}
										className="text-emerald-600 hover:text-[var(--color-primary-dark)] font-semibold transition-colors flex items-center justify-center space-x-2 mx-auto"
									>
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
												clipRule="evenodd"
											/>
										</svg>
										<span>Voltar ao Login</span>
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
