import { useState } from "react";
import { useLoginMutation } from "../../slices/auth";
import { useNavigate } from "react-router-dom";

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
			setErrors("email e senha obriagatorios");
		}

		try {
			setErrors("");

			const result = await login(formData).unwrap();

			console.log(result);
			navigate("/home");
		} catch (error) {
			console.error("Erro no login:", error);
			setErrors("Credenciais inválidas");
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-texture">
			<div className="flex flex-col bg-white gap-10 w-[384px] p-4 rounded-3xl shadow-2xl">
				<div className="flex flex-col items-center justify-center">
					<h2 className="text">Bem-vindo{"(a)"} ao</h2>
					<h1 className="title font-bold uppercase">
						Digi<span className="font-normal">prato</span>
					</h1>
				</div>

				<form className="flex flex-col gap-8" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<label className="text-[14px] text-gray-600" htmlFor="email">
							E-mail
						</label>
						<input
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className="border border-gray-400 w-full h-[56px] rounded-[8px] px-3 placeholder:text-gray-400"
							placeholder="Seu E-mail de acesso"
							type="email"
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-[14px] text-gray-600" htmlFor="password">
							Senha
						</label>
						<input
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							className="border border-gray-400 w-full h-[56px] rounded-[8px] px-3 placeholder:text-gray-400"
							placeholder="Informe sua senha"
							type="password"
							required
						/>
					</div>

					{errors && (
						<div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
							{errors}
						</div>
					)}

					<div className="flex flex-col gap-2 items-center">
						<button
							type="submit"
							disabled={disable}
							className={`w-full rounded-[16px] h-[46px] transition-all ${
								disable
									? "btn-disable cursor-not-allowed"
									: "btn-primary hover:opacity-90"
							}`}
						>
							{isLoading ? "Entrando..." : "Fazer Login"}
						</button>

						<span className="text-[13px]">
							Não tenho conta{" "}
							<a
								className="text-[var(--color-detail)] hover:underline"
								href="/register"
							>
								criar conta
							</a>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};
