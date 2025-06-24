import { Plans } from "../../components/Plans";

export function PricingPlans() {
	return (
		<main className="bg-gray-100 min-h-screen p-6">
			<div className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					Acesso Completo Por
				</h1>
				<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
					Menos de R$ 5 Por Dia
				</h2>
			</div>
			<Plans />
			<div className="grid md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
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
						Segurança é nossa prioridade, tomamos medidas para manter seus dados
						seguros.
					</p>
				</div>
			</div>
		</main>
	);
}
