// src/pages/Account.tsx
import { useState } from "react";
import {
	MdAccountCircle,
	MdLockPerson,
	MdOutlineMenuOpen,
} from "react-icons/md";

import { AccountInfo } from "../../components/accoutInfos";
import { PlanAccount } from "../../components/planAccount";
import { PasswordAccount } from "../../components/passwordAccount";

type MenuOption = "account" | "plan" | "password";

export function Account() {
	const [selected, setSelected] = useState<MenuOption>("account");

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex">
				{/* Sidebar (Menu) */}
				<nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
					<div className="p-6">
						<h2 className="text-2xl font-bold text-gray-800">
							Meu Restaurante
						</h2>
					</div>

					<ul className="mt-6 space-y-1">
						{/* Assinatura */}
						<li>
							<button
								onClick={() => setSelected("plan")}
								className={`w-full text-left flex items-center gap-2 px-6 py-2 transition ${
									selected === "plan"
										? "bg-gray-100 text-gray-900 font-medium"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<MdOutlineMenuOpen className="text-2xl" />
								Assinatura
							</button>
						</li>

						{/* Minha Conta */}
						<li>
							<button
								onClick={() => setSelected("account")}
								className={`w-full text-left flex items-center gap-2 px-6 py-2 transition ${
									selected === "account"
										? "bg-gray-100 text-gray-900 font-medium"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<MdAccountCircle className="text-2xl" />
								Minha Conta
							</button>
						</li>

						{/* Mudar Senha */}
						<li>
							<button
								onClick={() => setSelected("password")}
								className={`w-full text-left flex items-center gap-2 px-6 py-2 transition ${
									selected === "password"
										? "bg-gray-100 text-gray-900 font-medium"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<MdLockPerson className="text-2xl" />
								Mudar Senha
							</button>
						</li>
					</ul>
				</nav>
				{selected === "account" && <AccountInfo />}
				{selected === "plan" && <PlanAccount />}
				{selected === "password" && <PasswordAccount />}
			</div>
		</div>
	);
}
