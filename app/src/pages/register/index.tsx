import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials, useRegisterMutation } from "../../slices/auth";
import { useAppDispatch } from "../../store/hooks";

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

		if (!isFormValid) return;

		try {
			setErrors("");

			const result = await register(formData).unwrap();

			dispatch(
				setCredentials({
					token: result.token,
					establishment: result.establishment,
				})
			);

			navigate("/dashboard");
		} catch (error: unknown) {
			console.error("Erro no registro:", error);
			setErrors("Erro ao criar conta");
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
						<label className="text-[14px] text-gray-600" htmlFor="name">
							Nome
						</label>
						<input
							id="name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className="border border-gray-400 w-full h-[56px] rounded-[8px] px-3 placeholder:text-gray-400"
							placeholder="Nome do Restaurante"
							type="text"
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-[14px] text-gray-600" htmlFor="phone">
							Telefone
						</label>
						<input
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							className="border border-gray-400 w-full h-[56px] rounded-[8px] px-3 placeholder:text-gray-400"
							placeholder="Telefone do restaurante"
							type="tel"
							required
						/>
					</div>

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
							placeholder="Informe uma senha"
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
							{isLoading ? "Criando conta..." : "Criar conta"}
						</button>
						<span className="text-[13px]">
							Ja tenho conta{" "}
							<a
								className="text-[var(--color-detail)] hover:underline"
								href="/login"
							>
								fazer login
							</a>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};
